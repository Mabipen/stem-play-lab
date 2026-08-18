import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import SubjectsSection from '@/components/SubjectsSection';
import ServicesSection from '@/components/ServicesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ShopPreviewSection from '@/components/ShopPreviewSection';
import LeadCaptureSection from '@/components/LeadCaptureSection';

export const metadata: Metadata = {
  title: 'STEM Play Lab — Where Imagination Meets Innovation',
  description:
    "Manchester's hands-on STEM learning centre for children aged 3–14. Small groups of 6, expert instructors, weekly classes, holiday camps, birthday parties & more.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SubjectsSection />
      <ServicesSection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <ShopPreviewSection />
      <LeadCaptureSection />
    </>
  );
}
