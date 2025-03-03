'use client';

import { motion } from 'framer-motion';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
    const contactMethods = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            ),
            title: 'Email',
            value: 'hello@sanithu.dev',
            link: 'mailto:hello@sanithu.dev'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
            ),
            title: 'Location',
            value: 'Colombo, Sri Lanka',
            link: null
        }
    ];

    const socialLinks = [
        {
            title: 'GitHub',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
            ),
            url: 'https://github.com/sanithu'
        },
        {
            title: 'LinkedIn',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                </svg>
            ),
            url: 'https://linkedin.com/in/sanithu'
        },
        {
            title: 'Twitter',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
            ),
            url: 'https://twitter.com/sanithu'
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
                                    href={link.url}
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