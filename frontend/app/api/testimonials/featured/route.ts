import { NextResponse } from 'next/server';
import { testimonialsDb } from '@/lib/db';

export async function GET() {
    try {
        await testimonialsDb.read();

        const featuredTestimonials = (testimonialsDb.data?.testimonials || [])
            .filter(testimonial => testimonial.featured)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json(featuredTestimonials);
    } catch (error) {
        console.error('Error fetching featured testimonials:', error);
        return NextResponse.json(
            { message: 'Failed to fetch featured testimonials' },
            { status: 500 }
        );
    }
}