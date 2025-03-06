"use client"

import HeroSection from '@/components/home/HeroSection';
import AboutSummary from '@/components/home/AboutSummary';
import ProjectsSummary from '@/components/home/ProjectsSummary';
import ContactSummary from '@/components/home/ContactSummary';
import TestimonialsSection from '@/components/home/TestimonialsSummary';
import { PageTransition } from '@/components/layout/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <AboutSummary />
      <ProjectsSummary />
      <TestimonialsSection/>
      <ContactSummary />
    </PageTransition>
  );
}