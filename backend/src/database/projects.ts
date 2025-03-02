import { createDatabase } from '../config/db.js';
import type { DatabaseSchema } from '../models/project.js';

// Default data for the projects database
const projectsDefaultData: DatabaseSchema = {
  projects: []
};

// Create the projects database instance
export const projectsDb = createDatabase<DatabaseSchema>('projects', projectsDefaultData);

export default projectsDb;