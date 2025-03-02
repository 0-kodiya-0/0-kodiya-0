'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = ['About', 'Projects', 'Skills', 'Blog', 'Contact'];

    return (
        <nav className="border-b border-gray-200 py-4 px-6 sticky top-0 bg-background/80 backdrop-blur-xs z-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="font-mono font-bold text-xl">
                    <Link href="/">
                        <span className="text-(--primary)">sanithu</span>
                        <span className="text-(--foreground)">@portfolio</span>
                        <span className="text-(--primary)">:~$</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8">
                    {navItems.map((item) => (
                        <Link key={item} href={`/${item.toLowerCase()}`} className="animated-underline">
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-gray-200 py-4 animate-fade-in">
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
                    </div>
                </div>
            )}
        </nav>
    );
}