// Define testimonial interface
export interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    image: string;
    company?: string;
}

export type TestimonialFormData = Omit<Testimonial, "id">