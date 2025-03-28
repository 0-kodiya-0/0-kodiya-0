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
    demoImage?: string;
}