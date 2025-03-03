// app/api/testimonials/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { testimonialsDb } from '@/lib/db';

export async function GET() {
  try {
    await testimonialsDb.read();

    // Return testimonials sorted by newest first
    const sortedTestimonials = [...(testimonialsDb.data?.testimonials || [])].sort((a, b) =>
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

    // Generate a new ID
    const nextId = testimonialsDb.data.testimonials.length > 0
      ? Math.max(...testimonialsDb.data.testimonials.map(t => t.id)) + 1
      : 1;

    const newTestimonial = {
      ...data,
      id: nextId,
      featured: data.featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    testimonialsDb.data.testimonials.push(newTestimonial);
    await testimonialsDb.write();

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { message: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}