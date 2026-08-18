import type { Metadata } from 'next';
import Image from 'next/image';
import Button from '@/components/Button';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about STEM Play Lab — Manchester\'s award-winning hands-on STEM learning centre for children aged 3 to 14.',
};

const VALUES = [
  { title: 'Hands-on always', desc: 'Every session involves real doing — building, testing, failing, trying again. No passive watching.' },
  { title: 'Small groups only', desc: 'Maximum 6 children per instructor. Every child gets genuine attention and guidance.' },
  { title: 'Safety first', desc: 'All instructors are DBS-checked, first-aid trained, and allergy-aware. Parents trust us completely.' },
  { title: 'Inclusive by design', desc: 'WCAG-AA accessible website, adapted sessions, and a welcoming space for every child.' },
  { title: 'Curriculum-informed', desc: 'Sessions complement the national curriculum — children enjoy themselves AND get ahead in school.' },
  { title: 'Fuelled by curiosity', desc: 'We celebrate questions, mistakes, and "what if?" moments. Science thrives on curiosity.' },
];

const TEAM = [
  { name: 'Dr. Amara Osei', role: 'Founder & Lead Educator', subject: 'Chemistry & Biology' },
  { name: 'James Whitfield', role: 'Head of Robotics', subject: 'Electronics & Engineering' },
  { name: 'Priya Sharma', role: 'Coding Lead', subject: 'Python, Scratch & Web Dev' },
  { name: 'Marcus Lee', role: 'Creative Build Lead', subject: 'Design & Making' },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className="container">
          <p className="eyebrow">Our story</p>
          <h1 className={styles.heroTitle}>We exist to make STEM exciting for every child</h1>
          <p className={styles.heroSub}>
            Founded in Manchester in 2022 by a former university lecturer who believed school science
            labs should be available to every 5-year-old — not just PhD students.
          </p>
        </div>
        <div className={styles.heroWave} aria-hidden="true">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="var(--color-cream)" /></svg>
        </div>
      </div>

      <div className={styles.content}>
        {/* Mission block */}
        <section className={`${styles.missionBlock} container`}>
          <div className={styles.missionText}>
            <h2 className={styles.sectionTitle}>Why we started</h2>
            <p>
              STEM Play Lab was born out of frustration. Our founder, Dr. Amara Osei, watched her own
              children grow bored of science worksheets while being absolutely captivated by the chemistry
              set she bought from a market stall. That gap — between what school taught and what children
              were actually curious about — became the mission.
            </p>
            <p>
              Today we run <strong>weekly classes, holiday camps, birthday parties, and build workshops</strong>{' '}
              for children aged 3 to 14 in our purpose-built Manchester lab. Every session is limited
              to 6 children per instructor — a deliberate choice, not a business constraint.
            </p>
            <Button href="/book" size="lg">Book a Free Trial</Button>
          </div>
          <div className={styles.missionImg}>
            <div className={styles.missionImgWrapper}>
              <img
                src="/about-mission.png"
                alt="Children doing STEM activities at STEM Play Lab"
                className={styles.missionIllustration}
              />
            </div>
            <div className={styles.missionStat}>
              <span className={styles.statNum}>200+</span>
              <span className={styles.statLabel}>Families who trust us</span>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className={styles.valuesSection}>
          <div className="container">
            <p className="eyebrow" style={{ textAlign: 'center' }}>What we stand for</p>
            <h2 className={`${styles.sectionTitle} ${styles.centred}`}>Our core values</h2>
            <div className={styles.valuesGrid}>
              {VALUES.map(v => (
                <div key={v.title} className={styles.valueCard}>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className={`${styles.teamSection} container`}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>The people behind STEM Play Lab</p>
          <h2 className={`${styles.sectionTitle} ${styles.centred}`}>Meet our instructors</h2>
          <div className={styles.teamGrid}>
            {TEAM.map(t => (
              <div key={t.name} className={styles.teamCard}>
                <div className={styles.teamImgWrapper}>
                  {t.name.charAt(0)}
                </div>
                <h3 className={styles.teamName}>{t.name}</h3>
                <p className={styles.teamRole}>{t.role}</p>
                <div className={styles.teamSubject}>{t.subject}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Birthday/camps CTA blocks */}
        <section className={`${styles.ctaCards} container`}>
          <div className={styles.ctaCard} style={{ background: 'var(--color-navy)' }}>
            <img src="/about-party.png" alt="Birthday party at STEM Play Lab" className={styles.ctaCardImg} />
            <div>
              <h3 className={styles.ctaCardTitle}>Host a STEM Birthday Party</h3>
              <p className={styles.ctaCardDesc}>The most memorable birthday in Manchester. We handle everything — you just bring the birthday child.</p>
              <Button href="/services?type=party" variant="secondary">See party packages</Button>
            </div>
          </div>
          <div className={styles.ctaCard} style={{ background: '#2d1f6e' }}>
            <img src="/about-camp.png" alt="STEM holiday camp" className={styles.ctaCardImg} />
            <div>
              <h3 className={styles.ctaCardTitle}>Holiday Camp Spaces Open</h3>
              <p className={styles.ctaCardDesc}>Full and half-day holiday camps with themed STEM adventures. Spaces fill fast — book early.</p>
              <Button href="/services?type=camp" variant="secondary">See camp dates</Button>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className={`${styles.locationSection} container`}>
          <div className={styles.locationContent}>
            <h2 className={styles.sectionTitle}>Find us in Manchester</h2>
            <p>We&apos;re based in the heart of Manchester, easily accessible by tram and bus. Free parking available at weekends.</p>
            <div className={styles.locationDetails}>
              <div className={styles.locationItem}>📍 <strong>42 Experiment Street, Manchester, M14 5TQ</strong></div>
              <div className={styles.locationItem}>📞 <a href="tel:01612345678">0161 234 5678</a></div>
              <div className={styles.locationItem}>✉️ <a href="mailto:hello@stemplaylab.co.uk">hello@stemplaylab.co.uk</a></div>
            </div>
            <Button href="/contact">Get in touch</Button>
          </div>
          <div className={styles.locationImgWrapper}>
             <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" alt="STEM Play Lab building entrance" className={styles.locationImg} />
          </div>
        </section>
      </div>
    </div>
  );
}
