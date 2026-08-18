import { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  titleAs?: 'h1' | 'h2' | 'h3';
  accent?: ReactNode;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  titleAs: Tag = 'h2',
  accent,
}: SectionHeaderProps) {
  return (
    <div className={`${styles.wrapper} ${align === 'left' ? styles.left : styles.center}`}>
      {eyebrow && <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>}
      <Tag className={styles.title}>
        {title}
        {accent && <span className={styles.accent}> {accent}</span>}
      </Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
