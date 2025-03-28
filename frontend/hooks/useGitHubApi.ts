import { useCallback } from 'react';
import {
    GitHubUserDetails,
    GitHubRepository,
    LanguageBreakdown,
    ContributionStats,
    ProfileInsights,
    PopularRepository
} from '@/lib/services/github.types';

export const useGitHubAPI = () => {
    const fetchFromServerRoute = useCallback(async <T>(
        endpoint: string,
        params: Record<string, string | number> = {}
    ): Promise<T> => {
        const queryParams = new URLSearchParams({
            endpoint,
            ...Object.fromEntries(
                Object.entries(params).map(([k, v]) => [k, String(v)])
            )
        });

        const response = await fetch(`/api/github?${queryParams}`, {
            // Disable caching on the client-side fetch
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Server error: ${response.status} ${errorBody}`);
        }

        try {
            return await response.json();
        } catch {
            return response.body as T;
        }
    }, []);

    

    const getUserDetails = useCallback(() =>
        fetchFromServerRoute<GitHubUserDetails>('user-details'),
        [fetchFromServerRoute]
    );

    const getRepositoryReadme = useCallback((repoName: string) =>
        fetchFromServerRoute<string>('readme', { repoName }),
        [fetchFromServerRoute]
    );
    const getRepositoryLicense = useCallback((repoName: string) =>
        fetchFromServerRoute<string>('license', { repoName }),
        [fetchFromServerRoute]
    );
    const getRepositoryDemoImage = useCallback((repoName: string) =>
        fetchFromServerRoute<string>('demo-image', { repoName }),
        [fetchFromServerRoute]
    );

    const getRepositories = useCallback(async (limit = 10) => {
        const repos = await fetchFromServerRoute<GitHubRepository[]>('repositories', { limit })
        return Promise.all(repos.map(async (repo) => {
            const demoImage = await getRepositoryDemoImage(repo.name);
            return { ...repo, demoImage };
        }));
    },
        [fetchFromServerRoute, getRepositoryDemoImage]
    );

    const getLanguageBreakdown = useCallback(() =>
        fetchFromServerRoute<LanguageBreakdown>('language-breakdown'),
        [fetchFromServerRoute]
    );

    const getContributionStats = useCallback(() =>
        fetchFromServerRoute<ContributionStats>('contribution-stats'),
        [fetchFromServerRoute]
    );

    const getPopularRepositories = useCallback((limit = 10) =>
        fetchFromServerRoute<PopularRepository[]>('popular-repositories', { limit }),
        [fetchFromServerRoute]
    );

    const getProfileInsights = useCallback(() =>
        fetchFromServerRoute<ProfileInsights>('profile-insights'),
        [fetchFromServerRoute]
    );

    return {
        getUserDetails,
        getRepositories,
        getLanguageBreakdown,
        getContributionStats,
        getPopularRepositories,
        getProfileInsights,
        getRepositoryReadme,
        getRepositoryLicense,
        getRepositoryDemoImage
    };
};