// lib/db.ts
import { join, dirname } from 'path';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { TestimonialsSchema } from '@/models/testimonial';
import { DatabaseSchema } from '@/models/project';
import fs from 'fs';

// Base path for data storage
const getBasePath = () => {
  // Use the appropriate path based on environment
  const isProd = process.env.NODE_ENV === 'production';
  
  if (isProd) {
    return '/tmp';
  }
  
  // Use a path relative to this file instead of process.cwd()
  return join(dirname(__dirname), 'data');
};

// Ensure the directory exists
function ensureDirExists(filePath: string): void {
  const dir = dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Create database instances
export function createDatabase<T>(dbName: string, defaultData: T): Low<T> {
  const dbPath = join(getBasePath(), `${dbName}.json`);
  
  // Ensure directory exists
  ensureDirExists(dbPath);
  
  // Create file if it doesn't exist
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(defaultData), 'utf-8');
  }
  
  const adapter = new JSONFile<T>(dbPath);
  const db = new Low<T>(adapter, defaultData);
  
  return db;
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