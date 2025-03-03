"use client"

import HeroSection from '@/components/home/HeroSection';
import AboutSummary from '@/components/home/AboutSummary';
import ProjectsSummary from '@/components/home/ProjectsSummary';
import ContactSummary from '@/components/home/ContactSummary';
import TestimonialsSection from '@/components/home/TestimonialsSummary';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSummary />
      <ProjectsSummary />
      <TestimonialsSection/>
      <ContactSummary />
    </>
  );
}