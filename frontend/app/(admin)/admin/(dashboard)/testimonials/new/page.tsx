'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {default as NextImage} from 'next/image';
import type { TestimonialFormData } from '@/components/testimonial/testimonial.types';

interface ValidationErrors {
    name?: string;
    role?: string;
    content?: string;
    image?: string;
}

export default function NewTestimonialPage() {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    // Set a default placeholder image for when no valid image is available
    const placeholderImage = '/placeholder-avatar.png';

    const [formData, setFormData] = useState<TestimonialFormData>({
        name: '',
        role: '',
        company: '',
        content: '',
        image: ''
    });

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
            } catch {
                router.push('/admin');
            }
        };

        checkAuth();
    }, [router]);

    const validateImage = (url: string): boolean => {
        // Return true if valid, false if invalid
        if (!url || url.trim() === '') {
            setPreviewImage(null);
            setImageError('Image URL is required');
            return false;
        }
        
        try {
            // Check if it's a valid URL
            new URL(url);
            
            // Validate if it's an image URL (common image extensions)
            const isImageUrl = /\.(jpeg|jpg|gif|png|svg|webp)$/i.test(url) || 
                               url.startsWith('https://avatar.vercel.sh/');
            
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
                    setPreviewImage(placeholderImage);
                    setImageError('Failed to load image. Please check the URL.');
                };
                img.src = url;
                return true;
            } else {
                setPreviewImage(placeholderImage);
                setImageError('URL does not appear to be an image. Please use a URL ending with an image extension (jpg, png, etc.)');
                return false;
            }
        } catch {
            // Invalid URL format
            setPreviewImage(placeholderImage);
            setImageError('Please enter a valid URL');
            return false;
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear validation errors for this field
        if (validationErrors[name as keyof ValidationErrors]) {
            setValidationErrors({
                ...validationErrors,
                [name]: undefined
            });
        }

        // Update preview image when image URL changes
        if (name === 'image' && value) {
            validateImage(value);
        }
    };

    const validateForm = (): boolean => {
        const errors: ValidationErrors = {};
        
        // Validate name
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        } else if (formData.name.length > 50) {
            errors.name = 'Name must be less than 50 characters';
        }
        
        // Validate role
        if (!formData.role.trim()) {
            errors.role = 'Role is required';
        } else if (formData.role.length > 50) {
            errors.role = 'Role must be less than 50 characters';
        }
        
        // Validate content
        if (!formData.content.trim()) {
            errors.content = 'Testimonial content is required';
        } else if (formData.content.length < 10) {
            errors.content = 'Testimonial content is too short (minimum 10 characters)';
        } else if (formData.content.length > 500) {
            errors.content = 'Testimonial content is too long (maximum 500 characters)';
        }
        
        // Validate image URL
        if (!formData.image.trim()) {
            errors.image = 'Image URL is required';
        } else if (imageError) {
            errors.image = imageError;
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        // Validate form before submission
        if (!validateForm()) {
            return;
        }
        
        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch('/api/testimonials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Failed to create testimonial');
            }

            router.push('/admin/testimonials');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err?.message || 'An error occurred while creating the testimonial');
        } finally {
            setSubmitting(false);
        }
    };

    // Generate placeholder avatar based on name
    const generateAvatar = () => {
        if (formData.name.trim()) {
            // Use the first name for the avatar
            const firstName = formData.name.split(' ')[0].toLowerCase();
            const newUrl = `https://avatar.vercel.sh/${firstName}`;
            
            setFormData({
                ...formData,
                image: newUrl
            });
            
            validateImage(newUrl);
        } else {
            setImageError('Please enter a name first');
        }
    };

    if (!authenticated) {
        return null; // Will redirect to login
    }

    return (
        <div className="max-w-5xl mx-auto py-12 px-6 flex-grow">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Add New Testimonial</h1>
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
                                    className={`w-full p-2 border ${validationErrors.name ? 'border-red-500' : 'border-border'} rounded-md bg-card`}
                                    placeholder="John Doe"
                                />
                                {validationErrors.name && (
                                    <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>
                                )}
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
                                    className={`w-full p-2 border ${validationErrors.role ? 'border-red-500' : 'border-border'} rounded-md bg-card`}
                                    placeholder="Product Manager"
                                />
                                {validationErrors.role && (
                                    <p className="mt-1 text-sm text-red-500">{validationErrors.role}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-medium mb-1">
                                    Company (Optional)
                                </label>
                                <input
                                    id="company"
                                    name="company"
                                    type="text"
                                    value={formData.company}
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
                                    rows={5}
                                    className={`w-full p-2 border ${validationErrors.content ? 'border-red-500' : 'border-border'} rounded-md bg-card`}
                                    placeholder="Working with Sanithu was an absolute pleasure. The project was delivered on time and exceeded our expectations."
                                ></textarea>
                                {validationErrors.content ? (
                                    <p className="mt-1 text-sm text-red-500">{validationErrors.content}</p>
                                ) : (
                                    <p className="text-xs mt-1 text-muted-foreground">
                                        Keep testimonials concise and focused (50-150 words recommended).
                                        <span className="ml-2">
                                            {formData.content.length}/500 characters
                                        </span>
                                    </p>
                                )}
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
                                                width={96}
                                                height={96}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="12" cy="7" r="4"></circle>
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div>
                                        <label htmlFor="image" className="block text-xs font-medium mb-1">
                                            Image URL *
                                        </label>
                                        <input
                                            id="image"
                                            name="image"
                                            type="url"
                                            value={formData.image}
                                            onChange={handleChange}
                                            required
                                            className={`w-full p-2 border ${validationErrors.image ? 'border-red-500' : 'border-border'} rounded-md bg-card text-sm`}
                                            placeholder="https://avatar.vercel.sh/johndoe"
                                        />
                                        {validationErrors.image && (
                                            <p className="mt-1 text-sm text-red-500">{validationErrors.image}</p>
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
                            disabled={submitting}
                            className={`btn btn-primary ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
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