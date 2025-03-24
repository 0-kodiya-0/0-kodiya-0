'use client';

import { motion } from 'framer-motion';
import ContactForm from '@/components/contact/ContactForm';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaStackOverflow } from 'react-icons/fa';

export default function ContactPage() {
    // Real information from Footer.tsx
    const contactMethods = [
        {
            icon: <MdEmail size={20} />,
            title: 'Email',
            value: 'contact@sanithu-jayakody.me',
            link: 'mailto:contact@sanithu-jayakody.me'
        },
        {
            icon: <MdLocationOn size={20} />,
            title: 'Location',
            value: 'Colombo, Sri Lanka',
            link: null
        }
    ];

    const socialLinks = [
        {
            icon: <FaGithub size={20} />,
            title: 'GitHub',
            value: '@0-kodiya-0',
            link: 'https://github.com/0-kodiya-0'
        },
        {
            icon: <FaLinkedin size={20} />,
            title: 'LinkedIn',
            value: 'sanithu-jayakody',
            link: 'https://www.linkedin.com/in/sanithu-jayakody-a541142ab/'
        },
        {
            icon: <FaStackOverflow size={20} />,
            title: 'Stack Overflow',
            value: 'sanithu-jayakody',
            link: 'https://stackoverflow.com/users/20159737/sanithu-jayakody'
        }
    ];

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-16 px-6">
            <motion.h1
                className="text-4xl font-bold mb-12 gradient-text inline-block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Contact
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Contact Info */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        variants={fadeIn}
                        className="mb-10"
                    >
                        <h2 className="text-2xl font-bold mb-4">Let&apos;s Connect</h2>
                        <p className="text-muted-foreground">
                            I&apos;m open to discussing new projects, creative ideas, or opportunities
                            to be part of your vision. Feel free to reach out through any of these channels.
                        </p>
                    </motion.div>

                    {/* Contact Methods */}
                    <div className="space-y-6 mb-10">
                        {contactMethods.map((method) => (
                            <motion.div
                                key={method.title}
                                variants={fadeIn}
                                className="flex items-start"
                            >
                                <div className="text-primary mr-4 mt-1">
                                    {method.icon}
                                </div>
                                <div>
                                    <h3 className="font-medium">{method.title}</h3>
                                    {method.link ? (
                                        <a
                                            href={method.link}
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {method.value}
                                        </a>
                                    ) : (
                                        <p className="text-muted-foreground">{method.value}</p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Social Links */}
                    <motion.div variants={fadeIn}>
                        <h3 className="font-medium mb-4">Connect with me on:</h3>
                        <div className="flex space-x-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.title}
                                    href={link.link as string}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                                    aria-label={link.title}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Availability */}
                    <motion.div
                        variants={fadeIn}
                        className="mt-10 p-5 border border-border rounded-lg bg-card-hover/30"
                    >
                        <div className="flex items-center mb-2">
                            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                            <h3 className="font-medium">Currently Available</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            I&apos;m currently accepting new projects and would love to hear about yours.
                            Available for freelance work and consulting.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Right Column: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="border border-border rounded-lg p-6 bg-card shadow-sm"
                >
                    <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                    <ContactForm />
                </motion.div>
            </div>
        </div>
    );
}