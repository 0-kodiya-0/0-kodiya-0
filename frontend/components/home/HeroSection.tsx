'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DotPattern } from '../magicui/dot-pattern';
import { TypingAnimation } from '../magicui/typing-animation';

export default function HeroSection() {
    return (
        <section className="relative py-24 px-6 md:px-10 overflow-hidden">
            {/* Background Pattern */}
            <DotPattern
                className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_top,white,transparent)]"
                offset={24}
                radius={0.5}
            />

            <div className="max-w-7xl mx-auto">
                <div className="text-center flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="mb-6"
                    >
                        {/* Fixed the visibility by increasing opacity and using stronger contrast colors */}
                        <span className="inline-block px-4 py-2 bg-accent/30 text-accent-foreground rounded-full text-sm font-medium">
                            Full Stack Developer 
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                    >
                        <span className="block mb-2">Backend Whisperer &</span>

                        {/* Fixed text visibility by using a direct color instead of gradient-text */}
                        <span className="text-primary font-bold">
                            <TypingAnimation startOnView
                                className="text-primary"
                            >
                                Code Enthusiast
                            </TypingAnimation>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-10"
                    >
                        Hi, I&apos;m Sanithu Jayakody. I build robust, efficient, and scalable web applications
                        with a focus on optimizing backend systems. I love turning complex challenges into
                        elegant solutions.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/projects" className="btn btn-primary px-6 py-3">
                            View My Projects
                        </Link>
                        <Link href="/contact" className="btn btn-secondary px-6 py-3">
                            Get In Touch
                        </Link>
                    </motion.div>

                    {/* Tech stack badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="mt-16 flex flex-wrap justify-center gap-3"
                    >
                        {['TypeScript', 'React', 'Node.js', 'Next.js', 'MongoDB', 'PostgreSQL'].map((tech, i) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                                className="px-4 py-2 bg-card text-sm rounded-full border border-border"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.5,
                    delay: 1.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 0.2
                }}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                >
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
            </motion.div>
        </section>
    );
}