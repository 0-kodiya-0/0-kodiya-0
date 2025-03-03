import Image from "next/image";
import type { Testimonial } from "./testimonial.types";

interface TestimonialCardProps {
    testimonial: Testimonial;
}

// Testimonial card component
const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    return (
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm mx-4 w-80 h-auto">
            <div className="flex items-start mb-4">
                <div className="relative w-12 h-12 mr-4">
                    <Image
                        src={testimonial.image}
                        alt={`${testimonial.name}'s profile picture`}
                        width={48}
                        height={48}
                        className="rounded-full"
                        priority={false}
                    />
                </div>
                <div>
                    <h3 className="font-semibold text-base">{testimonial.name}</h3>
                    <p className="text-muted-foreground text-sm">{testimonial.role}
                    {testimonial.company && ` at ${testimonial.company}`}</p>
                </div>
            </div>
            <p className="text-sm leading-relaxed">&quot;{testimonial.content}&quot;</p>
        </div>
    );
};

export default TestimonialCard;