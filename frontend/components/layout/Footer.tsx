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
        { name: 'GitHub', url: 'https://github.com/sanithu', handle: '@sanithu' },
        { name: 'LinkedIn', url: 'https://linkedin.com/in/sanithu', handle: '@sanithu' },
        { name: 'Twitter', url: 'https://twitter.com/sanithu', handle: '@sanithu' },
        { name: 'Email', url: 'mailto:hello@sanithu.dev', handle: 'hello@sanithu.dev' }
    ];

    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 py-12 px-6 relative">
            <div className="max-w-7xl mx-auto">
                {/* Background Dot Pattern */}
                <DotPattern
                    className="[mask-image:radial-gradient(500px_circle_at_center_bottom,white,transparent)]"
                    offset={24}
                    radius={0.5}
                />

                {/* Top Section: Logo and Navigation */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Logo and Tagline */}
                    <div className="md:col-span-2">
                        <div className="font-mono font-bold text-2xl mb-4">
                            <Link href="/">
                                <span className="text-(--primary)">sanithu</span>
                                <span className="text-(--foreground)">@portfolio</span>
                                <span className="text-(--primary)">:~$</span>
                            </Link>
                        </div>
                        <p className="text-(--syntax-comment) max-w-md">
                            Full Stack Developer focused on optimizing backend systems
                            and creating efficient, scalable solutions.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="font-medium text-lg mb-4">Navigate</h3>
                        <ul className="space-y-3">
                            {navigationLinks.map((link) => (
                                <li key={link.title}>
                                    <Link
                                        href={link.path}
                                        className="animated-underline inline-block"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Get in Touch */}
                    <div>
                        <h3 className="font-medium text-lg mb-4">Get in Touch</h3>
                        <Link
                            href="/contact"
                            className="btn btn-primary inline-flex items-center"
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

                        <div className="mt-6">
                            <a
                                href="/downloads/SanithuJayakody-Resume.pdf"
                                download
                                className="btn btn-secondary inline-flex items-center"
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
                <hr className="border-gray-200 dark:border-gray-800 mb-8" />

                {/* Bottom Section: Copyright and Social Links */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="font-mono text-sm mb-4 md:mb-0">
                        <span className="text-(--syntax-comment)">{`// © ${new Date().getFullYear()} Sanithu Jayakody. All rights reserved.`}</span>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                className="text-sm text-(--syntax-comment) hover:text-(--foreground) transition-colors flex items-center"
                                target={link.name === 'Email' ? '_self' : '_blank'}
                                rel="noopener noreferrer"
                            >
                                <span className="mr-1">{link.name}</span>
                                <span className="text-(--primary)">{link.handle}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}