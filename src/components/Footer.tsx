import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const SERVICES = [
  { href: '/services#weekly-classes', label: 'Weekly Classes' },
  { href: '/services#workshops', label: 'Build Workshops' },
  { href: '/services#holiday-camps', label: 'Holiday Camps' },
  { href: '/services#birthday-parties', label: 'Birthday Parties' },
  { href: '/services#subscriptions', label: 'Kit Subscriptions' },
  { href: '/shop', label: 'Smart Toy Store' },
];

const COMPANY = [
  { href: '/about', label: 'About Us' },
  { href: '/blog', label: 'Blog' },
  { href: '/safeguarding', label: 'Safeguarding Policy' },
  { href: '/accessibility', label: 'Accessibility' },
  { href: '/contact', label: 'Contact' },
];

const ACCOUNT = [
  { href: '/register', label: 'Register' },
  { href: '/login', label: 'Sign In' },
  { href: '/account', label: 'My Account' },
  { href: '/account/children', label: 'Child Profiles' },
  { href: '/book', label: 'Book a Session' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`${styles.inner} container`}>
        {/* Brand Column */}
        <div className={styles.brand}>
          <Link href="/" aria-label="STEM Play Lab — Home">
            <Image src="/logo.svg" alt="STEM Play Lab" width={180} height={60} />
          </Link>
          <p className={styles.tagline}>Where imagination meets innovation. Hands-on STEM learning for curious minds aged 3–14 in Manchester.</p>
          <address className={styles.address}>
            <span>📍 Manchester, UK</span>
            <a href="mailto:hello@stemplaylab.co.uk">hello@stemplaylab.co.uk</a>
          </address>
          {/* Social Icons */}
          <div className={styles.socials}>
            {[
              { label: 'Instagram', href: '#', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> },
              { label: 'Facebook', href: '#', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
              { label: 'YouTube', href: '#', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg> },
            ].map(({ label, href, icon }) => (
              <a key={label} href={href} className={styles.social} aria-label={label}>
                <span role="img" aria-hidden>{icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Services</h3>
          <ul role="list" className={styles.colLinks}>
            {SERVICES.map(({ href, label }) => (
              <li key={href}><Link href={href} className={styles.colLink}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Company</h3>
          <ul role="list" className={styles.colLinks}>
            {COMPANY.map(({ href, label }) => (
              <li key={href}><Link href={href} className={styles.colLink}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Account</h3>
          <ul role="list" className={styles.colLinks}>
            {ACCOUNT.map(({ href, label }) => (
              <li key={href}><Link href={href} className={styles.colLink}>{label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`${styles.bottom} container`}>
        <p className={styles.copy}>© {year} STEM Play Lab Ltd. All rights reserved. Registered in England &amp; Wales.</p>
        <div className={styles.legal}>
          <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
          <Link href="/terms" className={styles.legalLink}>Terms of Service</Link>
          <Link href="/cookies" className={styles.legalLink}>Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
