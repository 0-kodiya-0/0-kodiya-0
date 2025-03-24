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
                // Adjust this URL based on your actual API endpoint
                const res = await fetch(`/api/testimonials`);

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
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">What People Say</h2>
                <div className="flex justify-center items-center py-16 md:py-20">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin h-6 w-6 md:h-8 md:w-8 border-2 border-primary border-t-transparent rounded-full mb-3 md:mb-4"></div>
                        <p className="text-sm md:text-base text-muted-foreground">Loading testimonials...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">What People Say</h2>
                <div className="text-center py-10 md:py-12 border border-border rounded-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 md:h-10 md:w-10 mx-auto mb-3 md:mb-4 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-base md:text-lg font-medium mb-2">{error}</p>
                    <p className="text-sm md:text-base text-muted-foreground">Please try refreshing the page or check back later.</p>
                </div>
            </div>
        );
    }

    if (testimonials.length === 0) {
        return (
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">What People Say</h2>
                <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto mb-8">
                    Client testimonials will appear here soon. Check back later to see what people
                    are saying about my work.
                </p>
                <motion.div
                    className="py-10 md:py-12 border border-border rounded-lg text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-3 md:mb-4 text-muted-foreground/30"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p className="text-sm md:text-base text-muted-foreground">Testimonials coming soon</p>
                    <p className="mt-3 text-xs md:text-sm">
                        Are we working together? <a href="/contact" className="text-primary">Contact me</a> to share your feedback.
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="text-center mb-8 md:mb-10"
            >
                <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">What People Say</h2>
                <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
                    I&apos;ve had the pleasure of working with amazing clients and teams throughout my career.
                    Here&apos;s what they have to say about our collaborations.
                </p>
            </motion.div>

            <div className="relative">
                {/* If we have enough testimonials for two rows, show them in marquees */}
                {testimonials.length >= 4 ? (
                    <>
                        {/* Adjust marquee speed and spacing for different screens */}
                        <Marquee pauseOnHover className="[--duration:20s] sm:[--duration:25s] md:[--duration:35s] mb-6 md:mb-8">
                            {firstRow.map((testimonial) => (
                                <TestimonialCard
                                    key={`first-${testimonial.id}`}
                                    testimonial={testimonial}
                                />
                            ))}
                        </Marquee>

                        {/* Second row with reverse direction and slightly different speed */}
                        <Marquee reverse pauseOnHover className="[--duration:25s] sm:[--duration:30s] md:[--duration:40s]">
                            {secondRow.map((testimonial) => (
                                <TestimonialCard
                                    key={`second-${testimonial.id}`}
                                    testimonial={testimonial}
                                />
                            ))}
                        </Marquee>
                    </>
                ) : (
                    // For fewer testimonials, especially when there's only one
                    <div className="flex flex-row items-center justify-center">
                        {testimonials.length === 1 ? (
                            // Special case for single testimonial - centered with controlled width
                            <motion.div
                                variants={fadeIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                className="w-full max-w-lg mx-auto flex items-center justify-center"
                            >
                                <TestimonialCard testimonial={testimonials[0]} />
                            </motion.div>
                        ) : (
                            // For 2-3 testimonials, use a flex grid
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
                                {testimonials.map((testimonial) => (
                                    <motion.div
                                        key={testimonial.id}
                                        variants={fadeIn}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-50px" }}
                                        className="w-full"
                                    >
                                        <TestimonialCard testimonial={testimonial} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Gradient fade at edges when using marquee - modified for better mobile experience */}
                {testimonials.length >= 4 && (
                    <>
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 sm:w-1/4 md:w-1/3 bg-gradient-to-r from-background to-transparent"></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 sm:w-1/4 md:w-1/3 bg-gradient-to-l from-background to-transparent"></div>
                    </>
                )}
            </div>
        </div>
    );
}