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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/featured`);

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
    <section id="projects" className="relative py-20 px-6 bg-(--card-hover) border-y border-gray-200 dark:border-gray-800 overflow-hidden">
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
          <h2 className="text-3xl font-bold">
            <span className="text-(--syntax-keyword)">const</span>
            <span className="ml-2">projects</span>
            <span className="text-(--syntax-operator) mx-2">=</span>
            <span className="text-(--syntax-function)">myWork</span>
            <span className="text-(--syntax-operator)">()</span>
            <span>;</span>
          </h2>
          <Link href="/projects" className="btn btn-secondary text-sm">View All Projects</Link>
        </motion.div>

        {/* Technologies Marquee */}
        <div className="mb-10 py-4 -mx-6">
          <Marquee pauseOnHover className="[--duration:25s]">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="mx-4 flex items-center bg-(--card) py-2 px-4 rounded-full border border-gray-200 dark:border-gray-800"
              >
                <span className="mr-2 text-lg">{tech.icon}</span>
                <span className="font-medium">{tech.name}</span>
              </div>
            ))}
          </Marquee>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-xl">Loading featured projects...</div>
          </div>
        ) : error ? (
          <div className="text-center p-6 bg-(--card) rounded-lg">
            <p className="text-red-500">{error}</p>
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