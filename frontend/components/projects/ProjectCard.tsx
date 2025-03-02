import Link from 'next/link';
import { Project } from './project.types';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="card group">
            <div className="h-48 bg-linear-to-r from-(--primary) to-(--accent) rounded-md mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-(--syntax-bg) opacity-80 group-hover:opacity-60 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">{project.image}</span>
                </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 bg-(--card-hover) rounded-full">
                        {tech}
                    </span>
                ))}
            </div>
            <div className="flex justify-between">
                <Link href={`/projects/${project.id}`} className="text-(--primary) animated-underline text-sm">
                    View Project
                </Link>
                <a
                    href={project.githubUrl}
                    className="text-(--syntax-comment) hover:text-(--foreground) transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                </a>
            </div>
        </div>
    );
}