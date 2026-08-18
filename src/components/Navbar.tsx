'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '/services', label: 'Sessions & Services' },
  { href: '/shop', label: 'Smart Toy Store' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isHomePage = pathname === '/';
  const navBg = scrolled || !isHomePage;

  return (
    <>
    <header
      className={`${styles.header} ${navBg ? styles.headerScrolled : styles.headerTransparent}`}
      role="banner"
    >
      <div className={`${styles.inner} container`}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="STEM Play Lab Home">
          <Image 
            src="/logo.png" 
            alt="STEM Play Lab Logo" 
            width={200} 
            height={50} 
            className={styles.logoImg}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav} aria-label="Primary navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navLink} ${pathname.startsWith(href) ? styles.navLinkActive : ''} ${navBg ? styles.navLinkDark : styles.navLinkLight}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Auth & CTA */}
        <div className={styles.actions}>
          <Link
            href="/login"
            className={`${styles.loginLink} ${navBg ? styles.loginDark : styles.loginLight}`}
          >
            Sign In
          </Link>
          <Link href="/book" className={styles.bookBtn} id="nav-book-cta">
            Book a Session
          </Link>
        </div>

        <button
          className={`${styles.hamburger} ${navBg ? styles.hamburgerDark : styles.hamburgerLight}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

    </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <button 
          className={styles.mobileCloseBtn} 
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.mobileLink} ${pathname.startsWith(href) ? styles.mobileLinkActive : ''}`}
            >
              {label}
            </Link>
          ))}
          <Link href="/login" className={styles.mobileLink}>Sign In</Link>
          <Link href="/register" className={styles.mobileLink}>Create Account</Link>
          <Link href="/book" className={styles.mobileBookBtn}>Book a Session 🚀</Link>
        </nav>
      </div>
    </>
  );
}
