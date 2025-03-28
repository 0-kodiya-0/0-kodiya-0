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
    homepage: string | undefined;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    created_at: string;
    updated_at: string;
    topics: string[];
    demoImage?: string;
};

export type RepositoryContent = {
    download_url: string | PromiseLike<string | undefined> | undefined;
    name: string;
    path: string;
    content: string;
    encoding: 'base64';
};

export type LanguageBreakdown = {
    [language: string]: {
        count: number;
        percentage: number;
        bytes: number;
    }
};

export type ContributionStats = {
    totalContributions: number;
    currentStreak: number;
    longestStreak: number;
    contributionYears: number[];
    contributionDetails: {
        year: number;
        total: number;
        weeks: {
            contributionCount: number;
            date: string;
        }[]
    }[];
};

export type PopularRepository = GitHubRepository & {
    contributionCount: number;
    healthPercentage: number;
};

export type ProfileInsights = {
    languages: LanguageBreakdown;
    popularRepositories: PopularRepository[];
    contributionStats: ContributionStats;
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

export type GitHubEvent = {
    type: string;
    created_at: string;
    repo: {
        name: string;
    };
    payload?: Record<string, unknown>;
};

// GitHub Language Response Type
export type GitHubLanguagesResponse = Record<string, number>;