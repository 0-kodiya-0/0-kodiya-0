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

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            return await response.json() as T;
        } else {
            // Handle text responses (readme, license)
            const text = await response.text();
            return text as unknown as T;
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
    const getRepositoryDemoImage = useCallback(async (repoName: string) => {
        const response = await fetchFromServerRoute<{ url: string | undefined }>('demo-image', { repoName });
        return response.url;
    }, [fetchFromServerRoute]);


    const getRepositories = useCallback(async (limit = 10) => {
        const repos = await fetchFromServerRoute<GitHubRepository[]>('repositories', { limit })
        return Promise.all(repos.map(async (repo) => {
            const demoImage = await getRepositoryDemoImage(repo.name);
            return { ...repo, demoImage };
        }));
    },
        [fetchFromServerRoute, getRepositoryDemoImage]
    );

    const getRepository = useCallback((repoName: string) =>
        fetchFromServerRoute<GitHubRepository>('repository', { repoName }),
        [fetchFromServerRoute]
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
        getRepository,
        getProfileInsights,
        getRepositoryReadme,
        getRepositoryLicense,
        getRepositoryDemoImage
    };
};