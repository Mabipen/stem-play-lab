import type { Metadata } from 'next';
import SectionHeader from '@/components/SectionHeader';
import RegisterForm from '@/components/auth/RegisterForm';
import styles from '@/components/auth/AuthForm.module.css';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create your free STEM Play Lab parent account and start booking sessions for your children.',
};

export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <SectionHeader
          eyebrow="Get started"
          title="Create your free account"
          subtitle="Register as a parent to book sessions, manage child profiles and subscribe to STEM kits."
          titleAs="h1"
        />
        <RegisterForm />
      </div>
    </div>
  );
}
