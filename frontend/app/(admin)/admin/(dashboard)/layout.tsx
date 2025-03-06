'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface AdminDashboardLayoutProps {
    children: ReactNode;
}

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Admin navigation items
    const navItems = [
        {
            path: '/admin/dashboard', label: 'Dashboard', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
            )
        },
        {
            path: '/admin/projects', label: 'Projects', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                    <path d="M18 14h-8" />
                    <path d="M15 18h-5" />
                    <path d="M10 6h8v4h-8V6Z" />
                </svg>
            )
        },
        {
            path: '/admin/testimonials', label: 'Testimonials', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 1-1 1 0 .008-1 0-1 1v1c0 1 1 1 1 1 1 0 1 0 1 1v1c0 1 0 1-2 1z" />
                    <path d="M21 21c-3 0-7-1-7-8V5c0-1.25.757-2.017 2-2h4c1.25 0 2 .75 2 1.972V11c0 1.25-.75 2-2 2-1 0-1 0-1 1v1c0 1 1 1 1 1 0 .008 1 0 1 1v1c0 1-1 1-1 1-1 0-1 0-1 1v1c0 1 0 1 2 1z" />
                </svg>
            )
        },
        {
            path: '/admin/settings', label: 'Settings', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            )
        }
    ];

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (res.ok) {
                router.push('/admin');
            }
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    // Authentication is now handled by middleware, so we removed the useEffect check

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-background">
            {/* Mobile Navbar */}
            <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border">
                <Link href="/admin/dashboard" className="font-mono font-bold text-lg">
                    <span className="text-primary">admin</span>
                    <span className="text-muted-foreground">@portfolio</span>
                </Link>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-md hover:bg-card-hover"
                >
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.div
                    className="md:hidden flex flex-col bg-card border-b border-border"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="py-2 px-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center py-2 px-3 my-1 rounded-md ${pathname === item.path || pathname.startsWith(`${item.path}/`)
                                    ? 'bg-primary/10 text-primary'
                                    : 'hover:bg-card-hover'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full text-left py-2 px-3 my-1 rounded-md hover:bg-card-hover text-red-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Logout
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-card border-r border-border">
                <div className="flex-1 flex flex-col min-h-0 pt-5 pb-4">
                    <div className="flex items-center flex-shrink-0 px-6 mb-6">
                        <Link href="/admin/dashboard" className="font-mono font-bold text-lg">
                            <span className="text-primary">admin</span>
                            <span className="text-muted-foreground">@portfolio</span>
                        </Link>
                    </div>
                    <nav className="mt-5 flex-1 px-4 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center py-2 px-3 rounded-md transition-colors ${pathname === item.path || pathname.startsWith(`${item.path}/`)
                                    ? 'bg-primary/10 text-primary'
                                    : 'hover:bg-card-hover text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex-shrink-0 px-4 pb-6">
                    <Link
                        href="/"
                        className="flex items-center py-2 px-3 mb-2 rounded-md hover:bg-card-hover text-muted-foreground hover:text-foreground"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        View Site
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full py-2 px-3 rounded-md hover:bg-card-hover text-red-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:pl-64">
                <div className="w-full min-h-screen bg-background">
                    {children}
                </div>
            </main>
        </div>
    );
}