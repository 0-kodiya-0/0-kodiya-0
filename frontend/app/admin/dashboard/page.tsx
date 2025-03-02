'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Project } from '@/components/projects/project.types';

export default function AdminDashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [authenticated, setAuthenticated] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`, {
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
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
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

    const handleLogout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            router.push('/admin');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    const handleDeleteProject = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this project?')) {
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
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

    const toggleFeatured = async (id: number, featured: boolean) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ featured: !featured }),
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Failed to update project');
            }

            // Update project list
            setProjects(projects.map(project =>
                project.id === id ? { ...project, featured: !featured } : project
            ));
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
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <button onClick={handleLogout} className="btn btn-secondary">
                    Logout
                </button>
            </div>

            <div className="mb-8">
                <Link href="/admin/projects/new" className="btn btn-primary">
                    + Add New Project
                </Link>
            </div>

            <div className="card">
                <h2 className="text-xl font-bold mb-4">Manage Projects</h2>

                {loading ? (
                    <div className="py-8 text-center">Loading projects...</div>
                ) : error ? (
                    <div className="py-8 text-center text-red-500">{error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-(--card-hover) border-b border-gray-200">
                                    <th className="p-3 text-left">ID</th>
                                    <th className="p-3 text-left">Title</th>
                                    <th className="p-3 text-center">Featured</th>
                                    <th className="p-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-4 text-center">
                                            No projects found. Add your first project!
                                        </td>
                                    </tr>
                                ) : (
                                    projects.map((project) => (
                                        <tr key={project.id} className="border-b border-gray-200 hover:bg-(--card-hover)">
                                            <td className="p-3">{project.id}</td>
                                            <td className="p-3 font-medium">{project.title}</td>
                                            <td className="p-3 text-center">
                                                <button
                                                    onClick={() => toggleFeatured(project.id, project.featured)}
                                                    className={`px-2 py-1 rounded-full text-xs ${project.featured
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                >
                                                    {project.featured ? 'Featured' : 'Not Featured'}
                                                </button>
                                            </td>
                                            <td className="p-3 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <Link
                                                        href={`/admin/projects/edit/${project.id}`}
                                                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteProject(project.id)}
                                                        className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}