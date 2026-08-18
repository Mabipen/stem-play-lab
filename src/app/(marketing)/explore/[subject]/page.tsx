import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Button from '@/components/Button';
import styles from './page.module.css';

/* ── Subject data ── */
const SUBJECTS: Record<string, {
  label: string;
  tagline: string;
  heroDesc: string;
  color: string;
  accentColor: string;
  img: string;
  ages: string;
  groupSize: string;
  duration: string;
  price: string;
  whatYouLearn: string[];
  whoFor: string;
  equipment: string;
}> = {
  science: {
    label: 'Science',
    tagline: 'Discover the world through experiments',
    heroDesc: 'Children become real scientists — mixing chemicals, growing crystals, exploring biology and physics with hands-on experiments that make school science feel magical.',
    color: '#4CAF50',
    accentColor: '#B2F5A0',
    img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    ages: '5 – 14',
    groupSize: 'Max 6',
    duration: '90 mins',
    price: 'From £25/session',
    whatYouLearn: [
      'Safe lab techniques — how real scientists work',
      'Chemistry reactions: acids, bases, and the unexpected',
      'Biology: plants, cells, and the human body',
      'Physics: forces, light, electricity and sound',
      'Scientific method: hypothesise, test, and conclude',
    ],
    whoFor: 'Perfect for naturally curious children aged 5–14 who want to go beyond the school curriculum and get their hands into real experiments in a safe, supervised environment.',
    equipment: 'All lab equipment, safety goggles, gloves, and materials are included. Children should wear clothes they don\'t mind getting a little messy!',
  },
  robotics: {
    label: 'Robotics',
    tagline: 'Build and program real robots',
    heroDesc: 'From simple wheeled bots to arm-based contraptions, children design, build, wire, and code their own robots — learning engineering and programming at the same time.',
    color: '#FF6B35',
    accentColor: '#FFB899',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    ages: '7 – 14',
    groupSize: 'Max 6',
    duration: '90 mins',
    price: 'From £28/session',
    whatYouLearn: [
      'Mechanical design: gears, levers, and structural stability',
      'Electronics: motors, sensors, and circuits',
      'Block-based and text-based programming (Scratch & MicroPython)',
      'Debugging and iterative problem-solving',
      'Team collaboration and project planning',
    ],
    whoFor: 'Ideal for children aged 7–14 who love building things and want to understand how machines think. No prior experience needed — we start from the very beginning.',
    equipment: 'Lego Mindstorms, Micro:bit, and our custom robotics kits are all provided. All you need to bring is enthusiasm.',
  },
  coding: {
    label: 'Coding',
    tagline: 'From Scratch to Python and beyond',
    heroDesc: 'Children learn to think like developers — building games, animations, and websites with real programming languages at a pace that\'s fun, never frustrating.',
    color: '#1B2A5B',
    accentColor: '#B2DFFF',
    img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    ages: '5 – 14',
    groupSize: 'Max 6',
    duration: '90 mins',
    price: 'From £25/session',
    whatYouLearn: [
      'Visual programming with Scratch — logic, loops, and events',
      'Python fundamentals: variables, functions, and data',
      'Web basics: HTML & CSS to create your own webpage',
      'Game development with PyGame',
      'Computational thinking: breaking problems into steps',
    ],
    whoFor: 'Great for all ages 5–14. Younger children start with Scratch, older learners move to Python and web development. Each child works at their own level within the session.',
    equipment: 'All computers, keyboards, and software are provided on-site. Children can optionally bring a USB stick to take their projects home.',
  },
  engineering: {
    label: 'Engineering',
    tagline: 'Design, build, test, and improve',
    heroDesc: 'Real engineering challenges — children design bridges that must hold weight, vehicles that must travel a set distance, and structures that must survive the shake test.',
    color: '#9C27B0',
    accentColor: '#D4B2FF',
    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
    ages: '6 – 14',
    groupSize: 'Max 6',
    duration: '90 mins',
    price: 'From £25/session',
    whatYouLearn: [
      'Structural engineering: load, tension, and compression',
      'Material science: which materials work best and why',
      'Design thinking: sketch → prototype → test → improve',
      'Measurement and precision in practical building',
      'How to work with constraints (time, materials, weight)',
    ],
    whoFor: 'Perfect for hands-on learners aged 6–14 who like building things and thinking about why things work the way they do. Great for future architects and engineers.',
    equipment: 'All building materials — wood, card, tape, string, LEDs, motors — are provided. Sessions end with a challenge test so children can see their designs perform.',
  },
  'creative-build': {
    label: 'Creative Build',
    tagline: 'Invent, make, and bring ideas to life',
    heroDesc: 'The open-ended maker session where children dream up their own inventions and build them with a huge range of materials. No fixed outcome — just imagination unleashed.',
    color: '#E91E8C',
    accentColor: '#FFB2E0',
    img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
    ages: '3 – 14',
    groupSize: 'Max 6',
    duration: '90 mins',
    price: 'From £22/session',
    whatYouLearn: [
      'Creative problem-solving and blue-sky thinking',
      'Planning and sketching before building',
      'Working with diverse materials: wood, foam, wiring, fabric',
      'Presenting and explaining your invention to others',
      'Iterating when the first attempt doesn\'t work',
    ],
    whoFor: 'Our most popular session for young children (3–7) and creative older learners who want freedom to explore without a set project brief. Instructors guide gently without directing.',
    equipment: 'Our maker space stocks over 200 different materials including electronics, motors, textiles, and recycled items. Everything is included in the session price.',
  },
  maths: {
    label: 'Maths',
    tagline: 'Real-world maths that actually makes sense',
    heroDesc: 'Puzzles, patterns, codes, and challenges that show children maths isn\'t something you survive in school — it\'s a superpower hiding everywhere in the real world.',
    color: '#F59E0B',
    accentColor: '#FFE566',
    img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
    ages: '5 – 14',
    groupSize: 'Max 6',
    duration: '90 mins',
    price: 'From £22/session',
    whatYouLearn: [
      'Number sense and mental maths strategies',
      'Geometry and spatial reasoning through puzzles',
      'Statistics: collecting, presenting and interpreting data',
      'Algebra concepts introduced through games',
      'Real-world maths: money, measurement, probability',
    ],
    whoFor: 'For children aged 5–14 who either struggle with maths and need a different approach, or love maths and want to go deeper than the classroom allows. Both thrive here.',
    equipment: 'All manipulatives, puzzles, and activity sheets are provided. Sessions are curriculum-informed but never feel like revision — they feel like play.',
  },
};

