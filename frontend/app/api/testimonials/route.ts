import { NextRequest, NextResponse } from 'next/server';
import { testimonialsService } from '@/lib/services/jsonbin';
import { CACHE_TAGS, DEFAULT_CACHE_TIME, revalidateTestimonials } from '@/lib/jsonbinCache';

export async function GET() {
  try {
    const data = await testimonialsService.getAll({
      revalidate: DEFAULT_CACHE_TIME,
      tags: [CACHE_TAGS.TESTIMONIALS]
    });

    // Return testimonials sorted by newest first
    const sortedTestimonials = [...(data.testimonials || [])].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(sortedTestimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { message: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const testimonialData = await request.json();

    // Validate input
    if (!testimonialData.name || !testimonialData.role || !testimonialData.content || !testimonialData.image) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get current data - don't use cache for mutations
    const data = await testimonialsService.getAll({ revalidate: false });

    // Generate a new ID
    const nextId = data.testimonials.length
      ? Math.max(...data.testimonials.map(t => t.id)) + 1
      : 1;

    const newTestimonial = {
      ...testimonialData,
      id: nextId,
      featured: testimonialData.featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    data.testimonials.push(newTestimonial);
    await testimonialsService.update(data);

    // Revalidate the cache
    revalidateTestimonials();

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { message: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}