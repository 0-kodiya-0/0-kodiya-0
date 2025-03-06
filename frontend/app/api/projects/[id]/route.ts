import { NextRequest, NextResponse } from 'next/server';
import { projectsService } from '@/lib/services/jsonbin';
import { CACHE_TAGS, DEFAULT_CACHE_TIME, revalidateProjects } from '@/lib/jsonbinCache';

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

    const data = await projectsService.getAll({
      revalidate: DEFAULT_CACHE_TIME,
      tags: [CACHE_TAGS.PROJECTS]
    });

    const project = data.projects.find(p => p.id === id);

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

    const projectData = await request.json();

    // Validate input
    if (!projectData.title || !projectData.description || !projectData.technologies) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Don't use cache for mutations
    const data = await projectsService.getAll({ revalidate: false });
    const projectIndex = data.projects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }

    // Update project with new values
    const updatedProject = {
      ...data.projects[projectIndex],
      ...projectData,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    data.projects[projectIndex] = updatedProject;
    await projectsService.update(data);

    // Revalidate cache after update
    revalidateProjects();

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

    const projectData = await request.json();

    // Don't use cache for mutations
    const data = await projectsService.getAll({ revalidate: false });
    const projectIndex = data.projects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }

    // Update only the provided fields
    const updatedProject = {
      ...data.projects[projectIndex],
      ...projectData,
      id, // Ensure ID doesn't change
      createdAt: data.projects[projectIndex].createdAt, // Preserve createdAt
      updatedAt: new Date().toISOString()
    };

    data.projects[projectIndex] = updatedProject;
    await projectsService.update(data);

    // Revalidate cache after update
    revalidateProjects();

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

    // Don't use cache for mutations
    const data = await projectsService.getAll({ revalidate: false });
    const projectIndex = data.projects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }

    // Remove the project
    data.projects.splice(projectIndex, 1);
    await projectsService.update(data);

    // Revalidate cache after delete
    revalidateProjects();

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { message: 'Failed to delete project' },
      { status: 500 }
    );
  }
}