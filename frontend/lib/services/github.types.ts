export type GitHubUserDetails = {
    name: string;
    bio: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
    blog: string;
    location: string;
    email: string | null;
    twitter_username: string | null;
    html_url: string;
};

export type GitHubRepository = {
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    created_at: string;
    updated_at: string;
    topics: string[];
};

export type RepositoryContent = {
    name: string;
    path: string;
    content: string;
    encoding: 'base64';
};

// Optional: Add a type-safe error handler
export class GitHubApiError extends Error {
    constructor(
        public status: number,
        message: string
    ) {
        super(message);
        this.name = 'GitHubApiError';
    }
}