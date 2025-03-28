import { NextRequest, NextResponse } from 'next/server';
import { GitHubUserDetails, GitHubRepository, LanguageBreakdown, ContributionStats, ProfileInsights, PopularRepository, GitHubEvent, GitHubLanguagesResponse, RepositoryContent } from '@/lib/services/github.types';
import { fetchGitHubData } from '@/lib/services/github';
import { unstable_cache } from 'next/cache';

const USERNAME = process.env.NEXT_PUBLIC_GIT_USERNAME;
const CACHE_DURATION = 15 * 60; // 15 minutes in seconds

// Endpoint-specific functions
async function getUserDetails() {
    return fetchGitHubData<GitHubUserDetails>(
        `/users/${USERNAME}`,
        {}
    );
}

async function getRepositories(limit = 10) {
    return fetchGitHubData<GitHubRepository[]>(
        `/users/${USERNAME}/repos`,
        {
            sort: 'updated',
            direction: 'desc',
            per_page: limit
        }
    );
}

async function getLanguageBreakdown(): Promise<LanguageBreakdown> {
    try {
        const repos = await fetchGitHubData<GitHubRepository[]>(
            `/users/${USERNAME}/repos`,
            { per_page: 100 }
        );

        const languageStats: LanguageBreakdown = {};
        let totalBytes = 0;

        // Fetch detailed language stats for each repo
        for (const repo of repos) {
            try {
                const repoLanguages = await fetchGitHubData<GitHubLanguagesResponse>(
                    `/repos/${USERNAME}/${repo.name}/languages`,
                    {}
                );

                for (const [lang, bytes] of Object.entries(repoLanguages)) {
                    languageStats[lang] = languageStats[lang] || { count: 0, bytes: 0, percentage: 0 };
                    languageStats[lang].count++;
                    languageStats[lang].bytes += bytes;
                    totalBytes += bytes;
                }
            } catch (error) {
                console.error(`Error fetching languages for ${repo.name}:`, error);
            }
        }

        // Calculate percentages
        for (const lang of Object.keys(languageStats)) {
            languageStats[lang].percentage =
                (languageStats[lang].bytes / totalBytes) * 100;
        }

        return languageStats;
    } catch (error) {
        console.error('Error fetching language breakdown:', error);
        return {};
    }
}


const fetchRepositoryDemoImage = async (repoName: string): Promise<string | undefined> => {
    try {
        const content = await fetchGitHubData<RepositoryContent>(
            `/repos/${USERNAME}/${repoName}/contents/docs/demo-image.png`
        );

        // If the image exists, return its download URL
        return content.download_url;
    } catch {
        // If no image is found, return undefined
        console.log(`No demo image found for ${repoName}`);
        return undefined;
    }
};

// README Content Fetcher
const fetchRepositoryReadme = async (repoName: string): Promise<string | null> => {
    try {
        const content = await fetchGitHubData<RepositoryContent>(`/repos/${USERNAME}/${repoName}/readme`);
        return Buffer.from(content.content, 'base64').toString('utf-8');
    } catch (error) {
        console.error(`Error fetching README for ${repoName}:`, error);
        return null;
    }
};

// License Content Fetcher
const fetchRepositoryLicense = async (repoName: string): Promise<string | null> => {
    try {
        const content = await fetchGitHubData<RepositoryContent>(`/repos/${USERNAME}/${repoName}/license`);
        return Buffer.from(content.content, 'base64').toString('utf-8');
    } catch (error) {
        console.error(`Error fetching LICENSE for ${repoName}:`, error);
        return null;
    }
};

async function getContributionStats(): Promise<ContributionStats> {
    try {
        const events = await fetchGitHubData<GitHubEvent[]>(
            `/users/${USERNAME}/events`,
            {}
        );

        // Basic contribution tracking
        const contributionYears = new Set<number>();
        const contributionDetails: ContributionStats['contributionDetails'] = [];
        let totalContributions = 0;
        const currentStreak = 0;
        const longestStreak = 0;

        // Process events to extract contribution information
        events.forEach((event: GitHubEvent) => {
            const date = new Date(event.created_at);
            contributionYears.add(date.getFullYear());
            totalContributions++;
        });

        return {
            totalContributions,
            currentStreak,
            longestStreak,
            contributionYears: Array.from(contributionYears).sort(),
            contributionDetails
        };
    } catch (error) {
        console.error('Error fetching contribution stats:', error);
        return {
            totalContributions: 0,
            currentStreak: 0,
            longestStreak: 0,
            contributionYears: [],
            contributionDetails: []
        };
    }
}

