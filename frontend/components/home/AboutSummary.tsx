'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DotPattern } from '../magicui/dot-pattern';

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

    // Updated skills array with icons
    const skills = [
        { name: 'JavaScript/TypeScript', icon: '⟨⁄⟩' },
        { name: 'Next.js/React', icon: '⚛' },
        { name: 'Node.js/Express', icon: '🚀' },
        { name: 'MongoDB/MySQL', icon: '🗄️' },
        { name: 'UI/UX Design', icon: '🎨' },
        { name: 'Problem Solving', icon: '🧩' }
    ];

    // Updated approach items with icons
    const approaches = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M20 22h-2"></path>
                    <path d="M20 15v7"></path>
                    <path d="M13 22h-2"></path>
                    <path d="M13 6v16"></path>
                    <path d="M6 22H4"></path>
                    <path d="M6 2v20"></path>
                    <path d="M2 12h20"></path>
                    <path d="M2 7h8"></path>
                    <path d="M2 17h8"></path>
                </svg>
            ),
            text: 'Building scalable backend systems that handle growth seamlessly'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M7 8l-4 4 4 4"></path>
                    <path d="M17 8l4 4-4 4"></path>
                    <path d="M14 4l-4 16"></path>
                </svg>
            ),
            text: 'Writing clean, maintainable code with thorough test coverage'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M3 3v18h18"></path>
                    <path d="M18 3v4"></path>
                    <path d="M18 11v4"></path>
                    <path d="M13 3v4"></path>
                    <path d="M13 11v4"></path>
                    <path d="M8 3v4"></path>
                    <path d="M8 11v10"></path>
                </svg>
            ),
            text: 'Optimizing database queries and API performance for fast response times'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                </svg>
            ),
            text: 'Continuously learning and implementing the latest technologies'
        }
    ];

    return (
        <section id="about" className="relative py-20 px-6 max-w-7xl mx-auto overflow-hidden">
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
                viewport={{ once: true, margin: "-100px" }}
            >
                <motion.div
                    className="flex justify-between items-center mb-10"
                    variants={itemVariants}
                >
                    <h2 className="text-3xl font-bold gradient-text inline-block">About.me()</h2>
                    <Link href="/about" className="btn btn-secondary text-sm">View Full Profile</Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
                        <p className="mb-4 text-muted-foreground">
                            Full Stack Developer specializing in backend optimization and scaling solutions.
                            I transform complex challenges into elegant, efficient systems that deliver exceptional performance.
                        </p>
                        <motion.div
                            className="code-block text-sm relative overflow-hidden rounded-lg"
                            initial={{ height: 0, opacity: 0 }}
                            whileInView={{ height: 'auto', opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <pre className="p-4">
                                {`// My tech journey\n`}
                                {`const skills = [${skills.map(skill => `'${skill.icon} ${skill.name}'`).join(',\n  ')}];`}
                                {`// Always exploring and growing!`}
                            </pre>

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
                            My Approach
                        </h3>
                        <ul className="space-y-4">
                            {approaches.map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start bg-card/70 p-3 rounded-lg border border-border/50 transform transition-all"
                                    initial={{ x: -10, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    viewport={{ once: true }}
                                    whileHover={{ x: 5, backgroundColor: 'rgba(var(--card-hover), 0.8)' }}
                                >
                                    <span className="mr-3 mt-0.5 flex-shrink-0">{item.icon}</span>
                                    <span className="text-sm">{item.text}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}