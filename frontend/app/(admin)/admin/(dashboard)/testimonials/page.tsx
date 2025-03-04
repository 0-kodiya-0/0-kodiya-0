'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Testimonial } from '@/components/testimonial/testimonial.types';

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
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
                fetchTestimonials();
            } catch {
                router.push('/admin');
            }
        };

        const fetchTestimonials = async () => {
            try {
                const res = await fetch('/api/testimonials', {
                    credentials: 'include',
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch testimonials');
                }

                const data = await res.json();
                setTestimonials(data);
            } catch (err) {
                setError('Failed to load testimonials');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleDeleteTestimonial = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this testimonial?')) {
            return;
        }

        try {
            const res = await fetch(`/api/testimonials/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Failed to delete testimonial');
            }

            // Update testimonial list
            setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
        } catch (err) {
            console.error('Error deleting testimonial', err);
            alert('Failed to delete testimonial');
        }
    };

    if (!authenticated) {
        return null; // Will redirect to login
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-6 flex-grow">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Manage Testimonials</h1>
                    <p className="text-muted-foreground mt-1">Add and edit client testimonials that appear on your homepage</p>
                </div>
            </div>

            <div className="mb-8">
                <Link href="/admin/testimonials/new" className="btn btn-primary">
                    + Add New Testimonial
                </Link>
            </div>

            <div className="card">
                {loading ? (
                    <div className="py-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
                        </div>
                        <p>Loading testimonials...</p>
                    </div>
                ) : error ? (
                    <div className="py-8 text-center text-red-500">{error}</div>
                ) : testimonials.length === 0 ? (
                    <div className="py-12 text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <h3 className="text-lg font-medium mb-2">No testimonials yet</h3>
                        <p className="text-muted-foreground mb-6">Add your first testimonial to showcase client feedback on your homepage</p>
                        <Link href="/admin/testimonials/new" className="btn btn-primary">
                            Add Your First Testimonial
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-card-hover border-b border-border">
                                    <th className="p-3 text-left">Client</th>
                                    <th className="p-3 text-left">Position</th>
                                    <th className="p-3 text-left">Content</th>
                                    <th className="p-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonials.map((testimonial) => (
                                    <tr key={testimonial.id} className="border-b border-border hover:bg-card-hover">
                                        <td className="p-3">
                                            <div className="flex items-center">
                                                <div className="relative w-8 h-8 mr-3">
                                                    <Image
                                                        src={testimonial.image}
                                                        alt={testimonial.name}
                                                        width={32}
                                                        height={32}
                                                        className="rounded-full"
                                                    />
                                                </div>
                                                <span className="font-medium">{testimonial.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-muted-foreground">
                                            {testimonial.role}
                                            {testimonial.company && <span> at {testimonial.company}</span>}
                                        </td>
                                        <td className="p-3">
                                            <div className="max-w-xs truncate">{testimonial.content}</div>
                                        </td>
                                        <td className="p-3 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <Link
                                                    href={`/admin/testimonials/edit/${testimonial.id}`}
                                                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm dark:bg-blue-900 dark:text-blue-300"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteTestimonial(testimonial.id)}
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