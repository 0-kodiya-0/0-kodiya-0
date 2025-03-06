'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
    children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    // Ensure hydration completes before animations
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Page transition variants - adjusted for smoother mobile experience
    const variants = {
        hidden: { opacity: 0, y: 8 },
        enter: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1.0],
            }
        },
        exit: {
            opacity: 0,
            y: -8,
            transition: {
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1.0]
            }
        }
    };

    // Don't animate on server or first render
    if (!isClient) {
        return <>{children}</>;
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={variants}
                className="flex flex-col flex-grow"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}