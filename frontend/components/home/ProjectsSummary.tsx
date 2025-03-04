'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProjectCard from '../projects/ProjectCard';
import { Project } from '../projects/project.types';
import { DotPattern } from '../magicui/dot-pattern';
import { Marquee } from '../magicui/marquee';

export default function ProjectsSummary() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Technologies list for the marquee
  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Tailwind CSS', icon: '🌊' },
    { name: 'GraphQL', icon: '⬢' },
    { name: 'Docker', icon: '🐳' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Git', icon: '🔄' },
    { name: 'Express', icon: '🚂' },
    { name: 'Redux', icon: '🔄' },
    { name: 'Firebase', icon: '🔥' },
  ];

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const res = await fetch('/api/projects/featured');

        if (!res.ok) {
          throw new Error('Failed to fetch featured projects');
        }

        const data = await res.json();
        setFeaturedProjects(data);
      } catch (err) {
        setError('Failed to load featured projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  // Animation variants for the section header
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  // Animation variants for the project cards
  const projectVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const projectItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  return (
    <section id="projects" className="relative py-20 px-6 bg-card-hover border-y border-border overflow-hidden">
      {/* Background Dot Pattern */}
      <DotPattern
        className="[mask-image:radial-gradient(500px_circle_at_left_center,white,transparent)]"
        offset={24}
        radius={0.5}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex justify-between items-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <h2 className="text-3xl font-bold gradient-text inline-block">projects.featured()</h2>
          <Link href="/projects" className="btn btn-secondary text-sm">View All Projects</Link>
        </motion.div>

        {/* Technologies Marquee */}
        <div className="mb-10 py-4 -mx-6">
          <Marquee pauseOnHover className="[--duration:25s]">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="mx-4 flex items-center bg-card py-2 px-4 rounded-full border border-border hover:border-primary hover:shadow-sm transition-all duration-300"
              >
                <span className="mr-2 text-xl">{tech.icon}</span>
                <span className="font-medium">{tech.name}</span>
              </div>
            ))}
          </Marquee>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-muted-foreground">Loading featured projects...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center p-6 bg-card rounded-lg">
            <p className="text-destructive">{error}</p>
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-lg bg-card">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-xl font-medium mb-2">No Projects Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              I&apos;m currently working on adding some amazing projects to my portfolio. Check back soon to see what I&apos;ve been building!
            </p>
            <Link href="/contact" className="btn btn-primary">
              Let&apos;s Create Something Together
            </Link>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={projectVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {featuredProjects.map((project) => (
              <motion.div key={project.id} variants={projectItemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}