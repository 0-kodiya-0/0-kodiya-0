export interface Project {
    name: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    homepage?: string;
    readme?: string;
    license?: string;
    topics: string[];
    language: string;
    stargazers_count: number;
    forks_count: number;
}

export type NewProject = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
export type EditProject = Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>;

export interface DatabaseSchema {
    projects: Project[];
}