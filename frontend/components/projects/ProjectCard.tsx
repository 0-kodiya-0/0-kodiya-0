import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/models/project';
import Image from 'next/image';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const displayTechnologies = project.technologies.slice(0, 4);
    const hasMoreTech = project.technologies.length > 4;

    return (
        <motion.div
            className="card group relative h-full flex flex-col overflow-hidden"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative w-full h-48 overflow-hidden">
                {project.demoImage ? (
                    <Image
                        width={500}
                        height={500}
                        src={project.demoImage}
                        alt={`${project.name} demo`}
                        className="object-cover transition-transform group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                        <span className="text-muted-foreground">No Preview</span>
                    </div>
                )}
            </div>

            {/* Project Type Label */}
            <div className="absolute top-2 right-2 z-10">
                <span className="inline-block text-xs px-2 py-1 bg-card-hover rounded-md border border-border/50 text-muted-foreground">
                    {project.topics.length > 0 ? project.topics[0] : 'Project'}
                </span>
            </div>

            {/* Project Info - Fixed Height Container */}
            <div className="flex flex-col flex-grow">
                {/* Title with fixed height */}
                <div className="h-14 mb-2 pr-10">
                    <h3 className="text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {project.name}
                    </h3>
                </div>

                {/* Description with fixed height and truncation */}
                <div className="h-12 mb-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                    </p>
                </div>

                {/* Project Metadata */}
                <div className="flex justify-between items-center mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-2">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </span>
                        <span>{project.language}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="12" y1="18" x2="12" y2="12"></line>
                                <line x1="9" y1="15" x2="15" y2="15"></line>
                            </svg>
                        </span>
                        <span>{project.stargazers_count}</span>
                    </div>
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
                    href={`/projects/${project.name}`}
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
        </motion.div>
    );
}