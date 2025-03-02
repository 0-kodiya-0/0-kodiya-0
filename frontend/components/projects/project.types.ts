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
}

export type NewProject = Omit<Project, "id"> 

export type EditProject = Partial<Project>;