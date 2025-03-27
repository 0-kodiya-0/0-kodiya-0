'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { useGitHubAPI } from '@/hooks/useGitHubApi';
import { Project } from '@/models/project';

export interface ProjectDetailProps {
    readme?: string;
    license?: string;
}

export default function ProjectDetail() {
    const params = useParams();
    const projectName = params.id as string;

    const {
        getRepositories,
        getRepositoryReadme,
        getRepositoryLicense
    } = useGitHubAPI();

    const [project, setProject] = useState<Project | null>(null);
    const [projectDetails, setProjectDetails] = useState<ProjectDetailProps>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                // Fetch repositories to get project details
                const repos = await getRepositories(20);
                const projectRepo = repos.find(repo => repo.name === projectName);

                if (!projectRepo) {
                    throw new Error('Project not found');
                }

                // Create project object
                const projectData: Project = {
                    name: projectRepo.name,
                    description: projectRepo.description || 'No description available',
                    technologies: [projectRepo.language || 'Unknown'],
                    githubUrl: projectRepo.html_url,
                    homepage: projectRepo.homepage || undefined,
                    topics: projectRepo.topics,
                    language: projectRepo.language || 'Unknown',
                    stargazers_count: projectRepo.stargazers_count,
                    forks_count: projectRepo.forks_count
                };

                // Fetch README and License
                const [readme, license] = await Promise.all([
                    getRepositoryReadme(projectName),
                    getRepositoryLicense(projectName)
                ]);

                setProject(projectData);
                setProjectDetails({ readme: readme || undefined, license: license || undefined });
            } catch (err) {
                setError('Failed to load project details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (projectName) {
            fetchProjectDetails();
        }
    }, [projectName, getRepositories, getRepositoryReadme, getRepositoryLicense]);

    if (loading) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="max-w-7xl mx-auto py-16 px-6 text-center flex-grow">
                <h1 className="text-4xl font-bold mb-6">Project Not Found</h1>
                <p className="mb-8">{error || 'Sorry, the project you\'re looking for doesn\'t exist.'}</p>
                <Link href="/projects" className="btn btn-primary">
                    View All Projects
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-16 px-6 flex-grow">
            <div className="mb-12">
                <Link href="/projects" className="text-muted-foreground hover:text-foreground flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Projects
                </Link>

                <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
                <p className="text-muted-foreground mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                        {project.language}
                    </span>
                    <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                        ★ {project.stargazers_count} Stars
                    </span>
                    <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                        Forks: {project.forks_count}
                    </span>
                </div>

                <div className="flex space-x-4">
                    {project.homepage && (
                        <a
                            href={project.homepage}
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
                        GitHub Repository
                    </a>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">README</h2>
                    {projectDetails.readme ? (
                        <div className="prose max-w-none">
                            <ReactMarkdown>{projectDetails.readme}</ReactMarkdown>
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No README available</p>
                    )}

                    {projectDetails.license && (
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">License</h2>
                            <pre className="bg-secondary p-4 rounded-md overflow-x-auto text-sm">
                                {projectDetails.license}
                            </pre>
                        </div>
                    )}
                </div>

                <div>
                    <div className="bg-card border rounded-lg p-6 sticky top-24">
                        <h3 className="text-xl font-bold mb-4">Project Details</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm text-muted-foreground">Repository</h4>
                                <p>{project.name}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-muted-foreground">Language</h4>
                                <p>{project.language}</p>
                            </div>
                            {project.topics && project.topics.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground">Topics</h4>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.topics.map(topic => (
                                            <span
                                                key={topic}
                                                className="px-2 py-1 bg-secondary rounded-full text-xs"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}