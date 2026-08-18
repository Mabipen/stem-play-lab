import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Button from '@/components/Button';
import styles from './page.module.css';

/* ── Service page data ── */
const SERVICES: Record<string, {
  id: string;
  type: string;
  title: string;
  heroDesc: string;
  price: string;
  age: string;
  duration: string;
  img: string;
  color: string;
  pillText: string;
  highlights: { label: string; value: string }[];
  whatToExpect: string[];
  included: string[];
  faqs: { q: string; a: string }[];
  cta: string;
}> = {
  'weekly-classes': {
    id: 'weekly-classes',
    type: 'Weekly Classes',
    title: 'Weekly STEM Classes',
    heroDesc: 'Term-time weekly sessions across 6 STEM subjects with a maximum of 6 children per instructor. Your child builds real skills, real confidence — one session at a time.',
    price: 'From £18/session',
    age: '4 – 14',
    duration: '60 minutes',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    color: '#1B2A5B',
    pillText: 'All subjects',
    highlights: [
      { label: 'Age range', value: '4 – 14 years' },
      { label: 'Group size', value: 'Max 6 children' },
      { label: 'Duration', value: '60 minutes' },
      { label: 'Price', value: 'From £18/session' },
      { label: 'Frequency', value: 'Weekly, term-time' },
      { label: 'Subjects', value: 'Science, Robotics, Coding, Engineering, Build, Maths' },
    ],
    whatToExpect: [
      'A focused 60-minute deep dive into one STEM subject each week',
      'Real experiments, builds, and coding projects — not worksheets',
      'Small group of maximum 6 children so every child gets attention',
      'Sessions designed to complement the school curriculum',
      'Rotating subject themes across the term to keep things fresh',
      'Progress notes shared with parents at the end of each half-term',
    ],
    included: [
      'All materials and equipment provided',
      'Safety gear (goggles, gloves where needed)',
      'End-of-term showcase project',
      'Progress report each half-term',
      'Online parent portal access',
    ],
    faqs: [
      { q: 'Do I need to commit to a full term?', a: 'No — you can book individual sessions or block-book a term. Block-booking saves 10% and guarantees your child\'s place.' },
      { q: 'What if my child misses a session?', a: 'We offer one makeup session per term at no extra charge, subject to availability in another group.' },
      { q: 'What subjects are available?', a: 'Science, Robotics, Coding, Engineering, Creative Build, and Maths. Your child can pick a subject per half-term or mix and match.' },
      { q: 'Is transport available?', a: 'We don\'t provide transport but we\'re a 5-minute walk from Fallowfield tram stop and have free parking on weekends.' },
    ],
    cta: 'Book a Free Trial',
  },
  'holiday-camps': {
    id: 'holiday-camps',
    type: 'Holiday Camps',
    title: 'STEM Holiday Camps',
    heroDesc: 'Multi-day themed STEM adventures during every school holiday. Full-day or half-day — children spend the break building, experimenting, and making friends who love the same things they do.',
    price: 'From £35/day',
    age: '5 – 13',
    duration: 'Full / Half day',
    img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    color: '#4CAF50',
    pillText: 'Robotics focus',
    highlights: [
      { label: 'Age range', value: '5 – 13 years' },
      { label: 'Group size', value: 'Max 8 children' },
      { label: 'Duration', value: 'Half day (9am–1pm) or Full day (9am–5pm)' },
      { label: 'Price', value: 'Half day £35 · Full day £60' },
      { label: 'When', value: 'Every school holiday (half-term, summer, Easter, Christmas)' },
      { label: 'Theme', value: 'Changes every holiday — Robotics, Space, Eco-Science and more' },
    ],
    whatToExpect: [
      'A themed adventure that changes every holiday season',
      'Morning drop-off from 8:30am, collection from 1pm or 5pm',
      'Structured STEM projects with free build time in the afternoon',
      'Hot lunch available at full-day camps (dietary requirements catered for)',
      'Daily show-and-tell where children present what they built',
      'Take-home project at the end of the final day',
    ],
    included: [
      'All materials and STEM equipment',
      'Morning snack included',
      'Hot lunch for full-day campers',
      'Take-home project on final day',
      'Digital photo album sent to parents',
    ],
    faqs: [
      { q: 'Can I book individual days?', a: 'Yes — you can book one day or all five. Discounts apply for booking 3+ consecutive days.' },
      { q: 'What age is each camp designed for?', a: 'Camps are split into two age bands: 5–8 and 9–13. Both run simultaneously with age-appropriate challenges.' },
      { q: 'Is food provided?', a: 'Morning snack is included for all campers. Full-day campers get a hot lunch. Please notify us of dietary requirements at booking.' },
      { q: 'How quickly do spaces fill?', a: 'Summer camp typically sells out 6 weeks before the holiday starts. We recommend booking as soon as dates are announced.' },
    ],
    cta: 'Book a Camp Place',
  },
  'birthday-parties': {
    id: 'birthday-parties',
    type: 'Birthday Parties',
    title: 'STEM Birthday Parties',
    heroDesc: 'The most memorable birthday party in Manchester. We handle absolutely everything — themed setup, activities, instructors, and a take-home gift for every guest.',
    price: 'From £150',
    age: '4 – 12',
    duration: '2 hours',
    img: 'https://images.unsplash.com/photo-1530103862679-deaa0fb0fb4a?auto=format&fit=crop&w=1200&q=80',
    color: '#E91E8C',
    pillText: 'Bespoke party',
    highlights: [
      { label: 'Age range', value: '4 – 12 years' },
      { label: 'Group size', value: '8 – 20 children' },
      { label: 'Duration', value: '2 hours' },
      { label: 'Price', value: 'From £150 (up to 10 children)' },
      { label: 'Themes', value: 'Robot Builders, Mad Scientists, Coding Ninjas, Space Explorers' },
      { label: 'Available', value: 'Weekends and school holidays' },
    ],
    whatToExpect: [
      'A fully themed lab setup before guests arrive — zero stress for parents',
      'One dedicated instructor per 8 children for the full 2 hours',
      'Guided STEM activity tailored to the birthday child\'s interests',
      'Free time for experiments and exploration in the final 30 minutes',
      'Birthday cake cutting moment included (cake not provided)',
      'A take-home STEM gift kit for every guest',
    ],
    included: [
      'Themed lab decoration and setup',
      'Dedicated STEM instructors throughout',
      'All activity materials and equipment',
      'Take-home kit for every guest',
      'Party certificates for the birthday child',
      'Post-party tidy-up — you just leave!',
    ],
    faqs: [
      { q: 'What themes are available?', a: 'Robot Builders, Mad Scientists, Coding Ninjas, and Space Explorers. Each theme has a tailored set of activities and decor.' },
      { q: 'Can we bring our own food/cake?', a: 'Absolutely. We have a small kitchen area and fridge space. You are welcome to bring food, drinks, and a birthday cake.' },
      { q: 'What is the minimum and maximum group size?', a: 'Minimum 8 children, maximum 20. For groups larger than 20, please contact us for a custom quote.' },
      { q: 'How far in advance should I book?', a: 'Weekend party slots fill up fast — we recommend booking at least 4 weeks ahead, especially for summer and December dates.' },
    ],
    cta: 'Book a Party',
  },
  'build-workshops': {
    id: 'build-workshops',
    type: 'Build Workshops',
    title: 'One-off Build Workshops',
    heroDesc: 'Weekend drop-in sessions where children design, build and take home their own project. No commitment, no subscription — just a great few hours of making.',
    price: 'From £22',
    age: '5 – 14',
    duration: '90 minutes',
    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
    color: '#9C27B0',
    pillText: 'Creative Build',
    highlights: [
      { label: 'Age range', value: '5 – 14 years' },
      { label: 'Group size', value: 'Max 8 children' },
      { label: 'Duration', value: '90 minutes' },
      { label: 'Price', value: '£22 per child' },
      { label: 'Frequency', value: 'Every Saturday and Sunday' },
      { label: 'Booking', value: 'Drop-in or pre-book online' },
    ],
    whatToExpect: [
      'A new build challenge each week — never the same project twice',
      'Children choose their own design within the workshop brief',
      'Access to 200+ different materials in our maker space',
      'Guided but not prescriptive — instructors help, not direct',
      'Every child takes their finished project home',
      'Open to complete beginners and experienced makers alike',
    ],
    included: [
      'All materials from our 200+ item maker space',
      'Skilled instructor guidance throughout',
      'Your completed project to take home',
      'Entry to the gallery wall to display your creation',
    ],
    faqs: [
      { q: 'Do I need to pre-book?', a: 'We recommend pre-booking online to guarantee a spot, but walk-ins are welcome if spaces are available on the day.' },
      { q: 'What is the build challenge each week?', a: 'We announce the weekly challenge every Monday on Instagram and our website. Past challenges include build-a-bridge, motorised car, and solar lantern.' },
      { q: 'Can parents watch?', a: 'Yes — we have a parents\' seating area with a clear view of the maker space. You\'re welcome to stay for the full session.' },
      { q: 'What if my child doesn\'t finish in time?', a: 'Instructors plan for this. Children can take partially finished projects home with instructions to complete them.' },
    ],
    cta: 'Book a Workshop',
  },
  'kit-subscriptions': {
    id: 'kit-subscriptions',
    type: 'Kit Subscriptions',
    title: 'Monthly STEM Kit',
    heroDesc: 'A curated STEM kit delivered to your door every month. Each box contains everything your child needs to complete 3–4 hands-on experiments — no extra shopping required.',
    price: '£19.99/month',
    age: '4 – 12',
    duration: '3–4 activities',
    img: 'https://images.unsplash.com/photo-1534005085351-40c0ce7fdb44?auto=format&fit=crop&w=1200&q=80',
    color: '#F59E0B',
    pillText: 'Curriculum-aligned',
    highlights: [
      { label: 'Age range', value: '4 – 12 years (choose your age band)' },
      { label: 'Activities', value: '3–4 STEM experiments per box' },
      { label: 'Price', value: '£19.99/month (cancel any time)' },
      { label: 'Delivery', value: 'First week of every month' },
      { label: 'Age bands', value: '4–7 · 8–10 · 11–12' },
      { label: 'Curriculum', value: 'Aligned to Key Stage 1, 2 and 3' },
    ],
    whatToExpect: [
      'A beautifully packaged box arriving in the first week of each month',
      'All materials measured and pre-portioned — just open and start',
      'A themed activity booklet with step-by-step instructions and explanations',
      'A "go further" section for curious children who want to extend the experiment',
      'Age-appropriate challenges that grow with your child\'s ability',
      'A collector card for each month\'s theme to build a science library',
    ],
    included: [
      'All experiment materials pre-measured',
      'Full-colour instruction booklet',
      '"Go further" extension activities',
      'Collector science card',
      'Access to video walkthroughs online',
      'Free cancellation any time',
    ],
    faqs: [
      { q: 'Can I cancel at any time?', a: 'Yes — no contracts, no cancellation fees. Cancel from your online account at any point before your next billing date.' },
      { q: 'Is the kit safe for young children?', a: 'All materials are child-safe and non-toxic. Age 4–7 kits contain no chemicals — just physical experiments and crafts.' },
      { q: 'How long do the activities take?', a: 'Each activity takes 20–40 minutes. Most families spread the box over 2–3 weekends.' },
      { q: 'Can I gift a subscription?', a: 'Yes — gift subscriptions (3, 6, or 12 months) are available with a printed gift card and custom start date.' },
    ],
    cta: 'Start a Subscription',
  },
  'school-visits': {
    id: 'school-visits',
    type: 'School Visits',
    title: 'School & Group Visits',
    heroDesc: 'Bring the STEM lab to your school — or bring your class to us. We run curriculum-aligned STEM assemblies, workshops, and enrichment days for all year groups.',
    price: 'Custom quote',
    age: 'All year groups',
    duration: 'Half / Full day',
    img: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80',
    color: '#1B2A5B',
    pillText: 'Curriculum-linked',
    highlights: [
      { label: 'Age range', value: 'All year groups (Reception – Year 13)' },
      { label: 'Group size', value: 'Full class or year group' },
      { label: 'Duration', value: 'Half day (3 hrs) or Full day (6 hrs)' },
      { label: 'Price', value: 'Custom quote — contact us for rates' },
      { label: 'Location', value: 'We come to you, or you come to us' },
      { label: 'Curriculum', value: 'Fully aligned to KS1–KS5 STEM objectives' },
    ],
    whatToExpect: [
      'A pre-visit consultation with your teacher to align activities to your curriculum plans',
      'Energetic, experienced STEM educators who keep every child engaged',
      'Hands-on experiments and builds — not a passive presentation',
      'Risk assessments, DBS checks, and full insurance documentation provided',
      'Flexible format: one class, a year group, or a whole school STEM day',
      'Follow-up classroom activity pack sent after the visit',
    ],
    included: [
      'All STEM equipment and materials',
      'Fully qualified, DBS-checked educators',
      'Risk assessment and insurance documentation',
      'Post-visit classroom activity pack',
      'STEM ambassador certificates for participants',
    ],
    faqs: [
      { q: 'How much does a school visit cost?', a: 'Pricing depends on group size, duration, and whether we travel to you. Contact us for a quote — most half-day sessions for a class of 30 start from £350.' },
      { q: 'How far in advance do we need to book?', a: 'We recommend 4–6 weeks ahead. Popular STEM Week slots in March and June fill up very quickly.' },
      { q: 'Do you travel outside Manchester?', a: 'Yes — we serve schools across Greater Manchester, Cheshire, and Lancashire. Travel fees apply for journeys over 25 miles.' },
      { q: 'Can we visit your lab instead of you coming to us?', a: 'Absolutely — many schools prefer to visit our fully equipped lab. We can host up to 60 children at a time across our workshop spaces.' },
    ],
    cta: 'Request a Quote',
  },
};

