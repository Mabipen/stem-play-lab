import Button from './Button';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className={styles.bgVideo}
        poster="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className={styles.overlay} />

      <div className={`${styles.inner} container`}>
        <div className={styles.copy}>
          <div className={styles.liveTag}>
            <span className={styles.liveDot} />
            Now enrolling in Manchester
          </div>

          <h1 className={styles.headline}>
            Where <span className={styles.accentOrange}>Imagination</span><br />
            Meets <span className={styles.accentGreen}>Innovation</span>
          </h1>

          <p className={styles.sub}>
            Hands-on STEM adventures for curious children aged <strong>3–14</strong>.
            Maximum <strong>6 kids per instructor</strong> for genuine learning — not just watching.
          </p>

          <div className={styles.ctaRow}>
            <Button href="/book" size="lg" id="hero-book-cta">
              Book a Free Trial
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              See All Services
            </Button>
          </div>

          {/* Trust badges */}
          <div className={styles.badges}>
            {[
              { label: 'DBS-checked instructors' },
              { label: 'Ages 3–14' },
              { label: 'Max 6 per group' },
              { label: 'Award-winning' },
            ].map(({ label }) => (
              <div key={label} className={styles.badge}>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className={styles.wave} aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-cream)" />
        </svg>
      </div>
    </section>
  );
}
