import { NextRequest, NextResponse } from 'next/server';
import { projectsDb } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: 'Invalid project ID format' },
        { status: 400 }
      );
    }

    await projectsDb.read();
    
    if (!projectsDb.data) {
      return NextResponse.json(
        { message: 'Database not initialized' },
        { status: 500 }
      );
    }

    const project = projectsDb.data.projects.find(p => p.id === id);

    if (!project) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { message: 'Failed to fetch project' },
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
        { message: 'Invalid project ID format' },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Validate input
    if (!data.title || !data.description || !data.technologies) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await projectsDb.read();

    if (!projectsDb.data) {
      return NextResponse.json(
        { message: 'Database not initialized' },
        { status: 500 }
      );
    }

    const projectIndex = projectsDb.data.projects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }

    // Update project with new values
    const updatedProject = {
      ...projectsDb.data.projects[projectIndex],
      ...data,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    projectsDb.data.projects[projectIndex] = updatedProject;
    await projectsDb.write();

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { message: 'Failed to update project' },
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
        { message: 'Invalid project ID format' },
        { status: 400 }
      );
    }

    const data = await request.json();

    await projectsDb.read();

    if (!projectsDb.data) {
      return NextResponse.json(
        { message: 'Database not initialized' },
        { status: 500 }
      );
    }

    const projectIndex = projectsDb.data.projects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }

    // Update only the provided fields
    const updatedProject = {
      ...projectsDb.data.projects[projectIndex],
      ...data,
      id, // Ensure ID doesn't change
      createdAt: projectsDb.data.projects[projectIndex].createdAt, // Preserve createdAt
      updatedAt: new Date().toISOString()
    };

    projectsDb.data.projects[projectIndex] = updatedProject;
    await projectsDb.write();

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { message: 'Failed to update project' },
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
        { message: 'Invalid project ID format' },
        { status: 400 }
      );
    }

    await projectsDb.read();

    if (!projectsDb.data) {
      return NextResponse.json(
        { message: 'Database not initialized' },
        { status: 500 }
      );
    }

    const projectIndex = projectsDb.data.projects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }

    // Remove the project
    projectsDb.data.projects.splice(projectIndex, 1);
    await projectsDb.write();

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { message: 'Failed to delete project' },
      { status: 500 }
    );
  }
}