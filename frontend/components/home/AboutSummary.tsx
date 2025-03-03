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
                        className="card code-annotation"
                        variants={itemVariants}
                    >
                        <h3 className="text-xl font-bold mb-4">My Journey</h3>
                        <p className="mb-4">
                            Full Stack Developer with a special focus on backend optimization and scaling.
                            I transform complex problems into elegant, efficient solutions.
                        </p>
                        <motion.div
                            className="code-block text-sm relative overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            whileInView={{ height: 'auto', opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <pre>
                                {`// Career path
const skills = [
  'Node.js',
  'TypeScript',
  'React',
  'Next.js',
  'Database Optimization',
  'Cloud Architecture'
];

// Eager to learn more!`}
                            </pre>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="card"
                        variants={itemVariants}
                    >
                        <h3 className="text-xl font-bold mb-4">My Approach</h3>
                        <ul className="space-y-3">
                            {[
                                'Building scalable backend systems that can handle growth',
                                'Writing clean, maintainable code with comprehensive tests',
                                'Optimizing database queries and API performance',
                                'Continuous learning and staying updated with new technologies'
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start"
                                    initial={{ x: -10, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    viewport={{ once: true }}
                                >
                                    <span className="text-(--primary) mr-2">▹</span>
                                    <span>{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}