'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Project, EditProject } from '@/components/projects/project.types';

interface ValidationErrors {
    title?: string;
    description?: string;
    longDescription?: string;
    image?: string;
    technologies?: string;
    githubUrl?: string;
    projectUrl?: string;
    challenges?: string;
    solutions?: string;
}

export default function EditProjectPage() {
    const params = useParams();
    const projectId = params.id as string;
    const router = useRouter();

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

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

        // Clear validation error when field is updated
        if (validationErrors[name as keyof ValidationErrors]) {
            setValidationErrors({
                ...validationErrors,
                [name]: undefined
            });
        }
    };

    const handleTechKeyDown = (e: React.KeyboardEvent) => {
        if (!project) return;

        if (e.key === 'Enter' && techInput.trim()) {
            e.preventDefault();

            // Validate technology input
            if (techInput.length > 30) {
                setValidationErrors({
                    ...validationErrors,
                    technologies: 'Technology name should be less than 30 characters'
                });
                return;
            }

            // Check for duplicates
            if (project.technologies.includes(techInput.trim())) {
                setValidationErrors({
                    ...validationErrors,
                    technologies: 'Technology already added'
                });
                return;
            }

            setProject({
                ...project,
                technologies: [...project.technologies, techInput.trim()]
            });
            setTechInput('');

            // Clear validation error
            if (validationErrors.technologies) {
                setValidationErrors({
                    ...validationErrors,
                    technologies: undefined
                });
            }
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

            // Validate challenge input
            if (challengeInput.length > 200) {
                setValidationErrors({
                    ...validationErrors,
                    challenges: 'Challenge description should be less than 200 characters'
                });
                return;
            }

            setProject({
                ...project,
                challenges: [...project.challenges, challengeInput.trim()]
            });
            setChallengeInput('');

            // Clear validation error
            if (validationErrors.challenges) {
                setValidationErrors({
                    ...validationErrors,
                    challenges: undefined
                });
            }
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

            // Validate solution input
            if (solutionInput.length > 200) {
                setValidationErrors({
                    ...validationErrors,
                    solutions: 'Solution description should be less than 200 characters'
                });
                return;
            }

            setProject({
                ...project,
                solutions: [...project.solutions, solutionInput.trim()]
            });
            setSolutionInput('');

            // Clear validation error
            if (validationErrors.solutions) {
                setValidationErrors({
                    ...validationErrors,
                    solutions: undefined
                });
            }
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

    const validateForm = (): boolean => {
        if (!project) return false;

        const errors: ValidationErrors = {};

        // Validate title
        if (!project.title.trim()) {
            errors.title = 'Title is required';
        } else if (project.title.length > 100) {
            errors.title = 'Title must be less than 100 characters';
        }

        // Validate description
        if (!project.description.trim()) {
            errors.description = 'Description is required';
        } else if (project.description.length > 200) {
            errors.description = 'Description must be less than 200 characters';
        }

        // Validate long description
        if (!project.longDescription.trim()) {
            errors.longDescription = 'Full description is required';
        } else if (project.longDescription.length < 50) {
            errors.longDescription = 'Full description is too short (minimum 50 characters)';
        }

        // Validate emoji
        if (!project.image.trim()) {
            errors.image = 'Image emoji is required';
        }

        // Validate technologies
        if (project.technologies.length === 0) {
            errors.technologies = 'At least one technology is required';
        }

        // Validate GitHub URL
        if (!project.githubUrl.trim()) {
            errors.githubUrl = 'GitHub URL is required';
        } else {
            try {
                new URL(project.githubUrl);
            } catch {
                errors.githubUrl = 'Please enter a valid URL';
            }
        }

        // Validate Project URL if provided
        if (project.projectUrl.trim()) {
            try {
                new URL(project.projectUrl);
            } catch {
                errors.projectUrl = 'Please enter a valid URL';
            }
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!project) return;

        // Validate form before submission
        if (!validateForm()) {
            // Scroll to the first error
            const firstErrorField = Object.keys(validationErrors)[0];
            if (firstErrorField) {
                const element = document.getElementById(firstErrorField);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
            return;
        }

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

            router.push('/admin/projects');
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
                <Link href="/admin/projects" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Projects
                </Link>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md dark:bg-red-900/20 dark:text-red-300">
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
                                className={`w-full p-2 border ${validationErrors.title ? 'border-red-500' : 'border-border'} rounded-md bg-card`}
                            />
                            {validationErrors.title && (
                                <p className="mt-1 text-sm text-red-500">{validationErrors.title}</p>
                            )}
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
                                className={`w-full p-2 border ${validationErrors.image ? 'border-red-500' : 'border-border'} rounded-md bg-card`}
                            />
                            {validationErrors.image && (
                                <p className="mt-1 text-sm text-red-500">{validationErrors.image}</p>
                            )}
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
                            className={`w-full p-2 border ${validationErrors.description ? 'border-red-500' : 'border-border'} rounded-md bg-card`}
                        ></textarea>
                        {validationErrors.description ? (
                            <p className="mt-1 text-sm text-red-500">{validationErrors.description}</p>
                        ) : (
                            <p className="text-xs mt-1 text-muted-foreground">
                                A brief overview of the project.
                                <span className="ml-2">{project.description.length}/200 characters</span>
                            </p>
                        )}
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
                            className={`w-full p-2 border ${validationErrors.longDescription ? 'border-red-500' : 'border-border'} rounded-md bg-card`}
                        ></textarea>
                        {validationErrors.longDescription ? (
                            <p className="mt-1 text-sm text-red-500">{validationErrors.longDescription}</p>
                        ) : (
                            <p className="text-xs mt-1 text-muted-foreground">
                                Use double line breaks for paragraphs.
                                <span className="ml-2">{project.longDescription.length} characters</span>
                            </p>
                        )}
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
                                className={`w-full p-2 border ${validationErrors.projectUrl ? 'border-red-500' : 'border-border'} rounded-md bg-card`}
                            />
                            {validationErrors.projectUrl && (
                                <p className="mt-1 text-sm text-red-500">{validationErrors.projectUrl}</p>
                            )}
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
                                className={`w-full p-2 border ${validationErrors.githubUrl ? 'border-red-500' : 'border-border'} rounded-md bg-card`}
                            />
                            {validationErrors.githubUrl && (
                                <p className="mt-1 text-sm text-red-500">{validationErrors.githubUrl}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Technologies *
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {project.technologies.map((tech, index) => (
                                <div key={index} className="flex items-center bg-card-hover px-2 py-1 rounded-full text-sm">
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
                            className={`w-full p-2 border ${validationErrors.technologies ? 'border-red-500' : 'border-border'} rounded-md bg-card`}
                        />
                        {validationErrors.technologies && (
                            <p className="mt-1 text-sm text-red-500">{validationErrors.technologies}</p>
                        )}
                        {project.technologies.length === 0 && (
                            <p className="mt-1 text-xs text-muted-foreground">
                                Add at least one technology used in this project
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Challenges
                            </label>
                            <div className="space-y-2 mb-2">
                                {project.challenges.map((challenge, index) => (
                                    <div key={index} className="flex items-start bg-card-hover p-2 rounded text-sm">
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
                                className={`w-full p-2 border ${validationErrors.challenges ? 'border-red-500' : 'border-border'} rounded-md bg-card`}
                            />
                            {validationErrors.challenges && (
                                <p className="mt-1 text-sm text-red-500">{validationErrors.challenges}</p>
                            )}
                            <p className="mt-1 text-xs text-muted-foreground">
                                Add challenges faced during the project (optional)
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Solutions
                            </label>
                            <div className="space-y-2 mb-2">
                                {project.solutions.map((solution, index) => (
                                    <div key={index} className="flex items-start bg-card-hover p-2 rounded text-sm">
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
                                className={`w-full p-2 border ${validationErrors.solutions ? 'border-red-500' : 'border-border'} rounded-md bg-card`}
                            />
                            {validationErrors.solutions && (
                                <p className="mt-1 text-sm text-red-500">{validationErrors.solutions}</p>
                            )}
                            <p className="mt-1 text-xs text-muted-foreground">
                                Add solutions implemented to solve challenges (optional)
                            </p>
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
                        <Link href="/admin/projects" className="btn btn-secondary">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}