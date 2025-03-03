import {  NextResponse } from 'next/server';
import { projectsDb } from '@/lib/db';

export async function GET() {
  try {
    await projectsDb.read();

    const featuredProjects = (projectsDb.data?.projects || [])
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