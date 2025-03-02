import express, { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import { projectsDb as db } from '../database/index.js';
import type { Project, NewProject, EditProject } from '../models/index.js';

export const projectsRouter = express.Router();

/**
 * GET /api/projects
 * Get all projects
 */
projectsRouter.get('/', async (req: Request, res: Response) => {
  try {
    await db.read();

    // Return projects sorted by newest first
    const sortedProjects = [...(db.data?.projects || [])].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    res.status(200).json(sortedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
});

/**
 * GET /api/projects/featured
 * Get featured projects
 */
projectsRouter.get('/featured', async (req: Request, res: Response) => {
  try {
    await db.read();

    const featuredProjects = (db.data?.projects || [])
      .filter(project => project.featured)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.status(200).json(featuredProjects);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.status(500).json({ message: 'Failed to fetch featured projects' });
  }
});

/**
 * GET /api/projects/:id
 * Get a single project by ID
 */
projectsRouter.get('/:id', [
  param('id').notEmpty().withMessage('Project ID is required')
], async (req: Request, res: Response) => {
  try {
    await db.read();

    const projectId = parseInt(req.params.id, 10);
    if (isNaN(projectId)) {
      res.status(400).json({ message: 'Invalid project ID format' });
      return;
    }

    const project = (db.data?.projects || []).find(p => p.id === projectId);

    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Failed to fetch project' });
  }
});

/**
 * POST /api/projects
 * Create a new project
 */
projectsRouter.post('/', [
  requireAuth,
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('longDescription').notEmpty().withMessage('Long description is required'),
  body('technologies').isArray().withMessage('Technologies must be an array'),
  body('image').notEmpty().withMessage('Image emoji is required'),
  body('githubUrl').notEmpty().withMessage('GitHub URL is required')
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    await db.read();

    // Ensure db.data exists
    if (!db.data) {
      res.status(500).json({ message: 'Database not initialized' });
      return;
    }

    // Generate a new ID (highest ID + 1)
    const nextId = db.data.projects.length > 0
      ? Math.max(...db.data.projects.map(p => p.id)) + 1
      : 1;

    const projectData: NewProject = {
      title: req.body.title,
      description: req.body.description,
      longDescription: req.body.longDescription,
      technologies: req.body.technologies,
      image: req.body.image,
      projectUrl: req.body.projectUrl || '',
      githubUrl: req.body.githubUrl,
      challenges: req.body.challenges || [],
      solutions: req.body.solutions || [],
      featured: req.body.featured || false
    };

    const newProject: Project = {
      ...projectData,
      id: nextId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.data.projects.push(newProject);
    await db.write();

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Failed to create project' });
  }
});

/**
 * PUT /api/projects/:id
 * Update a project
 */
projectsRouter.put('/:id', [
  requireAuth,
  param('id').notEmpty().withMessage('Project ID is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('longDescription').notEmpty().withMessage('Long description is required'),
  body('technologies').isArray().withMessage('Technologies must be an array'),
  body('image').notEmpty().withMessage('Image emoji is required'),
  body('githubUrl').notEmpty().withMessage('GitHub URL is required')
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    await db.read();

    // Ensure db.data exists
    if (!db.data) {
      res.status(500).json({ message: 'Database not initialized' });
      return;
    }

    const projectId = parseInt(req.params.id, 10);
    if (isNaN(projectId)) {
      res.status(400).json({ message: 'Invalid project ID format' });
      return;
    }

    const projectIndex = db.data.projects.findIndex(p => p.id === projectId);

    if (projectIndex === -1) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    const projectData: EditProject = {
      title: req.body.title,
      description: req.body.description,
      longDescription: req.body.longDescription,
      technologies: req.body.technologies,
      image: req.body.image,
      projectUrl: req.body.projectUrl || '',
      githubUrl: req.body.githubUrl,
      challenges: req.body.challenges || [],
      solutions: req.body.solutions || [],
      featured: req.body.featured
    };

    // Update project with new values
    const updatedProject: Project = {
      ...db.data.projects[projectIndex],
      ...projectData,
      updatedAt: new Date().toISOString()
    };

    db.data.projects[projectIndex] = updatedProject;
    await db.write();

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Failed to update project' });
  }
});

/**
 * PATCH /api/projects/:id
 * Partially update a project (e.g., toggle featured status)
 */
projectsRouter.patch('/:id', [
  requireAuth,
  param('id').notEmpty().withMessage('Project ID is required')
], async (req: Request, res: Response) => {
  try {
    await db.read();

    // Ensure db.data exists
    if (!db.data) {
      res.status(500).json({ message: 'Database not initialized' });
      return;
    }

    const projectId = parseInt(req.params.id, 10);
    if (isNaN(projectId)) {
      res.status(400).json({ message: 'Invalid project ID format' });
      return;
    }

    const projectIndex = db.data.projects.findIndex(p => p.id === projectId);

    if (projectIndex === -1) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    // Update only the provided fields
    const updatedProject: Project = {
      ...db.data.projects[projectIndex],
      ...req.body,
      id: db.data.projects[projectIndex].id, // Ensure ID doesn't change
      createdAt: db.data.projects[projectIndex].createdAt, // Ensure createdAt doesn't change
      updatedAt: new Date().toISOString()
    };

    db.data.projects[projectIndex] = updatedProject;
    await db.write();

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Failed to update project' });
  }
});

/**
 * DELETE /api/projects/:id
 * Delete a project
 */
projectsRouter.delete('/:id', [
  requireAuth,
  param('id').notEmpty().withMessage('Project ID is required')
], async (req: Request, res: Response) => {
  try {
    await db.read();

    // Ensure db.data exists
    if (!db.data) {
      res.status(500).json({ message: 'Database not initialized' });
      return;
    }

    const projectId = parseInt(req.params.id, 10);
    if (isNaN(projectId)) {
      res.status(400).json({ message: 'Invalid project ID format' });
      return;
    }

    const projectIndex = db.data.projects.findIndex(p => p.id === projectId);

    if (projectIndex === -1) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    // Remove the project
    db.data.projects.splice(projectIndex, 1);
    await db.write();

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Failed to delete project' });
  }
});

export default projectsRouter;