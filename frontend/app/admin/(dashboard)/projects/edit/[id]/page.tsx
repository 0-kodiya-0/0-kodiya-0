'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Project, EditProject } from '@/components/projects/project.types';

export default function EditProjectPage() {
    const params = useParams();
    const projectId = params.id as string;
    const router = useRouter();

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [project, setProject] = useState<Project | null>(null);

    const [techInput, setTechInput] = useState('');
    const [challengeInput, setChallengeInput] = useState('');
    const [solutionInput, setSolutionInput] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/verify', {
                    credentials: 'include',
                });

                if (!res.ok) {
                    throw new Error('Not authenticated');
                }

                setAuthenticated(true);
                fetchProject();
            } catch {
                router.push('/admin');
            }
        };

        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/${projectId}`, {
                    credentials: 'include',
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch project');
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

        checkAuth();
    }, [projectId, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!project) return;

        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
    };

    const handleTechKeyDown = (e: React.KeyboardEvent) => {
        if (!project) return;

        if (e.key === 'Enter' && techInput.trim()) {
            e.preventDefault();
            setProject({
                ...project,
                technologies: [...project.technologies, techInput.trim()]
            });
            setTechInput('');
        }
    };

    const handleRemoveTech = (index: number) => {
        if (!project) return;

        const updatedTech = [...project.technologies];
        updatedTech.splice(index, 1);
        setProject({ ...project, technologies: updatedTech });
    };

    const handleChallengeKeyDown = (e: React.KeyboardEvent) => {
        if (!project) return;

        if (e.key === 'Enter' && challengeInput.trim()) {
            e.preventDefault();
            setProject({
                ...project,
                challenges: [...project.challenges, challengeInput.trim()]
            });
            setChallengeInput('');
        }
    };

    const handleRemoveChallenge = (index: number) => {
        if (!project) return;

        const updatedChallenges = [...project.challenges];
        updatedChallenges.splice(index, 1);
        setProject({ ...project, challenges: updatedChallenges });
    };

    const handleSolutionKeyDown = (e: React.KeyboardEvent) => {
        if (!project) return;

        if (e.key === 'Enter' && solutionInput.trim()) {
            e.preventDefault();
            setProject({
                ...project,
                solutions: [...project.solutions, solutionInput.trim()]
            });
            setSolutionInput('');
        }
    };

    const handleRemoveSolution = (index: number) => {
        if (!project) return;

        const updatedSolutions = [...project.solutions];
        updatedSolutions.splice(index, 1);
        setProject({ ...project, solutions: updatedSolutions });
    };

    const handleToggleFeatured = () => {
        if (!project) return;

        setProject({ ...project, featured: !project.featured });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!project) return;

        setSubmitting(true);
        setError(null);

        try {
            // We're only sending the changes as EditProject type
            const projectChanges: EditProject = {
                title: project.title,
                description: project.description,
                longDescription: project.longDescription,
                technologies: project.technologies,
                image: project.image,
                projectUrl: project.projectUrl,
                githubUrl: project.githubUrl,
                challenges: project.challenges,
                solutions: project.solutions,
                featured: project.featured
            };

            const res = await fetch(`/api/projects/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectChanges),
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Failed to update project');
            }

            router.push('/admin/dashboard');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err?.message || 'An error occurred while updating the project');
        } finally {
            setSubmitting(false);
        }
    };

    if (!authenticated) {
        return null; // Will redirect to login
    }

    if (loading) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <div className="animate-pulse text-xl">Loading project data...</div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <div className="text-xl text-red-500">Project not found</div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-12 px-6 flex-grow">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Edit Project</h1>
                <Link href="/admin/dashboard" className="text-(--syntax-comment) hover:text-(--foreground) transition-colors flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </Link>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <div className="card">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={project.featured}
                            onChange={handleToggleFeatured}
                            className="h-4 w-4"
                        />
                        <label htmlFor="featured" className="font-medium">
                            Featured Project
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium mb-1">
                                Project Title *
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={project.title}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-sm font-medium mb-1">
                                Image Emoji *
                            </label>
                            <input
                                id="image"
                                name="image"
                                type="text"
                                value={project.image}
                                onChange={handleChange}
                                required
                                placeholder="🚀"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                            Short Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={project.description}
                            onChange={handleChange}
                            required
                            rows={2}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="longDescription" className="block text-sm font-medium mb-1">
                            Full Description *
                        </label>
                        <textarea
                            id="longDescription"
                            name="longDescription"
                            value={project.longDescription}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        ></textarea>
                        <p className="text-xs mt-1 text-(--syntax-comment)">
                            Use double line breaks for paragraphs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="projectUrl" className="block text-sm font-medium mb-1">
                                Project URL
                            </label>
                            <input
                                id="projectUrl"
                                name="projectUrl"
                                type="url"
                                value={project.projectUrl}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label htmlFor="githubUrl" className="block text-sm font-medium mb-1">
                                GitHub URL *
                            </label>
                            <input
                                id="githubUrl"
                                name="githubUrl"
                                type="url"
                                value={project.githubUrl}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Technologies *
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {project.technologies.map((tech, index) => (
                                <div key={index} className="flex items-center bg-(--card-hover) px-2 py-1 rounded-full text-sm">
                                    <span>{tech}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTech(index)}
                                        className="ml-2 text-red-500"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            onKeyDown={handleTechKeyDown}
                            placeholder="Add technology and press Enter"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Challenges
                            </label>
                            <div className="space-y-2 mb-2">
                                {project.challenges.map((challenge, index) => (
                                    <div key={index} className="flex items-start bg-(--card-hover) p-2 rounded text-sm">
                                        <span className="flex-grow">{challenge}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveChallenge(index)}
                                            className="ml-2 text-red-500"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={challengeInput}
                                onChange={(e) => setChallengeInput(e.target.value)}
                                onKeyDown={handleChallengeKeyDown}
                                placeholder="Add challenge and press Enter"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Solutions
                            </label>
                            <div className="space-y-2 mb-2">
                                {project.solutions.map((solution, index) => (
                                    <div key={index} className="flex items-start bg-(--card-hover) p-2 rounded text-sm">
                                        <span className="flex-grow">{solution}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSolution(index)}
                                            className="ml-2 text-red-500"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={solutionInput}
                                onChange={(e) => setSolutionInput(e.target.value)}
                                onKeyDown={handleSolutionKeyDown}
                                placeholder="Add solution and press Enter"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`btn btn-primary ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {submitting ? 'Saving...' : 'Save Project'}
                        </button>
                        <Link href="/admin/dashboard" className="btn btn-secondary">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}