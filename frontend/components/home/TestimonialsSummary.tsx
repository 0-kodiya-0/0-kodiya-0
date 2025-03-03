'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Marquee } from '../magicui/marquee';
import type { Testimonial } from '../testimonial/testimonial.types';
import TestimonialCard from '../testimonial/TestimonialCard';

export default function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/testimonials');

                if (!res.ok) {
                    throw new Error('Failed to fetch testimonials');
                }

                const data = await res.json();
                setTestimonials(data);
            } catch (err) {
                console.error('Error fetching testimonials:', err);
                setError('Failed to load testimonials');
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
        }
    };

    // Split testimonials into two rows for the marquee if we have enough
    const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
    const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

    if (loading) {
        return (
            <section className="py-20 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">What People Say</h2>
                    </div>
                    <div className="flex justify-center items-center py-20">
                        <div className="flex flex-col items-center">
                            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mb-4"></div>
                            <p className="text-muted-foreground">Loading testimonials...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">What People Say</h2>
                    </div>
                    <div className="text-center py-12 border border-border rounded-lg">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-10 w-10 mx-auto mb-4 text-muted-foreground" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-lg font-medium mb-2">{error}</p>
                        <p className="text-muted-foreground">Please try refreshing the page or check back later.</p>
                    </div>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) {
        return (
            <section className="py-20 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">What People Say</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto">
                            Client testimonials will appear here soon. Check back later to see what people
                            are saying about my work.
                        </p>
                    </div>
                    <motion.div 
                        className="py-12 border border-border rounded-lg text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-muted-foreground">Testimonials coming soon</p>
                        <p className="mt-3 text-sm">
                            Are we working together? <a href="/contact" className="text-primary">Contact me</a> to share your feedback.
                        </p>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl font-bold mb-4">What People Say</h2>
                    <p className="text-muted-foreground max-w-3xl mx-auto">
                        I&apos;ve had the pleasure of working with amazing clients and teams throughout my career.
                        Here&apos;s what they have to say about our collaborations.
                    </p>
                </motion.div>
            </div>

            <div className="relative">
                {/* If we have enough testimonials for two rows, show them in marquees */}
                {testimonials.length >= 4 ? (
                    <>
                        <Marquee pauseOnHover className="[--duration:35s] mb-8">
                            {firstRow.map((testimonial) => (
                                <TestimonialCard
                                    key={`first-${testimonial.id}`}
                                    testimonial={testimonial}
                                />
                            ))}
                        </Marquee>

                        <Marquee reverse pauseOnHover className="[--duration:40s]">
                            {secondRow.map((testimonial) => (
                                <TestimonialCard
                                    key={`second-${testimonial.id}`}
                                    testimonial={testimonial}
                                />
                            ))}
                        </Marquee>
                    </>
                ) : (
                    // If we have fewer testimonials, center them in a single row
                    <div className="flex flex-wrap justify-center gap-6 px-6">
                        {testimonials.map((testimonial) => (
                            <motion.div
                                key={testimonial.id}
                                variants={fadeIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                            >
                                <TestimonialCard testimonial={testimonial} />
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Gradient fade at edges when using marquee */}
                {testimonials.length >= 4 && (
                    <>
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent"></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent"></div>
                    </>
                )}
            </div>
        </section>
    );
}