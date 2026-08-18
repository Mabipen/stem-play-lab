import type { Metadata } from 'next';
import { Suspense } from 'react';
import SectionHeader from '@/components/SectionHeader';
import LoginForm from '@/components/auth/LoginForm';
import styles from '@/components/auth/AuthForm.module.css';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your STEM Play Lab account to manage bookings, child profiles and subscriptions.',
};

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <SectionHeader
          eyebrow="Welcome back"
          title="Sign in to your account"
          subtitle="Access your family dashboard, upcoming sessions and subscription details."
          titleAs="h1"
        />
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
