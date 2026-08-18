import Link from 'next/link';
import styles from './ServiceCard.module.css';

export type ServiceType = 'science' | 'robotics' | 'coding' | 'build' | 'engineering' | 'birthday';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  type: ServiceType;
  ageRange: string;
  price: string;
  href: string;
  badge?: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  type,
  ageRange,
  price,
  href,
  badge,
}: ServiceCardProps) {
  return (
    <article className={`${styles.card} ${styles[type]}`}>
      {badge && <span className={styles.badge}>{badge}</span>}
      <div className={styles.icon} aria-hidden="true">{icon}</div>
      <div className={styles.pill}>{type.charAt(0).toUpperCase() + type.slice(1)}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.meta}>
        <span className={styles.age}>👶 Ages {ageRange}</span>
        <span className={styles.price}>From {price}</span>
      </div>
      <Link href={href} className={styles.cta} aria-label={`Learn more about ${title}`}>
        Learn More →
      </Link>
    </article>
  );
}
