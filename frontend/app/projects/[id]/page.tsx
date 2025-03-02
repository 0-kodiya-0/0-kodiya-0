'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Project } from '@/components/projects/project.types';

export default function ProjectDetail() {
    const params = useParams();
    const projectId = params.id as string;

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}`);

                if (!res.ok) {
                    throw new Error('Project not found');
                }

                const data = await res.json();
                setProject(data);
            } catch (err) {
                setError('Failed to load project');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    if (loading) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <div className="animate-pulse text-2xl">Loading project...</div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="max-w-7xl mx-auto py-16 px-6 text-center flex-grow">
                <h1 className="text-4xl font-bold mb-6">Project Not Found</h1>
                <p className="mb-8">Sorry, the project you&apos;re looking for doesn&apos;t exist.</p>
                <Link href="/projects" className="btn btn-primary">
                    View All Projects
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-16 px-6 flex-grow">
            <div className="mb-8">
                <Link href="/projects" className="text-(--syntax-comment) hover:text-(--foreground) transition-colors flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Projects
                </Link>
            </div>

            <div className="mb-10">
                <h1 className="text-4xl font-bold">{project.title}</h1>
                <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-(--card-hover) rounded-full text-sm">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="card">
                        <div className="h-64 bg-linear-to-r from-(--primary) to-(--accent) rounded-md mb-6 overflow-hidden relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-(--syntax-bg) opacity-80"></div>
                            <span className="text-8xl relative z-10">{project.image}</span>
                        </div>

                        <h2 className="text-2xl font-bold mb-4">Overview</h2>
                        <div className="space-y-4 mb-8">
                            {project.longDescription.split('\n\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h2 className="text-xl font-bold mb-4">Challenges</h2>
                                <ul className="space-y-2">
                                    {project.challenges.map((challenge, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-(--primary) mr-2">▹</span>
                                            <span>{challenge}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4">Solutions</h2>
                                <ul className="space-y-2">
                                    {project.solutions.map((solution, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-(--primary) mr-2">▹</span>
                                            <span>{solution}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            {project.projectUrl && (
                                <a
                                    href={project.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    Live Demo
                                </a>
                            )}

                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                            >
                                View Code
                            </a>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="card sticky top-24">
                        <h2 className="text-xl font-bold mb-4">Project Details</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-sm text-(--syntax-comment)">PROJECT NAME</h3>
                                <p>{project.title}</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-sm text-(--syntax-comment)">TECHNOLOGIES</h3>
                                <p>{project.technologies.join(', ')}</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-sm text-(--syntax-comment)">LINKS</h3>
                                <div className="flex flex-col space-y-2 mt-2">
                                    {project.projectUrl && (
                                        <a
                                            href={project.projectUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-(--primary) hover:text-(--primary-light) flex items-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            Live Demo
                                        </a>
                                    )}

                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-(--primary) hover:text-(--primary-light) flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                        </svg>
                                        GitHub Repository
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}