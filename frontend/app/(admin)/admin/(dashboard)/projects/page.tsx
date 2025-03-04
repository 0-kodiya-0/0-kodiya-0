'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Project } from '@/components/projects/project.types';

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [authenticated, setAuthenticated] = useState(false);

    const router = useRouter();

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
                fetchProjects();
            } catch {
                router.push('/admin');
            }
        };

        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/projects', {
                    credentials: 'include',
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch projects');
                }

                const data = await res.json();
                setProjects(data);
            } catch (err) {
                setError('Failed to load projects');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleDeleteProject = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this project?')) {
            return;
        }

        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Failed to delete project');
            }

            // Update project list
            setProjects(projects.filter(project => project.id !== id));
        } catch (err) {
            console.error('Error deleting project', err);
            alert('Failed to delete project');
        }
    };

    const toggleFeatured = async (project: Project) => {
        try {
            const res = await fetch(`/api/projects/${project.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    featured: !project.featured
                }),
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Failed to update project');
            }

            // Update project list
            setProjects(
                projects.map(p => 
                    p.id === project.id ? { ...p, featured: !p.featured } : p
                )
            );
        } catch (err) {
            console.error('Error updating project', err);
            alert('Failed to update project');
        }
    };

    if (!authenticated) {
        return null; // Will redirect to login
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-6 flex-grow">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Manage Projects</h1>
                    <p className="text-muted-foreground mt-1">Add, edit and showcase your portfolio projects</p>
                </div>
            </div>

            <div className="mb-8">
                <Link href="/admin/projects/new" className="btn btn-primary">
                    + Add New Project
                </Link>
            </div>

            <div className="card">
                {loading ? (
                    <div className="py-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
                        </div>
                        <p>Loading projects...</p>
                    </div>
                ) : error ? (
                    <div className="py-8 text-center text-red-500">{error}</div>
                ) : projects.length === 0 ? (
                    <div className="py-12 text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                            <path d="M18 14h-8" />
                            <path d="M15 18h-5" />
                            <path d="M10 6h8v4h-8V6Z" />
                        </svg>
                        <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                        <p className="text-muted-foreground mb-6">Add your first project to showcase your work</p>
                        <Link href="/admin/projects/new" className="btn btn-primary">
                            Add Your First Project
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-card-hover border-b border-border">
                                    <th className="p-3 text-left">Title</th>
                                    <th className="p-3 text-left">Description</th>
                                    <th className="p-3 text-left">Technologies</th>
                                    <th className="p-3 text-center">Featured</th>
                                    <th className="p-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project.id} className="border-b border-border hover:bg-card-hover">
                                        <td className="p-3 font-medium">{project.title}</td>
                                        <td className="p-3">
                                            <div className="max-w-xs truncate">{project.description}</div>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex flex-wrap gap-1">
                                                {project.technologies.slice(0, 3).map((tech) => (
                                                    <span 
                                                        key={tech} 
                                                        className="inline-block px-2 py-1 text-xs rounded-full bg-card-hover"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.technologies.length > 3 && (
                                                    <span className="text-xs text-muted-foreground">
                                                        +{project.technologies.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-3 text-center">
                                            <button 
                                                onClick={() => toggleFeatured(project)}
                                                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                                    project.featured 
                                                        ? 'bg-primary text-primary-foreground' 
                                                        : 'bg-card-hover text-muted-foreground'
                                                }`}
                                                title={project.featured ? 'Featured' : 'Not Featured'}
                                            >
                                                {project.featured ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M12 2 6.09 8.26 2 9.27l3.54 3.44L4.68 17 12 14.54 19.32 17l-.86-4.29L22 9.27l-4.09-1.01L12 2z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </td>
                                        <td className="p-3 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <Link
                                                    href={`/admin/projects/edit/${project.id}`}
                                                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm dark:bg-blue-900 dark:text-blue-300"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteProject(project.id)}
                                                    className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm dark:bg-red-900 dark:text-red-300"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}