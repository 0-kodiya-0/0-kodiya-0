'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProjectCard from '../projects/ProjectCard';
import { DotPattern } from '../magicui/dot-pattern';
import { Project } from '@/models/project';
import { useGitHubAPI } from '@/hooks/useGitHubApi';

// Import shadcn/ui Carousel components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Animation variants - defined outside component to avoid recreation on renders
const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

export default function ProjectsSummary() {
  const { getRepositories } = useGitHubAPI();
  const [projects, setProjects] = useState<Project[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const repos = await getRepositories(10);

        const projectData = repos?.map(repo => ({
          name: repo.name,
          description: repo.description || 'No description available',
          technologies: [repo.language || 'Unknown'],
          githubUrl: repo.html_url,
          topics: repo.topics,
          language: repo.language || 'Unknown',
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          demoImage: repo.demoImage
        }));

        setProjects(projectData || []);
      } catch (err) {
        setError('Failed to load projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [getRepositories]);

  // Render components based on state
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-16 md:py-20">
          <div className="flex flex-col items-center">
            <div className="animate-spin h-6 w-6 md:h-8 md:w-8 border-2 border-primary border-t-transparent rounded-full mb-3 md:mb-4"></div>
            <p className="text-sm md:text-base text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-4 sm:p-6 bg-card rounded-lg">
          <p className="text-destructive text-sm sm:text-base">{error}</p>
        </div>
      );
    }

    if (projects.length === 0) {
      return (
        <div className="text-center py-12 sm:py-16 border border-border rounded-lg bg-card px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 text-muted-foreground/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="text-lg sm:text-xl font-medium mb-2">No Projects Yet</h3>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-5 sm:mb-6">
            I&apos;m currently working on adding some amazing projects to my portfolio. Check back soon to see what I&apos;ve been building!
          </p>
          <Link href="/contact" className="btn btn-primary text-sm py-2">
            Let&apos;s Create Something Together
          </Link>
        </div>
      );
    }

    return (
      <>
        {/* Mobile Carousel View - Shows 1 item at a time */}
        <div className="block md:hidden">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={`mobile-${project.name}-${index}`} className="basis-full">
                  <div className="p-1">
                    <ProjectCard project={project} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Mobile-only "View All Projects" button */}
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/projects" className="btn btn-secondary text-sm py-2 w-full max-w-xs">
              View All Projects
            </Link>
          </motion.div>
        </div>

        {/* Desktop View - Shows 3 items at a time */}
        <div className="hidden md:block">
          <div className="relative group"> {/* Added group class */}
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {projects.map((project, index) => (
                  <CarouselItem key={`desktop-${project.name}-${index}`} className="pl-2 md:pl-4 basis-full md:basis-1/3">
                    <div className="p-1">
                      <ProjectCard project={project} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Carousel>
          </div>

          {/* Desktop "View All Projects" button */}
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/projects" className="btn btn-secondary text-sm py-2">
              View All Projects
            </Link>
          </motion.div>
        </div>
      </>
    );
  };

  return (
    <div id="projects" className="relative overflow-hidden">
      {/* Background Dot Pattern */}
      <DotPattern
        className="[mask-image:radial-gradient(500px_circle_at_left_center,white,transparent)]"
        offset={24}
        radius={0.5}
      />

      <motion.div
        className="mb-6 sm:mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={headerVariants}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text inline-block">projects.featured()</h2>
        </div>
      </motion.div>

      {renderContent()}
    </div>
  );
}