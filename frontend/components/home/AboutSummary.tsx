'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DotPattern } from '../magicui/dot-pattern';
import { TerminalContent } from '../shared/TerminalContent';
import { CodeDisplay } from '../shared/CodeDisplay';

export default function AboutSummary() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
        },
    };

    // Skills array with icons
    const skills = [
        { name: 'JavaScript/TypeScript', icon: '⟨⁄⟩' },
        { name: 'Next.js/React', icon: '⚛' },
        { name: 'Node.js/Express', icon: '🚀' },
        { name: 'MongoDB/MySQL', icon: '🗄️' },
        { name: 'UI/UX Design', icon: '🎨' },
        { name: 'Problem Solving', icon: '🧩' }
    ];

    // Format skills into a nicely displayed code string
    const skillsCode = `// My tech journey
const skills = [
  ${skills.map(skill => `'${skill.icon} ${skill.name}'`).join(',\n  ')}
];
// Always exploring and growing!`;

    return (
        <div id="about" className="relative overflow-hidden">
            {/* Background Dot Pattern */}
            <DotPattern
                className="[mask-image:radial-gradient(500px_circle_at_right_center,white,transparent)]"
                offset={24}
                radius={0.5}
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                <motion.div
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-10 gap-4"
                    variants={itemVariants}
                >
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text inline-block">About.me()</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    <motion.div
                        className="card code-annotation bg-card/50 backdrop-blur-sm"
                        variants={itemVariants}
                    >
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                <line x1="12" y1="22.08" x2="12" y2="12"></line>
                            </svg>
                            My Journey
                        </h3>
                        <p className="mb-4 text-muted-foreground text-sm md:text-base">
                            Full Stack Developer specializing in backend optimization and scaling solutions.
                            I transform complex challenges into elegant, efficient systems that deliver exceptional performance.
                        </p>
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            whileInView={{ height: 'auto', opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="overflow-x-auto">
                                <CodeDisplay
                                    code={skillsCode}
                                    language="javascript"
                                    filename="skills.js"
                                    lightTheme="github-light"
                                    darkTheme="github-dark"
                                />
                            </div>

                            {/* Animated cursor */}
                            <motion.div
                                className="absolute bottom-4 right-4 h-4 w-2 bg-primary"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="card backdrop-blur-sm"
                        variants={itemVariants}
                    >
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                            </svg>
                            My Methodology
                        </h3>
                        <div className="p-0 sm:p-2 overflow-hidden">
                            <TerminalContent />
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                className="mt-10 flex justify-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <Link href="/projects" className="btn btn-secondary text-sm py-2 w-full max-w-xs">
                    View Full Profile
                </Link>
            </motion.div>
        </div>
    );
}