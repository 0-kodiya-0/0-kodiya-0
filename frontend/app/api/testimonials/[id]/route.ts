import { NextRequest, NextResponse } from 'next/server';
import { testimonialsService } from '@/lib/services/jsonbin';
import { CACHE_TAGS, DEFAULT_CACHE_TIME, revalidateTestimonials } from '@/lib/jsonbinCache';

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

        const data = await testimonialsService.getAll({
            revalidate: DEFAULT_CACHE_TIME,
            tags: [CACHE_TAGS.TESTIMONIALS]
        });

        const testimonial = data.testimonials.find(t => t.id === id);

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

        const testimonialData = await request.json();

        // Validate input
        if (!testimonialData.name || !testimonialData.role || !testimonialData.content || !testimonialData.image) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Don't use cache for mutations
        const data = await testimonialsService.getAll({ revalidate: false });

        if (!data.testimonials) {
            return NextResponse.json(
                { message: 'Database not initialized' },
                { status: 500 }
            );
        }

        const testimonialIndex = data.testimonials.findIndex(t => t.id === id);

        if (testimonialIndex === -1) {
            return NextResponse.json(
                { message: 'Testimonial not found' },
                { status: 404 }
            );
        }

        // Update testimonial with new values
        const updatedTestimonial = {
            ...data.testimonials[testimonialIndex],
            ...testimonialData,
            id, // Ensure ID doesn't change
            updatedAt: new Date().toISOString()
        };

        data.testimonials[testimonialIndex] = updatedTestimonial;
        await testimonialsService.update(data);

        // Revalidate cache after update
        revalidateTestimonials();

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

        const testimonialData = await request.json();

        // Don't use cache for mutations
        const data = await testimonialsService.getAll({ revalidate: false });

        if (!data.testimonials) {
            return NextResponse.json(
                { message: 'Database not initialized' },
                { status: 500 }
            );
        }

        const testimonialIndex = data.testimonials.findIndex(t => t.id === id);

        if (testimonialIndex === -1) {
            return NextResponse.json(
                { message: 'Testimonial not found' },
                { status: 404 }
            );
        }

        // Update only the provided fields
        const updatedTestimonial = {
            ...data.testimonials[testimonialIndex],
            ...testimonialData,
            id, // Ensure ID doesn't change
            createdAt: data.testimonials[testimonialIndex].createdAt, // Preserve createdAt
            updatedAt: new Date().toISOString()
        };

        data.testimonials[testimonialIndex] = updatedTestimonial;
        await testimonialsService.update(data);

        // Revalidate cache after update
        revalidateTestimonials();

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

        // Don't use cache for mutations
        const data = await testimonialsService.getAll({ revalidate: false });

        if (!data.testimonials) {
            return NextResponse.json(
                { message: 'Database not initialized' },
                { status: 500 }
            );
        }

        const testimonialIndex = data.testimonials.findIndex(t => t.id === id);

        if (testimonialIndex === -1) {
            return NextResponse.json(
                { message: 'Testimonial not found' },
                { status: 404 }
            );
        }

        // Remove the testimonial
        data.testimonials.splice(testimonialIndex, 1);
        await testimonialsService.update(data);

        // Revalidate cache after delete
        revalidateTestimonials();

        return NextResponse.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        return NextResponse.json(
            { message: 'Failed to delete testimonial' },
            { status: 500 }
        );
    }
}