'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    // Check if we're in the browser environment
    const isClient = typeof window !== 'undefined';

    // Initialize theme based on user's system preference or saved preference
    const [theme, setTheme] = useState<Theme>(() => {
        if (!isClient) return 'dark'; // Default to dark on server

        const savedTheme = localStorage.getItem('theme') as Theme;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        return savedTheme || (prefersDark ? 'dark' : 'light');
    });

    // Toggle between light and dark theme
    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            if (isClient) {
                localStorage.setItem('theme', newTheme);
            }
            return newTheme;
        });
    };

    // Apply theme class to html element
    useEffect(() => {
        if (!isClient) return;

        const root = document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme, isClient]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom hook for using the theme context
export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}