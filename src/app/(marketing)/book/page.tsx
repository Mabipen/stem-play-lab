import type { Metadata } from 'next';
import SectionHeader from '@/components/SectionHeader';
import BookSessionForm from '@/components/book/BookSessionForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Book a Session',
  description: 'Book a STEM Play Lab session for your child. Real-time availability with secure online payment.',
};

export default function BookPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <SectionHeader
          eyebrow="Session booking"
          title="Choose your session"
          subtitle="Real-time availability, maximum 6 children per group. Secure checkout with Stripe."
          titleAs="h1"
        />
        <BookSessionForm />
      </div>
    </div>
  );
}
