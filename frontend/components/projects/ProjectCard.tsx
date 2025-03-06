'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from './project.types';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    // Only show up to 4 technologies to maintain consistent card height
    const displayTechnologies = project.technologies.slice(0, 4);
    const hasMoreTech = project.technologies.length > 4;

    return (
        <motion.div
            className="card group relative h-full flex flex-col overflow-hidden"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            {/* Project Image */}
            <div className="h-48 bg-gradient-to-r from-primary to-accent rounded-md mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-syntax-bg opacity-80 group-hover:opacity-60 transition-opacity"></div>
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                >
                    <span className="text-4xl">{project.image}</span>
                </motion.div>
            </div>

            {/* Project Info - Fixed Height Container */}
            <div className="flex flex-col flex-grow">
                {/* Title with fixed height */}
                <div className="h-14 mb-2">
                    <h3 className="text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                </div>

                {/* Description with fixed height and truncation */}
                <div className="h-12 mb-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                    </p>
                </div>

                {/* Technologies - Fixed height container */}
                <div className="flex flex-wrap gap-2 mb-4 h-12 content-start">
                    {displayTechnologies.map((tech) => (
                        <span
                            key={tech}
                            className="inline-block text-xs px-2 py-1 bg-card-hover rounded-md whitespace-nowrap transition-colors border border-transparent group-hover:border-primary/30"
                        >
                            {tech}
                        </span>
                    ))}
                    {hasMoreTech && (
                        <span className="inline-block text-xs px-2 py-1 bg-card-hover rounded-md whitespace-nowrap">
                            +{project.technologies.length - 4}
                        </span>
                    )}
                </div>

                {/* Spacer to push links to bottom */}
                <div className="flex-grow"></div>
            </div>

            {/* Links */}
            <div className="flex justify-between pt-2 border-t border-border mt-auto">
                <Link
                    href={`/projects/${project.id}`}
                    className="text-primary animated-underline text-sm flex items-center"
                >
                    <span>View Project</span>
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                        initial={{ x: 0 }}
                        animate={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.3 }}
                    >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </motion.svg>
                </Link>

                <a
                    href={project.githubUrl}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                </a>
            </div>

            {/* "Featured" badge for featured projects */}
            {project.featured && (
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full z-10">
                    Featured
                </div>
            )}
        </motion.div>
    );
}