async function getProfileInsights(): Promise<ProfileInsights> {
    const [languages, popularRepos, contributionStats] = await Promise.all([
        getLanguageBreakdown(),
        getPopularRepositories(),
        getContributionStats()
    ]);

    return {
        languages,
        popularRepositories: popularRepos,
        contributionStats
    };
}

async function getPopularRepositories(limit = 10): Promise<PopularRepository[]> {
    try {
        const repositories = await fetchGitHubData<GitHubRepository[]>(
            `/users/${USERNAME}/repos`,
            {
                sort: 'stars',
                direction: 'desc',
                per_page: limit
            }
        );

        // Calculate repository health and return
        return repositories.map(repo => ({
            ...repo,
            contributionCount: 0,
            healthPercentage: calculateRepositoryHealth(repo)
        }));
    } catch (error) {
        console.error('Error fetching popular repositories:', error);
        return [];
    }
}

// Calculate Repository Health
function calculateRepositoryHealth(repo: GitHubRepository): number {
    // Simple health calculation based on stars, forks, and last updated
    const starWeight = 0.4;
    const forkWeight = 0.3;
    const recencyWeight = 0.3;

    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;
    const lastUpdated = new Date(repo.updated_at);
    const daysSinceUpdate = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);

    // Normalize values
    const normalizedStars = Math.min(stars / 100, 1);
    const normalizedForks = Math.min(forks / 50, 1);
    const normalizedRecency = Math.max(1 - daysSinceUpdate / 365, 0);

    const health = (
        normalizedStars * starWeight +
        normalizedForks * forkWeight +
        normalizedRecency * recencyWeight
    ) * 100;

    return Math.round(health);
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');
    const repoName = searchParams.get('repoName');

    try {
        switch (endpoint) {
            case 'user-details':
                return NextResponse.json(await unstable_cache(
                    async () => await getUserDetails(),
                    ['github-user-details'],
                    { revalidate: CACHE_DURATION }
                )());

            case 'repositories':
                const limit = Number(searchParams.get('limit') || 10);
                return NextResponse.json(await unstable_cache(
                    async () => await getRepositories(limit),
                    [`github-repositories-${limit}`],
                    { revalidate: CACHE_DURATION }
                )());

            case 'language-breakdown':
                return NextResponse.json(await unstable_cache(
                    async () => await getLanguageBreakdown(),
                    ['github-language-breakdown'],
                    { revalidate: CACHE_DURATION }
                )());

            case 'contribution-stats':
                return NextResponse.json(await unstable_cache(
                    async () => await getContributionStats(),
                    ['github-contribution-stats'],
                    { revalidate: CACHE_DURATION }
                )());

            case 'popular-repositories':
                const popularLimit = Number(searchParams.get('limit') || 10);
                return NextResponse.json(await unstable_cache(
                    async () => await getPopularRepositories(popularLimit),
                    [`github-popular-repositories-${popularLimit}`],
                    { revalidate: CACHE_DURATION }
                )());

            case 'profile-insights':
                return NextResponse.json(await unstable_cache(
                    async () => await getProfileInsights(),
                    ['github-profile-insights'],
                    { revalidate: CACHE_DURATION }
                )());

            case 'readme':
                if (!repoName) {
                    throw "query repoName is missing";
                }
                return new NextResponse(await fetchRepositoryReadme(repoName), { status: 200 });

            case 'license':
                if (!repoName) {
                    throw "query repoName is missing";
                }
                return new NextResponse(await fetchRepositoryLicense(repoName), { status: 200 });

            case 'demo-image':
                if (!repoName) {
                    throw "query repoName is missing";
                }
                return new NextResponse(await fetchRepositoryDemoImage(repoName), { status: 200 });

            default:
                return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
        }
    } catch (error) {
        console.error('GitHub API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
    }
}