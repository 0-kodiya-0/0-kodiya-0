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
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Popular/featured technologies to always show
    const featuredTechs = ['React', 'TypeScript', 'Next.js', 'Node.js'];

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

    // Filter technologies based on search term
    const filteredTechnologies = searchTerm
        ? allTechnologies.filter(tech => 
            tech.toLowerCase().includes(searchTerm.toLowerCase()))
        : allTechnologies;

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

                {/* Technology Filter */}
                {!loading && !error && allTechnologies.length > 0 && (
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="flex flex-wrap gap-2 mb-3">
                            {/* All button */}
                            <button
                                onClick={() => setSelectedTech(null)}
                                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                    selectedTech === null
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                }`}
                            >
                                All
                            </button>
                            
                            {/* Featured/popular technologies */}
                            {featuredTechs
                                .filter(tech => allTechnologies.includes(tech))
                                .map(tech => (
                                    <button
                                        key={tech}
                                        onClick={() => setSelectedTech(tech)}
                                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                            selectedTech === tech
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                        }`}
                                    >
                                        {tech}
                                    </button>
                                ))}
                                
                            {/* Filter toggle button */}
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className="px-3 py-1 text-sm rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center"
                            >
                                {filterOpen ? 'Hide filters' : 'More filters'}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={`ml-1 transition-transform ${filterOpen ? 'rotate-180' : ''}`}
                                >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                        </div>
                        
                        {/* Expanded filter panel */}
                        {filterOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-card p-4 rounded-lg border border-border mb-4"
                            >
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        placeholder="Search technologies..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full p-2 text-sm bg-input border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                                
                                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                                    {filteredTechnologies.length > 0 ? (
                                        filteredTechnologies.map(tech => (
                                            <button
                                                key={tech}
                                                onClick={() => {
                                                    setSelectedTech(tech);
                                                    setFilterOpen(false);
                                                }}
                                                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                                    selectedTech === tech
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                                }`}
                                            >
                                                {tech}
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No matching technologies found</p>
                                    )}
                                </div>
                            </motion.div>
                        )}
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