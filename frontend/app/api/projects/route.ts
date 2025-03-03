import { NextRequest, NextResponse } from 'next/server';
import { projectsDb } from '@/lib/db';

export async function GET() {
  try {
    await projectsDb.read();

    // Return projects sorted by newest first
    const sortedProjects = [...(projectsDb.data?.projects || [])].sort((a, b) =>
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
    const data = await request.json();
    
    // Validate input (simplified for brevity)
    if (!data.title || !data.description) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    await projectsDb.read();

    // Generate a new ID
    const nextId = projectsDb.data?.projects.length 
      ? Math.max(...projectsDb.data.projects.map(p => p.id)) + 1
      : 1;

    const newProject = {
      ...data,
      id: nextId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    projectsDb.data?.projects.push(newProject);
    await projectsDb.write();

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { message: 'Failed to create project' },
      { status: 500 }
    );
  }
}