'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { DotPattern } from '../magicui/dot-pattern';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const navItems = ['About', 'Projects', 'Contact'];

    // Close dropdown when clicking outside

    return (
        <nav className={`sticky top-0 z-50 border-b py-4 px-6 backdrop-blur-sm ${theme === 'dark' ? 'border-gray-800 bg-background/90' : 'border-gray-200 bg-white/90'
            }`}>
            <div className="relative max-w-7xl mx-auto flex justify-between items-center">
                {/* Background Dot Pattern */}
                <DotPattern
                    className="[mask-image:radial-gradient(600px_circle_at_left_center,white,transparent)]"
                    offset={24}
                    radius={0.5}
                />

                {/* Logo */}
                <motion.div
                    className="font-mono font-bold text-xl flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Link href="/" className="flex items-center">
                        <span className="text-primary">sanithu</span>
                        <span className="text-foreground">@portfolio</span>
                        <span className="text-primary">:~$</span>
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8 items-center">
                    {navItems.map((item, index) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                        >
                            <Link href={`/${item.toLowerCase()}`} className="animated-underline">
                                {item}
                            </Link>
                        </motion.div>
                    ))}

                    {/* CV Download Button */}
                    <motion.a
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        href="/downloads/CV.pdf"
                        download
                        className="btn btn-primary flex items-center gap-1 text-sm"
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
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Resume
                    </motion.a>

                    {/* Theme Toggle Button */}
                    <motion.button
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-card-hover transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                        )}
                    </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-2">
                    {/* Theme Toggle Button (Mobile) */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-card-hover transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                        )}
                    </button>

                    <button
                        className="p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <motion.div
                            animate={isMenuOpen ? "open" : "closed"}
                        >
                            {isMenuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="3" y1="12" x2="21" y2="12"></line>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <line x1="3" y1="18" x2="21" y2="18"></line>
                                </svg>
                            )}
                        </motion.div>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className={`md:hidden absolute top-[72px] left-0 right-0 py-4 z-20 ${theme === 'dark' ? 'bg-background border-b border-gray-800' : 'bg-white border-b border-gray-200'
                            }`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col space-y-4 px-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item.toLowerCase()}`}
                                    className="py-2 animated-underline"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}

                            {/* CV Download Option (Mobile) */}
                            <div className="py-2 border-t border-gray-200 dark:border-gray-800">
                                <div className="text-sm font-medium mb-2 text-muted-foreground">Download</div>
                                <a
                                    href="/downloads/CV.pdf"
                                    download
                                    className="flex items-center gap-2"
                                    onClick={() => setIsMenuOpen(false)}
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
                                        className="text-primary"
                                    >
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                    Resume
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}