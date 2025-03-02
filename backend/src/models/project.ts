// Define the Project interface
export interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    image: string;
    projectUrl: string;
    githubUrl: string;
    challenges: string[];
    solutions: string[];
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}

// Define types for creating and updating projects
export type NewProject = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
export type EditProject = Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>;

// Define the structure of the database
export interface DatabaseSchema {
    projects: Project[];
}