'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Marquee } from '../magicui/marquee';
import { JSX } from 'react';

// Define testimonial interface
interface Testimonial {
    name: string;
    role: string;
    content: string;
    image: string;
}

// Define props interface for the TestimonialCard component
interface TestimonialCardProps {
    name: string;
    role: string;
    content: string;
    image: string;
}

// Sample testimonials data
const testimonials: Testimonial[] = [
    {
        name: "Alex Johnson",
        role: "Product Manager at TechCorp",
        content: "Sanithu delivered our project ahead of schedule with exceptional quality. His attention to detail and proactive communication made the entire process smooth and enjoyable.",
        image: "https://avatar.vercel.sh/alex",
    },
    {
        name: "Sarah Williams",
        role: "CTO at StartupX",
        content: "Working with Sanithu has been incredible. He deeply understands both frontend and backend technologies, delivering solutions that are not just functional but also maintainable and scalable.",
        image: "https://avatar.vercel.sh/sarah",
    },
    {
        name: "Michael Chen",
        role: "Lead Developer at DevCore",
        content: "Sanithu's backend optimization skills are truly impressive. He reduced our database query times by 70% and implemented a caching solution that significantly improved our application's performance.",
        image: "https://avatar.vercel.sh/michael",
    },
    {
        name: "Emily Rodriguez",
        role: "Founder at DataViz",
        content: "I was amazed by Sanithu's ability to quickly understand our complex data structures and implement elegant solutions. He's not just a developer, but a problem solver who thinks strategically.",
        image: "https://avatar.vercel.sh/emily",
    },
    {
        name: "David Kim",
        role: "Engineering Manager at ScaleUp",
        content: "Sanithu seamlessly integrated with our team and became an invaluable asset. His code quality and documentation practices set a new standard for our development process.",
        image: "https://avatar.vercel.sh/david",
    },
    {
        name: "Lisa Thompson",
        role: "UX Designer at CreativeStudio",
        content: "As a designer, I appreciate developers who can bring designs to life faithfully. Sanithu not only implemented our designs perfectly but also suggested improvements that enhanced the user experience.",
        image: "https://avatar.vercel.sh/lisa",
    },
];

// Split testimonials into two rows for the marquee
const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

// Testimonial card component
const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, content, image }) => {
    return (
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm mx-4 w-80 h-auto">
            <div className="flex items-start mb-4">
                <div className="relative w-12 h-12 mr-4">
                    <Image
                        src={image}
                        alt={`${name}'s profile picture`}
                        width={48}
                        height={48}
                        className="rounded-full"
                        priority={false}
                    />
                </div>
                <div>
                    <h3 className="font-semibold text-base">{name}</h3>
                    <p className="text-muted-foreground text-sm">{role}</p>
                </div>
            </div>
            <p className="text-sm leading-relaxed">&quot;{content}&quot;</p>
        </div>
    );
};

export default function TestimonialsSection(): JSX.Element {
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
                <Marquee pauseOnHover className="[--duration:35s] mb-8">
                    {firstRow.map((testimonial, index) => (
                        <TestimonialCard
                            key={`first-${index}`}
                            name={testimonial.name}
                            role={testimonial.role}
                            content={testimonial.content}
                            image={testimonial.image}
                        />
                    ))}
                </Marquee>

                <Marquee reverse pauseOnHover className="[--duration:40s]">
                    {secondRow.map((testimonial, index) => (
                        <TestimonialCard
                            key={`second-${index}`}
                            name={testimonial.name}
                            role={testimonial.role}
                            content={testimonial.content}
                            image={testimonial.image}
                        />
                    ))}
                </Marquee>

                {/* Gradient fade at edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent"></div>
            </div>
        </section>
    );
}