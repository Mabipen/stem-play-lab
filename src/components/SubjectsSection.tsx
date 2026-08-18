import Link from 'next/link';
import styles from './SubjectsSection.module.css';

const SUBJECTS = [
  { label: 'Science',       desc: 'Experiments, chemistry & biology',     slug: 'science',        img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80' },
  { label: 'Robotics',      desc: 'Build & program real robots',           slug: 'robotics',       img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80' },
  { label: 'Coding',        desc: 'Scratch, Python & web dev',             slug: 'coding',         img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80' },
  { label: 'Engineering',   desc: 'Design, build & test solutions',        slug: 'engineering',    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80' },
  { label: 'Creative Build',desc: 'Invention & making with materials',     slug: 'creative-build', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80' },
  { label: 'Maths',         desc: 'Fun puzzles & real-world maths',        slug: 'maths',          img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80' },
];

export default function SubjectsSection() {
  return (
    <section className={styles.section} aria-label="Subjects we cover">
      <div className={`${styles.inner} container`}>
        <p className={`eyebrow ${styles.eyebrow}`}>What we teach</p>
        <h2 className={styles.title}>Six subjects. Infinite curiosity.</h2>

        <div className={styles.grid}>
          {SUBJECTS.map(({ label, desc, img, slug }) => (
            <Link key={label} href={`/explore/${slug}`} className={styles.card} aria-label={`Explore ${label} sessions`}>
              <div className={styles.bgImage} style={{ backgroundImage: `url(${img})` }} />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <h3 className={styles.label}>{label}</h3>
                <p className={styles.desc}>{desc}</p>
                <span className={styles.cta}>Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
