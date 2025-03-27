import { useState, useEffect, useCallback } from 'react';
import localforage from 'localforage';
import {
    fetchUserDetails,
    fetchRepositories,
    fetchRepositoryReadme,
    fetchRepositoryLicense
} from '../lib/services/github';

// Configure LocalForage for GitHub data
const githubCache = localforage.createInstance({
    name: 'GitHubAPICache',
    storeName: 'githubData'
});

// Caching configuration
const CACHE_DURATION = 1 * 60 * 60 * 1000; // 1 hour in milliseconds

// Custom hook for GitHub API with multi-layer caching
export const useGitHubAPI = () => {
    const [isServiceWorkerReady, setIsServiceWorkerReady] = useState(false);

    // Service Worker Registration
    useEffect(() => {
        const registerServiceWorker = async () => {
            if ('serviceWorker' in navigator) {
                try {
                    const registration = await navigator.serviceWorker.register('/sw.js');
                    console.log('Service Worker registered:', registration);
                    setIsServiceWorkerReady(true);
                } catch (error) {
                    console.error('Service Worker registration failed:', error);
                }
            }
        };

        registerServiceWorker();
    }, []);

    // Cached fetch with multiple fallback mechanisms
    const cachedFetch = useCallback(async <T>(
        fetchFn: () => Promise<T>,
        cacheKey: string
    ): Promise<T> => {
        try {
            // Check LocalForage cache first
            const cachedData = await githubCache.getItem<{
                data: T;
                timestamp: number;
            }>(cacheKey);

            // Return cached data if not expired
            if (cachedData &&
                (Date.now() - cachedData.timestamp) < CACHE_DURATION) {
                return cachedData.data;
            }

            // Fetch fresh data
            const freshData = await fetchFn();

            // Store in LocalForage
            await githubCache.setItem(cacheKey, {
                data: freshData,
                timestamp: Date.now()
            });

            return freshData;
        } catch (error) {
            // Fallback to cached data even if expired
            const cachedData = await githubCache.getItem<{
                data: T;
                timestamp: number;
            }>(cacheKey);

            if (cachedData) {
                console.warn('Using expired cached data');
                return cachedData.data;
            }

            // If no cache, rethrow the error
            throw error;
        }
    }, []);

    // Specific GitHub data fetchers with caching
    const getUserDetails = useCallback(() =>
        cachedFetch(fetchUserDetails, 'github-user-details'),
        [cachedFetch]
    );

    const getRepositories = useCallback((limit = 10) =>
        cachedFetch(() => fetchRepositories(limit), 'github-repositories'),
        [cachedFetch]
    );

    const getRepositoryReadme = useCallback((repoName: string) =>
        cachedFetch(() => fetchRepositoryReadme(repoName), `readme-${repoName}`),
        [cachedFetch]
    );

    const getRepositoryLicense = useCallback((repoName: string) =>
        cachedFetch(() => fetchRepositoryLicense(repoName), `license-${repoName}`),
        [cachedFetch]
    );

    return {
        getUserDetails,
        getRepositories,
        getRepositoryReadme,
        getRepositoryLicense,
        isServiceWorkerReady
    };
};