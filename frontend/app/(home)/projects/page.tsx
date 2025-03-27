'use client';

import ProjectCard from '@/components/projects/ProjectCard';
import { useGitHubAPI } from '@/hooks/useGitHubApi';
import { Project } from '@/models/project';
import { useEffect, useState } from 'react';

export default function ProjectsPage() {
    const { getRepositories } = useGitHubAPI();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const repos = await getRepositories(10);

                const projectData: Project[] = repos.map(repo => ({
                    name: repo.name,
                    description: repo.description || 'No description available',
                    technologies: [repo.language || 'Unknown'],
                    githubUrl: repo.html_url,
                    topics: repo.topics,
                    language: repo.language || 'Unknown',
                    stargazers_count: repo.stargazers_count,
                    forks_count: repo.forks_count
                }));

                setProjects(projectData);
            } catch (err) {
                setError('Failed to load projects');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [getRepositories]);

    return (
        <div className="max-w-7xl mx-auto py-16 px-6">
            <h1 className="text-4xl font-bold mb-8 text-center">
                My GitHub Projects
            </h1>

            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-500">
                    {error}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <ProjectCard key={project.name} project={project}/>
                    ))}
                </div>
            )}
        </div>
    );
}