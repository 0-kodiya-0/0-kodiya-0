import Image from "next/image";
import { useState } from "react";
import type { Testimonial } from "./testimonial.types";
import TestimonialModal from "./TestimonialModal";

interface TestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div
                onClick={openModal}
                className="bg-card border border-border rounded-lg p-6 shadow-sm mx-4 w-80 h-64 flex flex-col overflow-hidden cursor-pointer hover:border-primary hover:shadow-md transition-all duration-300 group"
            >
                {/* Card header with profile image and name */}
                <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12 mr-4 shrink-0">
                        <Image
                            src={testimonial.image}
                            alt={`${testimonial.name}'s profile picture`}
                            width={48}
                            height={48}
                            className="rounded-full object-cover group-hover:border-primary border border-transparent transition-colors"
                            priority={false}
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-base">{testimonial.name}</h3>
                        <p className="text-muted-foreground text-sm">
                            {testimonial.role}
                            {testimonial.company && ` at ${testimonial.company}`}
                        </p>
                    </div>
                </div>

                {/* Testimonial content with truncation */}
                <div className="relative flex-grow overflow-hidden">
                    <p className="text-sm leading-relaxed line-clamp-4">
                        &quot;{testimonial.content}&quot;
                    </p>

                    {/* Gradient fade effect at the bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-card to-transparent pointer-events-none"></div>
                </div>

                {/* Read more indicator */}
                <div className="mt-3 text-xs flex items-center justify-end text-primary group-hover:text-primary-light transition-colors">
                    <span>Read full testimonial</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1 group-hover:translate-x-1 transition-transform"
                    >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                </div>
            </div>

            {/* Modal for expanded view */}
            <TestimonialModal
                testimonial={testimonial}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    );
};

export default TestimonialCard;