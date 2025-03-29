import { GitHubApiError } from "./github.types";

const BASE_URL = 'https://api.github.com';

// Centralized GitHub data fetcher with advanced caching and processing
export async function fetchGitHubData<T>(
    endpoint: string,
    params: Record<string, string | number> = {}
): Promise<T> {
    const url = new URL(`${BASE_URL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
    });

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.GIT_AUTH_TOKEN}`
            }
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new GitHubApiError(response.status, errorBody);
        }

        return await response.json() as T;
    } catch (error) {
        console.error(`Error fetching from GitHub ${endpoint}:`, error);
        throw error;
    }
}