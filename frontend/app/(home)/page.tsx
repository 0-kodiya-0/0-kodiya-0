"use client"

import HeroSection from '@/components/home/HeroSection';
import AboutSummary from '@/components/home/AboutSummary';
import ProjectsSummary from '@/components/home/ProjectsSummary';
import ContactSummary from '@/components/home/ContactSummary';
import TestimonialsSection from '@/components/home/TestimonialsSummary';
import TechnologiesShowcase from '@/components/home/TechnologiesShowcase';
import SectionContainer from '@/components/layout/SectionContainer';
import { PageTransition } from '@/components/layout/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      {/* Hero has its own special spacing already */}
      <HeroSection />

      {/* Consistent spacing for all other sections */}
      <SectionContainer>
        <AboutSummary />
      </SectionContainer>

      <SectionContainer>
        <TechnologiesShowcase />
      </SectionContainer>

      <SectionContainer withBackground withBorder>
        <ProjectsSummary />
      </SectionContainer>

      <SectionContainer>
        <TestimonialsSection />
      </SectionContainer>

      <SectionContainer>
        <ContactSummary />
      </SectionContainer>
    </PageTransition>
  );
}