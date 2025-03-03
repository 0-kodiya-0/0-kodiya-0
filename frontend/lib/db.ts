// lib/db.ts
import { join } from 'path';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { TestimonialsSchema } from '@/models/testimonial';
import { DatabaseSchema } from '@/models/project';

// Base path for data storage
const getBasePath = () => {
  // Use the appropriate path based on environment
  const isProd = process.env.NODE_ENV === 'production';
  return isProd ? '/tmp' : join(process.cwd(), 'data');
};

// Create database instances
export function createDatabase<T>(dbName: string, defaultData: T): Low<T> {
  const dbPath = join(getBasePath(), `${dbName}.json`);
  const adapter = new JSONFile<T>(dbPath);
  return new Low<T>(adapter, defaultData);
}

// Default data
const projectsDefaultData: DatabaseSchema = {
  projects: []
};

const testimonialsDefaultData: TestimonialsSchema = {
  testimonials: []
};

// Create and export database instances
export const projectsDb = createDatabase<DatabaseSchema>('projects', projectsDefaultData);
export const testimonialsDb = createDatabase<TestimonialsSchema>('testimonials', testimonialsDefaultData);