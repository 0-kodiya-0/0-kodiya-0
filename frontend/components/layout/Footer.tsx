"use client"

import Link from 'next/link';
import { DotPattern } from '../magicui/dot-pattern';
import { 
  FaGithub, 
  FaLinkedin, 
  FaStackOverflow 
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
    const navigationLinks = [
        { title: 'About', path: '/about' },
        { title: 'Projects', path: '/projects' },
        { title: 'Skills', path: '/skills' },
        { title: 'Contact', path: '/contact' }
    ];

    const socialLinks = [
        { 
            name: 'GitHub', 
            url: 'https://github.com/0-kodiya-0', 
            handle: '@0-kodiya-0',
            icon: FaGithub 
        },
        { 
            name: 'LinkedIn', 
            url: 'https://www.linkedin.com/in/sanithu-jayakody-a541142ab/', 
            handle: 'sanithu-jayakody',
            icon: FaLinkedin 
        },
        { 
            name: 'Stack Overflow', 
            url: 'https://stackoverflow.com/users/20159737/sanithu-jayakody', 
            handle: 'sanithu-jayakody',
            icon: FaStackOverflow 
        },
        { 
            name: 'Email', 
            url: 'mailto:contact@sanithu-jayakody.me', 
            handle: 'contact@sanithu-jayakody.me',
            icon: MdEmail 
        }
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 mb-10 md:mb-14">
                    {/* Logo and Tagline */}
                    <div className="md:col-span-6 flex flex-col">
                        <div className="font-mono font-bold text-xl sm:text-2xl mb-4 md:mb-5">
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
                    <div className="md:col-span-3 flex flex-col items-center sm:items-start">
                        <ul className="space-y-2.5 md:space-y-3.5 flex flex-col items-center sm:items-start">
                            {navigationLinks.map((link) => (
                                <li key={link.title}>
                                    <Link
                                        href={link.path}
                                        className="animated-underline inline-block text-sm sm:text-base hover:text-primary transition-colors py-1"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Get in Touch */}
                    <div className="md:col-span-3 flex flex-col items-center sm:items-start">
                        <h3 className="font-medium text-base sm:text-lg mb-4 md:mb-5 text-center sm:text-left">Get in Touch</h3>
                        
                        {/* Mobile buttons (stacked) */}
                        <div className="flex flex-col w-full gap-3 sm:hidden">
                            <Link
                                href="/contact"
                                className="btn btn-primary inline-flex items-center justify-center text-sm w-full px-4 py-2.5"
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

                            <a
                                href="/downloads/CV.pdf"
                                download
                                className="btn btn-secondary inline-flex items-center justify-center text-sm w-full px-4 py-2.5"
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
                                <span>Download CV</span>
                            </a>
                        </div>
                        
                        {/* Desktop buttons (side-by-side) */}
                        <div className="hidden sm:flex sm:flex-row sm:gap-3 sm:w-full">
                            <Link
                                href="/contact"
                                className="btn btn-primary inline-flex items-center justify-center text-sm flex-1 px-4 py-2.5"
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

                            <a
                                href="/downloads/CV.pdf"
                                download
                                className="btn btn-secondary inline-flex items-center justify-center text-sm flex-1 px-4 py-2.5"
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
                    <div className="font-mono text-xs sm:text-sm text-center md:text-left order-2 md:order-1">
                        <span className="text-muted-foreground">{`// © ${new Date().getFullYear()} Sanithu Jayakody. All rights reserved.`}</span>
                    </div>

                    <div className="flex items-center gap-4 order-1 md:order-2">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-center"
                                target={link.name === 'Email' ? '_self' : '_blank'}
                                rel="noopener noreferrer"
                                aria-label={link.name}
                                title={link.name}
                            >
                                <link.icon className="text-xl sm:text-2xl" />
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