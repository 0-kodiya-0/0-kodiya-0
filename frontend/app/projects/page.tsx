'use client';

import { useEffect, useState } from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import { Project } from '@/components/projects/project.types';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);

                if (!res.ok) {
                    throw new Error('Failed to fetch projects');
                }

                const data = await res.json();
                setProjects(data);
            } catch (err) {
                setError('Failed to load projects');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-16 px-6">
            <h1 className="text-4xl font-bold mb-10 gradient-text inline-block">My Projects</h1>

            <p className="mb-10 max-w-3xl">
                Below is a collection of projects I&apos;ve worked on. Each one has presented unique
                challenges and opportunities to learn and grow. Click on a project to learn more
                about it or check out the code on GitHub.
            </p>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-pulse text-2xl">Loading projects...</div>
                </div>
            ) : error ? (
                <div className="text-center p-8 bg-(--card) rounded-lg border border-red-300">
                    <p className="text-xl text-red-500 mb-4">{error}</p>
                    <p>Please try refreshing the page or come back later.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
}