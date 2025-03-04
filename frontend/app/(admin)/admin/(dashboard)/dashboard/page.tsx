'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/components/projects/project.types';

interface DashboardStats {
    totalProjects: number;
    featuredProjects: number;
    totalTestimonials: number;
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // Fetch projects and testimonials from your API
                const [projectsRes, testimonialsRes] = await Promise.all([
                    fetch('/api/projects', { credentials: 'include' }),
                    fetch('/api/testimonials', { credentials: 'include' })
                ]);

                if (!projectsRes.ok || !testimonialsRes.ok) {
                    throw new Error('Failed to fetch dashboard data');
                }

                const projects = await projectsRes.json();
                const testimonials = await testimonialsRes.json();

                // Calculate statistics
                const featuredProjects = projects.filter((project: Project) => project.featured).length;

                setStats({
                    totalProjects: projects.length,
                    featuredProjects: featuredProjects,
                    totalTestimonials: testimonials.length
                });

                setLoading(false);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data');
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full py-20">
                <div className="flex flex-col items-center">
                    <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mb-4"></div>
                    <p className="text-muted-foreground">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto py-12 px-6">
                <div className="text-center p-8 bg-card border border-border rounded-lg">
                    <p className="text-xl text-red-500 mb-4">{error}</p>
                    <p>Please try refreshing the page or contact support if the issue persists.</p>
                </div>
            </div>
        );
    }

    const fadeIn = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-6">
            <div className="flex justify-between items-center mb-8">
                <motion.h1
                    className="text-3xl font-bold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Dashboard
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/" target="_blank" className="text-sm text-muted-foreground hover:text-foreground">
                        View public site
                    </Link>
                </motion.div>
            </div>

            {/* Stats Overview */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="bg-card rounded-lg border border-border p-6"
                    variants={fadeIn}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-muted-foreground text-sm">Total Projects</p>
                            <h3 className="text-3xl font-bold mt-1">{stats?.totalProjects}</h3>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-md dark:bg-blue-900/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link href="/admin/projects" className="text-sm text-primary">
                            Manage projects →
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-card rounded-lg border border-border p-6"
                    variants={fadeIn}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-muted-foreground text-sm">Featured Projects</p>
                            <h3 className="text-3xl font-bold mt-1">{stats?.featuredProjects}</h3>
                        </div>
                        <div className="p-2 bg-purple-100 rounded-md dark:bg-purple-900/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link href="/admin/projects" className="text-sm text-primary">
                            Manage featured →
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-card rounded-lg border border-border p-6"
                    variants={fadeIn}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-muted-foreground text-sm">Testimonials</p>
                            <h3 className="text-3xl font-bold mt-1">{stats?.totalTestimonials}</h3>
                        </div>
                        <div className="p-2 bg-green-100 rounded-md dark:bg-green-900/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link href="/admin/testimonials" className="text-sm text-primary">
                            Manage testimonials →
                        </Link>
                    </div>
                </motion.div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
                className="bg-card rounded-lg border border-border p-6 mb-8"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/admin/projects/new" className="p-4 border border-border rounded-md hover:bg-card-hover transition-colors flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New Project
                    </Link>
                    <Link href="/admin/testimonials/new" className="p-4 border border-border rounded-md hover:bg-card-hover transition-colors flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Testimonial
                    </Link>
                    <Link href="/admin/settings" className="p-4 border border-border rounded-md hover:bg-card-hover transition-colors flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                    </Link>
                    <a href="/downloads/SanithuJayakody-Resume.pdf" download className="p-4 border border-border rounded-md hover:bg-card-hover transition-colors flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Resume
                    </a>
                </div>
            </motion.div>
        </div>
    );
}