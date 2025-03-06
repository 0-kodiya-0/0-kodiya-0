import { NextResponse } from 'next/server';
import { testimonialsService } from '@/lib/services/jsonbin';
import { CACHE_TAGS, DEFAULT_CACHE_TIME } from '@/lib/jsonbinCache';

export async function GET() {
  try {
    const data = await testimonialsService.getAll({
      revalidate: DEFAULT_CACHE_TIME,
      tags: [CACHE_TAGS.FEATURED_TESTIMONIALS]
    });

    const featuredTestimonials = (data.testimonials || [])
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