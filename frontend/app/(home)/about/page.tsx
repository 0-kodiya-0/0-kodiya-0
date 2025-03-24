'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DotPattern } from '@/components/magicui/dot-pattern';
import ProfileSection from '@/components/about/ProfileSection';
import EducationTimeline from '@/components/about/EducationTimeline';
import SkillsSection from '@/components/about/SkillsSection';
import CompetitionsSection from '@/components/about/CompetitionsSection';
import { educationTimeline, skills, competitions } from '@/components/about/data';
import SectionContainer from '@/components/layout/SectionContainer';

const AboutPage: React.FC = () => {
  return (
    <div className="relative">
      {/* Background Dot Pattern */}
      <DotPattern
        className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_top,white,transparent)]"
        offset={24}
        radius={0.5}
      />

      {/* Header and Profile Section */}
      <SectionContainer spacing="default">
        <motion.h1
          className="text-4xl font-bold mb-8 gradient-text inline-block relative z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About
        </motion.h1>

        <ProfileSection />
      </SectionContainer>

      {/* Education Timeline */}
      <SectionContainer 
        withBackground={true} 
        spacing="large"
        className="relative z-10"
      >
        <EducationTimeline educationTimeline={educationTimeline} />
      </SectionContainer>

      {/* Skills Section */}
      <SectionContainer spacing="default">
        <SkillsSection skills={skills} />
      </SectionContainer>

      {/* Competitions Section */}
      <SectionContainer 
        spacing="default"
        className="relative z-10"
      >
        <CompetitionsSection competitions={competitions} />
      </SectionContainer>
    </div>
  );
};

export default AboutPage;