"use client"

import Link from 'next/link';
import { DotPattern } from '../magicui/dot-pattern';

export default function Footer() {
    const navigationLinks = [
        { title: 'About', path: '/about' },
        { title: 'Projects', path: '/projects' },
        { title: 'Skills', path: '/skills' },
        { title: 'Contact', path: '/contact' }
    ];

    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/0-kodiya-0', handle: '@0-kodiya-0' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sanithu-jayakody-a541142ab/', handle: 'sanithu-jayakody' },
        { name: 'Stack Overflow', url: 'https://stackoverflow.com/users/20159737/sanithu-jayakody', handle: 'sanithu-jayakody' },
        { name: 'Email', url: 'mailto:sanithujayafiverr@gmail.com', handle: 'sanithujayafiverr@gmail.com' }
    ];

    return (
        <footer className="border-t border-border py-8 sm:py-10 md:py-12 px-4 sm:px-6 relative">
            <div className="max-w-7xl mx-auto">
                {/* Background Dot Pattern */}
                <DotPattern
                    className="[mask-image:radial-gradient(500px_circle_at_center_bottom,white,transparent)]"
                    offset={24}
                    radius={0.5}
                />

                {/* Top Section: Logo and Navigation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 md:mb-12">
                    {/* Logo and Tagline */}
                    <div className="md:col-span-2">
                        <div className="font-mono font-bold text-xl sm:text-2xl mb-3 md:mb-4">
                            <Link href="/" className="inline-flex hover:opacity-80 transition-opacity">
                                <span className="text-primary">sanithu</span>
                                <span className="text-foreground">@portfolio</span>
                                <span className="text-primary">:~$</span>
                            </Link>
                        </div>
                        <p className="text-muted-foreground text-sm sm:text-base max-w-md">
                            Full Stack Developer focused on optimizing backend systems
                            and creating efficient, scalable solutions.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col items-center sm:items-start">
                        <h3 className="font-medium text-base sm:text-lg mb-3 md:mb-4 text-center sm:text-left">Navigate</h3>
                        <ul className="space-y-2 md:space-y-3 flex flex-col items-center sm:items-start">
                            {navigationLinks.map((link) => (
                                <li key={link.title}>
                                    <Link
                                        href={link.path}
                                        className="animated-underline inline-block text-sm sm:text-base hover:text-primary transition-colors"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Get in Touch */}
                    <div className="flex flex-col items-center sm:items-start">
                        <h3 className="font-medium text-base sm:text-lg mb-3 md:mb-4 text-center sm:text-left">Get in Touch</h3>
                        <Link
                            href="/contact"
                            className="btn btn-primary inline-flex items-center justify-center sm-touch-target text-sm w-full sm:w-auto"
                        >
                            <span>Contact Me</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2"
                            >
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>

                        <div className="mt-4 md:mt-6 w-full sm:w-auto">
                            <a
                                href="/downloads/SanithuJayakody-Resume.pdf"
                                download
                                className="btn btn-secondary inline-flex items-center justify-center sm-touch-target text-sm w-full sm:w-auto"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2"
                                >
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                <span>Resume</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-border mb-6 md:mb-8" />

                {/* Bottom Section: Copyright and Social Links */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="font-mono text-xs sm:text-sm text-center md:text-left">
                        <span className="text-muted-foreground">{`// © ${new Date().getFullYear()} Sanithu Jayakody. All rights reserved.`}</span>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center sm-touch-target"
                                target={link.name === 'Email' ? '_self' : '_blank'}
                                rel="noopener noreferrer"
                            >
                                <span className="mr-1">{link.name}</span>
                                <span className="text-primary hidden sm:inline">{link.handle}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Back to top button - Mobile only */}
                <div className="flex justify-center mt-8 md:hidden">
                    <a
                        href="#"
                        className="inline-flex items-center justify-center rounded-full w-10 h-10 bg-card border border-border hover:bg-card-hover transition-colors"
                        aria-label="Back to top"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}