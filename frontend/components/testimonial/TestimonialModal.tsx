import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Testimonial } from "./testimonial.types";

interface TestimonialModalProps {
    testimonial: Testimonial;
    isOpen: boolean;
    onClose: () => void;
}

const TestimonialModal: React.FC<TestimonialModalProps> = ({
    testimonial,
    isOpen,
    onClose,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        // Close modal when pressing Escape key
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscKey);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [isOpen, onClose]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md md:max-w-lg z-10 overflow-hidden m-4"
                    >
                        {/* Modal header with enhanced styling */}
                        <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 p-6 pb-8">
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-3 right-3 p-2 rounded-full hover:bg-card-hover transition-colors text-muted-foreground hover:text-foreground bg-card/60 backdrop-blur-sm"
                                aria-label="Close modal"
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
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                            {/* Testimonial header with enhanced profile image */}
                            <div className="flex flex-col items-center text-center">
                                <div className="relative w-24 h-24 mb-4">
                                    <Image
                                        src={testimonial.image}
                                        alt={`${testimonial.name}'s profile picture`}
                                        width={96}
                                        height={96}
                                        className="rounded-full border-2 border-primary/30 object-cover shadow-md"
                                        priority
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{testimonial.name}</h3>
                                    <p className="text-muted-foreground">
                                        {testimonial.role}
                                        {testimonial.company && ` at ${testimonial.company}`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Quote icon */}
                            <div className="mb-4 text-primary/20 flex justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    stroke="none"
                                >
                                    <path d="M11.9 6.5c-2.61 0-5.3 1.74-5.3 5.86 0 5.02 3.67 8.14 5.3 8.14 2.31 0 2.31-1.45 2.31-1.45h-1.18c-2.55 0-3.08-2.55-3.08-4.48 0-.91.44-1.41 1.1-1.67.25-.1.5-.16.74-.16h7.36C18.14 6.5 14.5 6.5 11.9 6.5z M21.2 12.73c0-4.12-2.7-5.86-5.3-5.86h-.07c2.6 0 4.46 2.61 4.46 6.86 0 .91-.44 1.41-1.1 1.67-.25.1-.5.16-.74.16h-5.05c0 2.58 1.86 2.58 2.31 2.58 1.67 0 2.75-1.14 2.75-1.14v1.04c-.81.85-1.91 1.96-3.89 1.96-1.86 0-3.94-1.45-3.94-4.1h7.17c2.02 0 3.4-1.01 3.4-3.17z" />
                                </svg>
                            </div>

                            {/* Testimonial content */}
                            <div className="text-base leading-relaxed mb-6 max-h-60 md:max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                                {testimonial.content.split('\n').map((paragraph, idx) => (
                                    <p key={idx} className="mb-4 text-center">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Visual indicator for scrollable content */}
                            <div className="flex justify-center mt-2">
                                <div className="h-1 w-12 rounded-full bg-primary/20"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TestimonialModal;