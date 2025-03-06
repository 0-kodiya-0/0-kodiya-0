import { NextRequest, NextResponse } from 'next/server';
import { projectsService } from '@/lib/services/jsonbin';
import { CACHE_TAGS, DEFAULT_CACHE_TIME, revalidateProjects } from '@/lib/jsonbinCache';

export async function GET() {
  try {
    // Use cache with tags for better cache control - cache for 5 minutes
    const data = await projectsService.getAll({
      revalidate: DEFAULT_CACHE_TIME,
      tags: [CACHE_TAGS.PROJECTS]
    });

    // Return projects sorted by newest first
    const sortedProjects = [...(data.projects || [])].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(sortedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { message: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const projectData = await request.json();

    // Validate input
    if (!projectData.title || !projectData.description) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get current data - don't use cache for mutations
    const data = await projectsService.getAll({ revalidate: false });

    // Generate a new ID
    const nextId = data.projects.length
      ? Math.max(...data.projects.map(p => p.id)) + 1
      : 1;

    // Create new project
    const newProject = {
      ...projectData,
      id: nextId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to array and update bin
    data.projects.push(newProject);
    await projectsService.update(data);

    // Revalidate the cache
    revalidateProjects();

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { message: 'Failed to create project' },
      { status: 500 }
    );
  }
}