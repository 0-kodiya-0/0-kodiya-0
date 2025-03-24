'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a utility function for combining classes

interface SectionContainerProps {
    id?: string;
    className?: string;
    children: ReactNode;
    noPadding?: boolean;
    fullWidth?: boolean;
    withBackground?: boolean;
    withBorder?: boolean;
    spacing?: 'default' | 'large' | 'xlarge',
}

export default function SectionContainer({
    id,
    className = '',
    children,
    noPadding = false,
    fullWidth = false,
    withBackground = false,
    withBorder = false,
    spacing
}: SectionContainerProps) {
    const spacingClasses = {
        default: 'py-16 sm:py-20',
        large: 'py-20 sm:py-24',
        xlarge: 'py-24 sm:py-32'
    }[spacing || 'large'];

    return (
        <section
            id={id}
            className={cn(
                // Standard vertical padding for sections
                !noPadding && spacingClasses,
                // Horizontal padding
                'px-4 sm:px-6',
                // Background styles
                withBackground && 'bg-card-hover',
                // Border styles
                withBorder && 'border-y border-border',
                // Additional overflow protection
                'relative overflow-hidden',
                className
            )}
        >
            <div className={cn(
                // Container width
                !fullWidth && 'max-w-7xl mx-auto',
                // Allow full bleed when needed
                fullWidth && 'w-full'
            )}>
                {children}
            </div>
        </section>
    );
}