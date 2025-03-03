import { NextRequest, NextResponse } from 'next/server';
import { testimonialsDb } from '@/lib/db';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id, 10);
        if (isNaN(id)) {
            return NextResponse.json(
                { message: 'Invalid testimonial ID format' },
                { status: 400 }
            );
        }

        await testimonialsDb.read();
        const testimonial = testimonialsDb.data?.testimonials.find(t => t.id === id);

        if (!testimonial) {
            return NextResponse.json(
                { message: 'Testimonial not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(testimonial);
    } catch (error) {
        console.error('Error fetching testimonial:', error);
        return NextResponse.json(
            { message: 'Failed to fetch testimonial' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id, 10);
        if (isNaN(id)) {
            return NextResponse.json(
                { message: 'Invalid testimonial ID format' },
                { status: 400 }
            );
        }

        const data = await request.json();

        // Validate input
        if (!data.name || !data.role || !data.content || !data.image) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        await testimonialsDb.read();

        if (!testimonialsDb.data) {
            return NextResponse.json(
                { message: 'Database not initialized' },
                { status: 500 }
            );
        }

        const testimonialIndex = testimonialsDb.data.testimonials.findIndex(t => t.id === id);

        if (testimonialIndex === -1) {
            return NextResponse.json(
                { message: 'Testimonial not found' },
                { status: 404 }
            );
        }

        // Update testimonial with new values
        const updatedTestimonial = {
            ...testimonialsDb.data.testimonials[testimonialIndex],
            ...data,
            id, // Ensure ID doesn't change
            updatedAt: new Date().toISOString()
        };

        testimonialsDb.data.testimonials[testimonialIndex] = updatedTestimonial;
        await testimonialsDb.write();

        return NextResponse.json(updatedTestimonial);
    } catch (error) {
        console.error('Error updating testimonial:', error);
        return NextResponse.json(
            { message: 'Failed to update testimonial' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id, 10);
        if (isNaN(id)) {
            return NextResponse.json(
                { message: 'Invalid testimonial ID format' },
                { status: 400 }
            );
        }

        const data = await request.json();

        await testimonialsDb.read();

        if (!testimonialsDb.data) {
            return NextResponse.json(
                { message: 'Database not initialized' },
                { status: 500 }
            );
        }

        const testimonialIndex = testimonialsDb.data.testimonials.findIndex(t => t.id === id);

        if (testimonialIndex === -1) {
            return NextResponse.json(
                { message: 'Testimonial not found' },
                { status: 404 }
            );
        }

        // Update only the provided fields
        const updatedTestimonial = {
            ...testimonialsDb.data.testimonials[testimonialIndex],
            ...data,
            id, // Ensure ID doesn't change
            createdAt: testimonialsDb.data.testimonials[testimonialIndex].createdAt, // Preserve createdAt
            updatedAt: new Date().toISOString()
        };

        testimonialsDb.data.testimonials[testimonialIndex] = updatedTestimonial;
        await testimonialsDb.write();

        return NextResponse.json(updatedTestimonial);
    } catch (error) {
        console.error('Error updating testimonial:', error);
        return NextResponse.json(
            { message: 'Failed to update testimonial' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id, 10);
        if (isNaN(id)) {
            return NextResponse.json(
                { message: 'Invalid testimonial ID format' },
                { status: 400 }
            );
        }

        await testimonialsDb.read();

        if (!testimonialsDb.data) {
            return NextResponse.json(
                { message: 'Database not initialized' },
                { status: 500 }
            );
        }

        const testimonialIndex = testimonialsDb.data.testimonials.findIndex(t => t.id === id);

        if (testimonialIndex === -1) {
            return NextResponse.json(
                { message: 'Testimonial not found' },
                { status: 404 }
            );
        }

        // Remove the testimonial
        testimonialsDb.data.testimonials.splice(testimonialIndex, 1);
        await testimonialsDb.write();

        return NextResponse.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        return NextResponse.json(
            { message: 'Failed to delete testimonial' },
            { status: 500 }
        );
    }
}