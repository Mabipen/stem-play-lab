import Image from 'next/image';
import Button from './Button';
import styles from './ServicesSection.module.css';

const SERVICES = [
  {
    id: 'weekly-classes',
    type: 'Weekly Classes',
    title: 'Weekly STEM Classes',
    desc: 'Term-time weekly sessions across 6 subjects. Small groups of 6 ensure your child gets real hands-on time.',
    price: 'From £18/session',
    age: 'Ages 4–14',
    duration: '60 min',
    pill: 'var(--pill-coding)',
    pillText: 'All subjects',
    href: '/services/weekly-classes',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'holiday-camps',
    type: 'Holiday Camps',
    title: 'STEM Holiday Camps',
    desc: 'Full-day or half-day camps during school holidays. Multi-day themed adventures covering robotics, chemistry and more.',
    price: 'From £35/day',
    age: 'Ages 5–13',
    duration: 'Full/Half day',
    pill: 'var(--pill-robotics)',
    pillText: 'Robotics focus',
    href: '/services/holiday-camps',
    img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'birthday-parties',
    type: 'Birthday Parties',
    title: 'STEM Birthday Parties',
    desc: 'The most memorable birthday party in Manchester. Choose a theme — Robot Builders, Mad Scientists, Coding Ninjas.',
    price: 'From £150',
    age: 'Ages 4–12',
    duration: '2 hours',
    pill: 'var(--color-yellow)',
    pillText: 'Bespoke party',
    href: '/services/birthday-parties',
    img: 'https://images.unsplash.com/photo-1530103862679-deaa0fb0fb4a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'build-workshops',
    type: 'Build Workshops',
    title: 'One-off Build Workshops',
    desc: 'Weekend drop-in sessions where children design, build and take home their project — no commitment required.',
    price: 'From £22',
    age: 'Ages 5–14',
    duration: '90 min',
    pill: 'var(--pill-build)',
    pillText: 'Creative Build',
    href: '/services/build-workshops',
    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'kit-subscriptions',
    type: 'Kit Subscriptions',
    title: 'Monthly STEM Kit',
    desc: 'A curated STEM kit delivered monthly. Each box contains everything needed to complete hands-on experiments.',
    price: '£19.99/month',
    age: 'Ages 4–12',
    duration: '3–4 activities',
    pill: 'var(--pill-engineering)',
    pillText: 'Curriculum-aligned',
    href: '/services/kit-subscriptions',
    img: 'https://images.unsplash.com/photo-1534005085351-40c0ce7fdb44?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'school-visits',
    type: 'School Visits',
    title: 'School & Group Visits',
    desc: 'Bring the lab to your school — or bring the class to us. We run assemblies, workshops and STEM enrichment days.',
    price: 'Custom quote',
    age: 'All year groups',
    duration: 'Half/Full day',
    pill: '#FFE8B2',
    pillText: 'Curriculum-linked',
    href: '/services/school-visits',
    img: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80'
  },
];

export default function ServicesSection() {
  return (
    <section className={styles.section} aria-label="Our services">
      <div className={`${styles.inner} container`}>
        <div className={styles.top}>
          <div>
            <p className="eyebrow">Everything we offer</p>
            <h2 className={styles.title}>Six ways to explore STEM</h2>
          </div>
          <Button href="/services" variant="secondary">View full schedule →</Button>
        </div>

        <div className={styles.grid}>
          {SERVICES.map(s => (
            <a key={s.id} href={s.href} className={styles.card} aria-label={`Learn more about ${s.title}`}>
              <div className={styles.bgImage} style={{ backgroundImage: `url(${s.img})` }} />
              <div className={styles.overlay} />
              
              <div className={styles.content}>
                <div className={styles.cardHeader}>
                  <div className={styles.pill} style={{ background: s.pill }}>{s.pillText}</div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.type}>{s.type}</div>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <p className={styles.cardDesc}>{s.desc}</p>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.metaRow}>
                    <span className={styles.metaItem}>{s.duration}</span>
                    <span className={styles.metaItem}>• {s.age}</span>
                  </div>
                  <div className={styles.priceRow}>
                    <span className={styles.price}>{s.price}</span>
                    <span className={styles.learnLink}>Learn more →</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Image + CTA block */}
        <div className={styles.ctaBlock}>
          <div className={styles.ctaImg}>
            <div className={styles.ctaImgWrapper}>
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80"
                alt="Children doing STEM activities"
                className={styles.ctaIllustration}
              />
            </div>
          </div>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Not sure which is right for your child?</h3>
            <p className={styles.ctaDesc}>
              Book a free 30-minute trial session across any subject. No commitment, no pressure.
              Our instructors will help you find the best fit.
            </p>
            <div className={styles.ctaBtns}>
              <Button href="/book" size="lg">Book Free Trial</Button>
              <Button href="/contact" variant="secondary">Talk to us first</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
