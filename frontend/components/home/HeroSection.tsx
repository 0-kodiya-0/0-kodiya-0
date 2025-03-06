'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DotPattern } from '../magicui/dot-pattern';
import { TypingAnimation } from '../magicui/typing-animation';

export default function HeroSection() {
    return (
        <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-16 md:py-16 px-4 md:px-10 overflow-hidden">
            {/* Background Pattern */}
            <DotPattern
                className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_top,white,transparent)]"
                offset={24}
                radius={0.5}
            />

            <div className="max-w-7xl mx-auto w-full">
                <div className="text-center flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="mb-4 md:mb-6"
                    >
                        {/* Improved visibility with stronger background/contrast */}
                        <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-accent/50 text-accent-foreground rounded-full text-sm font-medium">
                            Full Stack Developer
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
                    >
                        <span className="block mb-2">Backend Whisperer &</span>

                        {/* Ensure text visibility with direct color */}
                        <span className="text-primary font-bold">
                            <TypingAnimation startOnView
                                className="text-primary text-3xl md:text-5xl lg:text-6xl"
                            >
                                Code Enthusiast
                            </TypingAnimation>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-10 px-2"
                    >
                        Hi, I&apos;m Sanithu Jayakody. I build robust, efficient, and scalable web applications
                        with a focus on optimizing backend systems. I love turning complex challenges into
                        elegant solutions.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center w-full sm:w-auto"
                    >
                        <Link href="/projects" className="btn btn-primary px-4 py-2 md:px-6 md:py-3 w-full sm:w-auto">
                            View My Projects
                        </Link>
                        <Link href="/contact" className="btn btn-secondary px-4 py-2 md:px-6 md:py-3 w-full sm:w-auto">
                            Get In Touch
                        </Link>
                    </motion.div>

                    {/* Tech stack badges with improved mobile layout
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="mt-12 md:mt-16 flex flex-wrap justify-center gap-2 md:gap-3 px-2"
                    >
                        {['TypeScript', 'React', 'Node.js', 'Next.js', 'MongoDB', 'PostgreSQL'].map((tech, i) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                                className="px-3 py-1.5 md:px-4 md:py-2 bg-card text-xs md:text-sm rounded-full border border-border"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </motion.div> */}
                </div>
            </div>

            {/* Scroll indicator - Fixed for proper centering on all screen sizes */}
            <motion.div
                className="mx-auto w-6 text-center mt-20"
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