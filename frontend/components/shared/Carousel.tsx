'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselProps {
    children: ReactNode[];
    autoPlay?: boolean;
    interval?: number;
    showIndicators?: boolean;
    showArrows?: boolean;
    className?: string;
    itemsPerPage?: number;
}

export function Carousel({
    children,
    autoPlay = false,
    interval = 5000,
    showIndicators = true,
    showArrows = true,
    className = '',
    itemsPerPage = 3,
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right'>('right');

    // Handle auto-play
    useEffect(() => {
        if (!autoPlay || isHovering || children.length <= 1) return;

        const timer = setInterval(() => {
            setDirection('right');
            setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, interval, children.length, isHovering]);

    // Movement controls
    const goToNext = () => {
        setDirection('right');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
    };

    const goToPrev = () => {
        setDirection('left');
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? children.length - 1 : prevIndex - 1));
    };

    const goToIndex = (index: number) => {
        setDirection(index > currentIndex ? 'right' : 'left');
        setCurrentIndex(index);
    };

    // Touch and mouse handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        setDragStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const dragEndX = e.changedTouches[0].clientX;
        const diff = dragStartX - dragEndX;

        // Threshold to determine swipe
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swiped left, go next (direction right)
                setDirection('right');
                goToNext();
            } else {
                // Swiped right, go previous (direction left)
                setDirection('left');
                goToPrev();
            }
        }
    };

    // Don't render carousel UI if only one item
    if (children.length <= 1) {
        return <div className={className}>{children[0]}</div>;
    }

    return (
        <div
            className={`relative ${className}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div
                className="rounded-lg"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* For mobile: Single item view with direction-based animations */}
                <div className="md:hidden">
                    <AnimatePresence initial={false} mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={{
                                enter: (dir: 'left' | 'right') => ({
                                    opacity: 0,
                                    x: dir === 'right' ? 50 : -50
                                }),
                                center: {
                                    opacity: 1,
                                    x: 0
                                },
                                exit: (dir: 'left' | 'right') => ({
                                    opacity: 0,
                                    x: dir === 'right' ? -50 : 50
                                })
                            }}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="w-full"
                        >
                            {children[currentIndex]}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* For desktop: Multi-item view */}
                <div className="hidden md:flex">
                    <AnimatePresence initial={false} mode="wait" custom={direction}>
                        <motion.div
                            key={`page-${currentIndex}`}
                            custom={direction}
                            variants={{
                                enter: (dir: 'left' | 'right') => ({
                                    opacity: 0,
                                    x: dir === 'right' ? 20 : -20
                                }),
                                center: {
                                    opacity: 1,
                                    x: 0
                                },
                                exit: (dir: 'left' | 'right') => ({
                                    opacity: 0,
                                    x: dir === 'right' ? -20 : 20
                                })
                            }}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="flex w-full"
                        >
                            {Array.from({ length: itemsPerPage }).map((_, i) => {
                                const itemIndex = (currentIndex + i) % children.length;
                                const widthClass =
                                    itemsPerPage === 3 ? 'w-1/3' :
                                        itemsPerPage === 2 ? 'w-1/2' : 'w-full';

                                return (
                                    <motion.div
                                        key={`multi-${itemIndex}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: i * 0.1 }}
                                        className={`${widthClass} flex-shrink-0 h-full`}
                                    >
                                        {children[itemIndex]}
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation arrows - only visible on hover, only on desktop, and only when there are more items than can be displayed at once */}
            {showArrows && children.length > itemsPerPage && isHovering && (
                <>
                    <button
                        onClick={goToPrev}
                        className="absolute hidden md:flex left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-r-full bg-background/90 backdrop-blur-sm border border-border text-foreground shadow-md hover:bg-background transition-all duration-200"
                        aria-label="Previous slide"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute hidden md:flex right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-l-full bg-background/90 backdrop-blur-sm border border-border text-foreground shadow-md hover:bg-background transition-all duration-200"
                        aria-label="Next slide"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </>
            )}

            {/* Improved indicator dots with better visibility - only shown when needed */}
            {showIndicators && (
                <div className="flex justify-center mt-4">
                    {/* For mobile - show all items as indicators if there's more than one item */}
                    {children.length > 1 && (
                        <div className="md:hidden flex">
                            {children.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToIndex(index)}
                                    className="p-1"
                                    aria-label={`Go to slide ${index + 1}`}
                                >
                                    <span
                                        className={`block w-2 h-2 rounded-full transition-all ${index === currentIndex
                                            ? 'bg-primary w-3 h-3 shadow-sm shadow-primary/30'
                                            : 'bg-muted-foreground/40 hover:bg-muted-foreground/80'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* For desktop - show page groups as indicators only if there are more items than can be displayed at once */}
                    {children.length > itemsPerPage && (
                        <div className="hidden md:flex gap-2">
                            {Array.from({ length: Math.ceil(children.length / itemsPerPage) }).map((_, index) => {
                                const isActive =
                                    currentIndex >= index * itemsPerPage &&
                                    currentIndex < (index + 1) * itemsPerPage;

                                return (
                                    <button
                                        key={`page-${index}`}
                                        onClick={() => goToIndex(index * itemsPerPage)}
                                        className="p-1"
                                        aria-label={`Go to page ${index + 1}`}
                                    >
                                        <span
                                            className={`block w-3 h-3 rounded-full transition-all ${isActive
                                                ? 'bg-primary w-4 h-4 shadow-sm shadow-primary/30'
                                                : 'bg-muted-foreground/40 hover:bg-muted-foreground/80'
                                                }`}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}