export async function generateStaticParams() {
  return Object.keys(SUBJECTS).map(subject => ({ subject }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ subject: string }> }
): Promise<Metadata> {
  const { subject } = await params;
  const data = SUBJECTS[subject];
  if (!data) return { title: 'Not Found' };
  return {
    title: `${data.label} Sessions | STEM Play Lab`,
    description: data.heroDesc,
  };
}

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  const data = SUBJECTS[subject];
  if (!data) notFound();

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero} style={{ '--accent': data.color } as React.CSSProperties}>
        <div
          className={styles.heroBg}
          style={{ backgroundImage: `url(${data.img})` }}
          aria-hidden="true"
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroContent}>
            <p className="eyebrow" style={{ color: data.accentColor }}>{data.label}</p>
            <h1 className={styles.heroTitle}>{data.tagline}</h1>
            <p className={styles.heroDesc}>{data.heroDesc}</p>
            <div className={styles.heroBadges}>
              <span className={styles.badge}>Ages {data.ages}</span>
              <span className={styles.badge}>{data.groupSize} children</span>
              <span className={styles.badge}>{data.duration}</span>
              <span className={styles.badge}>{data.price}</span>
            </div>
            <div className={styles.heroCtas}>
              <Button href="/book" size="lg">Book a Free Trial</Button>
              <Button href="/contact" size="lg" variant="secondary" style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}>Ask a Question</Button>
            </div>
          </div>
        </div>
        <div className={styles.heroWave} aria-hidden="true">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="var(--color-cream)" /></svg>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* What you'll learn */}
        <section className={`${styles.learnSection} container`}>
          <div className={styles.learnGrid}>
            <div>
              <p className="eyebrow">What we cover</p>
              <h2 className={styles.sectionTitle}>What your child will learn</h2>
              <ul className={styles.learnList}>
                {data.whatYouLearn.map(item => (
                  <li key={item} className={styles.learnItem}>
                    <span className={styles.learnDot} style={{ background: data.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.learnImgWrapper}>
              <img src={data.img} alt={`${data.label} session at STEM Play Lab`} className={styles.learnImg} />
            </div>
          </div>
        </section>

        {/* Who it's for + Equipment */}
        <section className={styles.infoSection}>
          <div className={`${styles.infoGrid} container`}>
            <div className={styles.infoCard} style={{ borderColor: data.accentColor }}>
              <div className={styles.infoIcon} style={{ background: data.accentColor }}>👶</div>
              <h3 className={styles.infoCardTitle}>Who it&apos;s for</h3>
              <p className={styles.infoCardText}>{data.whoFor}</p>
            </div>
            <div className={styles.infoCard} style={{ borderColor: data.accentColor }}>
              <div className={styles.infoIcon} style={{ background: data.accentColor }}>🎒</div>
              <h3 className={styles.infoCardTitle}>What to bring</h3>
              <p className={styles.infoCardText}>{data.equipment}</p>
            </div>
            <div className={styles.infoCard} style={{ borderColor: data.accentColor }}>
              <div className={styles.infoIcon} style={{ background: data.accentColor }}>📅</div>
              <h3 className={styles.infoCardTitle}>Session details</h3>
              <p className={styles.infoCardText}>
                <strong>Age range:</strong> {data.ages}<br />
                <strong>Group size:</strong> {data.groupSize} children per instructor<br />
                <strong>Duration:</strong> {data.duration}<br />
                <strong>Price:</strong> {data.price}
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`${styles.cta} container`}>
          <div className={styles.ctaInner} style={{ background: `linear-gradient(135deg, ${data.color}22 0%, ${data.accentColor}44 100%)`, borderColor: data.accentColor }}>
            <h2 className={styles.ctaTitle}>Ready to try {data.label}?</h2>
            <p className={styles.ctaDesc}>Book a free trial session — no commitment, no pressure. Just great STEM fun for your child.</p>
            <div className={styles.ctaBtns}>
              <Button href="/book" size="lg">Book a Free Trial</Button>
              <Button href="/services" size="lg" variant="ghost">See all sessions</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