export function generateStaticParams() {
  return Object.keys(SERVICES).map(s => ({ service: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const data = SERVICES[service];
  if (!data) return { title: 'Not Found' };
  return {
    title: `${data.title} | STEM Play Lab`,
    description: data.heroDesc,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const data = SERVICES[service];
  if (!data) notFound();

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroBg} style={{ backgroundImage: `url(${data.img})` }} aria-hidden="true" />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroContent}>
            <p className="eyebrow" style={{ color: '#FFB899' }}>{data.type}</p>
            <h1 className={styles.heroTitle}>{data.title}</h1>
            <p className={styles.heroDesc}>{data.heroDesc}</p>
            <div className={styles.heroBadges}>
              <span className={styles.badge}>Ages {data.age}</span>
              <span className={styles.badge}>{data.duration}</span>
              <span className={styles.badge}>{data.price}</span>
            </div>
            <div className={styles.heroCtas}>
              <Button href="/book" size="lg">{data.cta}</Button>
              <Button href="/contact" size="lg" variant="secondary" style={{ borderColor: 'rgba(255,255,255,0.45)', color: 'white' }}>Ask a question</Button>
            </div>
          </div>
        </div>
        <div className={styles.heroWave} aria-hidden="true">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="var(--color-cream)" /></svg>
        </div>
      </div>

      <div className={styles.body}>
        {/* Highlights strip */}
        <section className={`${styles.highlights} container`}>
          {data.highlights.map(h => (
            <div key={h.label} className={styles.highlight}>
              <span className={styles.highlightLabel}>{h.label}</span>
              <span className={styles.highlightValue}>{h.value}</span>
            </div>
          ))}
        </section>

        {/* What to expect + image */}
        <section className={`${styles.expectSection} container`}>
          <div className={styles.expectGrid}>
            <div>
              <p className="eyebrow">What we offer</p>
              <h2 className={styles.sectionTitle}>What to expect</h2>
              <ul className={styles.expectList}>
                {data.whatToExpect.map(item => (
                  <li key={item} className={styles.expectItem}>
                    <span className={styles.dot} style={{ background: data.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.expectImgWrapper}>
              <img src={data.img} alt={data.title} className={styles.expectImg} />
              <div className={styles.expectBadge} style={{ background: data.color }}>
                <span className={styles.expectBadgePrice}>{data.price}</span>
                <span className={styles.expectBadgeLabel}>per {data.duration.toLowerCase().includes('month') ? 'month' : 'child'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className={styles.includedSection}>
          <div className="container">
            <p className="eyebrow" style={{ textAlign: 'center' }}>No hidden extras</p>
            <h2 className={`${styles.sectionTitle} ${styles.centred}`}>Everything included</h2>
            <div className={styles.includedGrid}>
              {data.included.map(item => (
                <div key={item} className={styles.includedItem}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <circle cx="10" cy="10" r="10" fill={data.color} fillOpacity="0.15" />
                    <path d="M6 10l3 3 5-5" stroke={data.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className={`${styles.faqSection} container`}>
          <p className="eyebrow">Common questions</p>
          <h2 className={styles.sectionTitle}>Frequently asked questions</h2>
          <div className={styles.faqGrid}>
            {data.faqs.map(faq => (
              <div key={faq.q} className={styles.faqItem}>
                <h3 className={styles.faqQ}>{faq.q}</h3>
                <p className={styles.faqA}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className={`${styles.cta} container`}>
          <div className={styles.ctaInner} style={{ borderColor: '#FFE0CC' }}>
            <h2 className={styles.ctaTitle}>Ready to get started?</h2>
            <p className={styles.ctaDesc}>Book a free trial — no commitment needed. Just great STEM fun for your child.</p>
            <div className={styles.ctaBtns}>
              <Button href="/book" size="lg">{data.cta}</Button>
              <Button href="/contact" size="lg" variant="ghost">Talk to us first</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
