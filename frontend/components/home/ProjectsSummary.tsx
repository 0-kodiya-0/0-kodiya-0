'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProjectCard from '../projects/ProjectCard';
import { Project } from '../projects/project.types';

export default function ProjectsSummary() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <section id="projects" className="py-20 px-6 bg-(--card-hover) border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">
            <span className="text-(--syntax-keyword)">const</span>
            <span className="ml-2">projects</span>
            <span className="text-(--syntax-operator) mx-2">=</span>
            <span className="text-(--syntax-function)">myWork</span>
            <span className="text-(--syntax-operator)">()</span>
            <span>;</span>
          </h2>
          <Link href="/projects" className="btn btn-secondary text-sm">View All Projects</Link>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}