'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {default as NextImage} from 'next/image';
import type { Testimonial } from '@/components/testimonial/testimonial.types';

export default function EditTestimonialPage() {
    const params = useParams();
    const testimonialId = params.id as string;
    const router = useRouter();

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);

    const [formData, setFormData] = useState<Testimonial | null>(null);

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
                fetchTestimonial();
            } catch {
                router.push('/admin');
            }
        };

        const fetchTestimonial = async () => {
            try {
                const res = await fetch(`/api/testimonials/${testimonialId}`, {
                    credentials: 'include',
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch testimonial');
                }

                const data = await res.json();
                setFormData(data);
                setPreviewImage(data.image);
            } catch (err) {
                setError('Failed to load testimonial');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [testimonialId, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!formData) return;
        
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Update preview image when image URL changes with validation
        if (name === 'image') {
            validateImageUrl(value);
        }
    };

    const validateImageUrl = (url: string) => {
        // First check if value is a valid URL
        try {
            // Check if it's a valid URL
            new URL(url);
            
            // Validate if it's an image URL (common image extensions)
            const isImageUrl = /\.(jpeg|jpg|gif|png|svg|webp)$/i.test(url) || 
                               url.includes('avatar.vercel.sh'); // Allow Vercel avatar API
            
            if (isImageUrl) {
                // Create an image element to test loading
                const img = new Image();
                img.onload = () => {
                    // Image loaded successfully
                    setPreviewImage(url);
                    setImageError(null);
                };
                img.onerror = () => {
                    // Failed to load image
                    setPreviewImage('');
                    setImageError('Failed to load image. Please check the URL.');
                };
                img.src = url;
            } else {
                setPreviewImage('');
                setImageError('URL does not appear to be an image. Please use a URL ending with an image extension (jpg, png, etc.) or use the Vercel avatar API.');
            }
        } catch {
            // Invalid URL format
            setPreviewImage('');
            setImageError('Please enter a valid URL');
        }
    };

    const generateAvatar = () => {
        if (formData && formData.name.trim()) {
            // Use the first name for the avatar
            const firstName = formData.name.split(' ')[0].toLowerCase();
            const avatarUrl = `https://avatar.vercel.sh/${firstName}`;
            setFormData({
                ...formData,
                image: avatarUrl
            });
            setPreviewImage(avatarUrl);
            setImageError(null);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        // Validate content length
        if (formData.content.length < 20) {
            setError('Testimonial content should be at least 20 characters');
            return;
        }

        // Validate name
        if (formData.name.trim().length < 3) {
            setError('Name should be at least 3 characters');
            return;
        }

        // Validate role
        if (formData.role.trim().length < 2) {
            setError('Role should be at least 2 characters');
            return;
        }

        // Validate image URL
        if (!formData.image || imageError) {
            setError('Please provide a valid image URL');
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch(`/api/testimonials/${testimonialId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Failed to update testimonial');
            }

            router.push('/admin/testimonials');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err?.message || 'An error occurred while updating the testimonial');
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
                <div className="animate-pulse text-xl">Loading testimonial data...</div>
            </div>
        );
    }

    if (!formData) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <div className="text-xl text-red-500">Testimonial not found</div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-12 px-6 flex-grow">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Edit Testimonial</h1>
                <Link href="/admin/testimonials" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Testimonials
                </Link>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md dark:bg-red-900/20 dark:text-red-300">
                    {error}
                </div>
            )}

            <div className="card">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">
                                    Client Name *
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    minLength={3}
                                    className="w-full p-2 border border-border rounded-md bg-card"
                                    placeholder="John Doe"
                                />
                                <p className="text-xs mt-1 text-muted-foreground">
                                    Minimum 3 characters
                                </p>
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-sm font-medium mb-1">
                                    Role/Position *
                                </label>
                                <input
                                    id="role"
                                    name="role"
                                    type="text"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                    minLength={2}
                                    className="w-full p-2 border border-border rounded-md bg-card"
                                    placeholder="Product Manager"
                                />
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-medium mb-1">
                                    Company (Optional)
                                </label>
                                <input
                                    id="company"
                                    name="company"
                                    type="text"
                                    value={formData.company || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-border rounded-md bg-card"
                                    placeholder="Acme Inc."
                                />
                            </div>

                            <div>
                                <label htmlFor="content" className="block text-sm font-medium mb-1">
                                    Testimonial Content *
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                    minLength={20}
                                    rows={5}
                                    className="w-full p-2 border border-border rounded-md bg-card"
                                    placeholder="Working with Sanithu was an absolute pleasure. The project was delivered on time and exceeded our expectations."
                                ></textarea>
                                <p className="text-xs mt-1 text-muted-foreground">
                                    Minimum 20 characters. Keep testimonials concise and focused (50-150 words recommended).
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Profile Picture
                                </label>
                                <div className="flex justify-center mb-4">
                                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border">
                                        {previewImage ? (
                                            <NextImage
                                                src={previewImage}
                                                alt="Avatar preview"
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                                                No image
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div>
                                        <label htmlFor="image" className="block text-xs font-medium mb-1">
                                            Image URL
                                        </label>
                                        <input
                                            id="image"
                                            name="image"
                                            type="url"
                                            value={formData.image}
                                            onChange={handleChange}
                                            required
                                            className={`w-full p-2 border ${
                                                imageError ? 'border-red-500' : 'border-border'
                                            } rounded-md bg-card text-sm`}
                                            placeholder="https://avatar.vercel.sh/johndoe"
                                        />
                                        {imageError && (
                                            <p className="text-xs mt-1 text-red-500">{imageError}</p>
                                        )}
                                    </div>

                                    <div className="text-center">
                                        <p className="text-xs mb-2 text-muted-foreground">or</p>
                                        <button
                                            type="button"
                                            onClick={generateAvatar}
                                            className="text-sm px-3 py-1 border border-border rounded-md hover:bg-card-hover transition-colors"
                                        >
                                            Generate from Name
                                        </button>
                                        <p className="text-xs mt-2 text-muted-foreground">
                                            Uses Vercel&apos;s avatar API to generate a profile image
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <button
                            type="submit"
                            disabled={submitting || !!imageError}
                            className={`btn btn-primary ${
                                (submitting || !!imageError) ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {submitting ? 'Saving...' : 'Save Testimonial'}
                        </button>
                        <Link href="/admin/testimonials" className="btn btn-secondary">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}