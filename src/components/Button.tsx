import Link from 'next/link';
import type { CSSProperties } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'navy';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  id?: string;
  className?: string;
  'aria-label'?: string;
  fullWidth?: boolean;
  style?: CSSProperties;
}

export default function Button({
  children, href, variant = 'primary', size = 'md',
  onClick, type = 'button', disabled = false, loading = false,
  id, className, 'aria-label': ariaLabel, fullWidth, style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    isDisabled ? styles.disabled : '',
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={loading ? styles.loadingText : ''}>{children}</span>
    </>
  );

  if (href && !isDisabled) {
    return (
      <Link href={href} className={cls} id={id} aria-label={ariaLabel} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      onClick={onClick}
      disabled={isDisabled}
      id={id}
      aria-label={ariaLabel}
      style={style}
      aria-busy={loading}
    >
      {content}
    </button>
  );
}
