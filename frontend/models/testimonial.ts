// lib/models/testimonial.ts
// Define the Testimonial interface
export interface Testimonial {
    id: number;
    name: string;
    role: string;
    company?: string;
    content: string;
    image: string;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}

// Define types for creating and updating testimonials
export type NewTestimonial = Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>;
export type EditTestimonial = Partial<Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>>;

// Define the structure of the testimonials database
export interface TestimonialsSchema {
    testimonials: Testimonial[];
}