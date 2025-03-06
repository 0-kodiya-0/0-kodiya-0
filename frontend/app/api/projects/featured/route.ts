import { NextResponse } from 'next/server';
import { projectsService } from '@/lib/services/jsonbin';
import { CACHE_TAGS, DEFAULT_CACHE_TIME } from '@/lib/jsonbinCache';

export async function GET() {
  try {
    // Use cache with tags for better cache control - cache for 5 minutes
    const data = await projectsService.getAll({
      revalidate: DEFAULT_CACHE_TIME,
      tags: [CACHE_TAGS.FEATURED_PROJECTS]
    });

    const featuredProjects = (data.projects || [])
      .filter(project => project.featured)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(featuredProjects);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return NextResponse.json(
      { message: 'Failed to fetch featured projects' },
      { status: 500 }
    );
  }
}