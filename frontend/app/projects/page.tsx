'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/projects/ProjectCard';
import { Project } from '@/components/projects/project.types';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTech, setSelectedTech] = useState<string | null>(null);
    const [allTechnologies, setAllTechnologies] = useState<string[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/projects');

                if (!res.ok) {
                    throw new Error('Failed to fetch projects');
                }

                const data = await res.json();
                setProjects(data);

                // Extract all unique technologies
                const techs = new Set<string>();
                data.forEach((project: Project) => {
                    project.technologies.forEach(tech => techs.add(tech));
                });

                setAllTechnologies(Array.from(techs).sort());
            } catch (err) {
                setError('Failed to load projects');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Filter projects by selected technology
    const filteredProjects = selectedTech
        ? projects.filter(project => project.technologies.includes(selectedTech))
        : projects;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-16 px-6">
            <div className="mb-12 md:mb-16">
                <motion.h1
                    className="text-4xl font-bold mb-6 inline-block"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="gradient-text">Projects</span>
                </motion.h1>

                <motion.p
                    className="text-muted-foreground max-w-2xl mb-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    A selection of projects I&apos;ve worked on, showcasing my expertise in building
                    scalable web applications with a focus on performance and user experience.
                </motion.p>

                {/* Filter by technology */}
                {!loading && !error && allTechnologies.length > 0 && (
                    <motion.div
                        className="flex flex-wrap gap-2 mb-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <button
                            onClick={() => setSelectedTech(null)}
                            className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedTech === null
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                }`}
                        >
                            All
                        </button>

                        {allTechnologies.map(tech => (
                            <button
                                key={tech}
                                onClick={() => setSelectedTech(tech)}
                                className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedTech === tech
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                    }`}
                            >
                                {tech}
                            </button>
                        ))}
                    </motion.div>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mb-4"></div>
                        <p className="text-muted-foreground">Loading projects...</p>
                    </div>
                </div>
            ) : error ? (
                <div className="text-center py-20 border border-border rounded-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 mx-auto mb-4 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-lg font-medium mb-2">{error}</p>
                    <p className="text-muted-foreground">Please try refreshing the page or check back later.</p>
                </div>
            ) : (
                <>
                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-12 border border-border rounded-lg">
                            <p className="text-lg mb-2">No projects found with this technology.</p>
                            <p className="text-muted-foreground">Try selecting a different filter.</p>
                        </div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {filteredProjects.map((project) => (
                                <motion.div key={project.id} variants={itemVariants}>
                                    <ProjectCard project={project} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </>
            )}
        </div>
    );
}