import { GitHubUserDetails, GitHubRepository, RepositoryContent } from "./github.types";

const BASE_URL = process.env.NEXT_PUBLIC_GIT_BASE_URL;
const USERNAME = process.env.NEXT_PUBLIC_GIT_USERNAME;

// Utility function for API request using fetch
const fetchFromGitHub = async <T>(
    endpoint: string,
    params?: Record<string, unknown>
): Promise<T> => {
    // Construct URL with query parameters
    const url = new URL(`${BASE_URL}${endpoint}`);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }

    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`GitHub API error: ${response.status} ${errorBody}`);
        }

        return await response.json() as T;
    } catch (error) {
        console.error(`Error fetching from GitHub ${endpoint}:`, error);
        throw error;
    }
};

// User Details Fetcher
export const fetchUserDetails = () =>
    fetchFromGitHub<GitHubUserDetails>(`/users/${USERNAME}`);

// Repositories Fetcher
export const fetchRepositories = (limit = 10) =>
    fetchFromGitHub<GitHubRepository[]>(`/users/${USERNAME}/repos`, {
        sort: 'updated',
        direction: 'desc',
        per_page: limit
    });

// README Content Fetcher
export const fetchRepositoryReadme = async (repoName: string): Promise<string | null> => {
    try {
        const content = await fetchFromGitHub<RepositoryContent>(`/repos/${USERNAME}/${repoName}/readme`);
        return Buffer.from(content.content, 'base64').toString('utf-8');
    } catch (error) {
        console.error(`Error fetching README for ${repoName}:`, error);
        return null;
    }
};

// License Content Fetcher
export const fetchRepositoryLicense = async (repoName: string): Promise<string | null> => {
    try {
        const content = await fetchFromGitHub<RepositoryContent>(`/repos/${USERNAME}/${repoName}/license`);
        return Buffer.from(content.content, 'base64').toString('utf-8');
    } catch (error) {
        console.error(`Error fetching LICENSE for ${repoName}:`, error);
        return null;
    }
};

// Contribution Statistics (placeholder)
export const fetchContributionStats = async () => ({
    totalContributions: 0,
    currentStreak: 0
});