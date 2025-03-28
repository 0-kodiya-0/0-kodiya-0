import { GraphQLResponse, StatsResponse } from "./leetcode.type";

// LeetCode Stats Service
export class LeetCodeStatsService {
    /**
     * Fetch LeetCode user statistics
     * @param username - LeetCode username to fetch stats for
     * @returns Promise resolving to user stats
     */
    async getStats(username: string): Promise<StatsResponse> {
        try {
            const response = await fetch(`/api/leetcode-stats?username=${username}`);

            if (!response.ok) {
                throw new Error('Failed to fetch stats');
            }

            const data: GraphQLResponse = await response.json();

            // Check for GraphQL errors
            if (data.errors) {
                return this.createErrorResponse(data.errors[0].message);
            }

            return this.decodeGraphqlJson(data);
        } catch (error) {
            return this.createErrorResponse(
                error instanceof Error ? error.message : 'Unknown error'
            );
        }
    }


    /**
     * Decode GraphQL JSON response
     * @param json - GraphQL response JSON
     * @returns Decoded stats response
     */
    private decodeGraphqlJson(json: GraphQLResponse): StatsResponse {
        try {
            if (!json.data) {
                return this.createErrorResponse('No data found');
            }

            const { allQuestionsCount, matchedUser } = json.data;
            const { submitStats, contributions, profile } = matchedUser;
            const { acSubmissionNum, totalSubmissionNum } = submitStats;

            // Total counts
            const totalQuestions = allQuestionsCount[0].count;
            const totalEasy = allQuestionsCount[1].count;
            const totalMedium = allQuestionsCount[2].count;
            const totalHard = allQuestionsCount[3].count;

            // Solved counts
            const totalSolved = acSubmissionNum[0].count;
            const easySolved = acSubmissionNum[1].count;
            const mediumSolved = acSubmissionNum[2].count;
            const hardSolved = acSubmissionNum[3].count;

            // Acceptance rate
            const totalAcceptCount = acSubmissionNum[0].submissions;
            const totalSubCount = totalSubmissionNum[0].submissions;
            const acceptanceRate = totalSubCount !== 0 
                ? this.round((totalAcceptCount / totalSubCount) * 100, 2) 
                : 0;

            // Submission calendar
            const submissionCalendar: Record<string, number> = 
                JSON.parse(matchedUser.submissionCalendar);

            return {
                status: 'success',
                message: 'retrieved',
                totalSolved,
                totalQuestions,
                easySolved,
                totalEasy,
                mediumSolved,
                totalMedium,
                hardSolved,
                totalHard,
                acceptanceRate,
                ranking: profile.ranking,
                contributionPoints: contributions.points,
                reputation: profile.reputation,
                submissionCalendar
            };
        } catch (error) {
            return this.createErrorResponse(
                error instanceof Error ? error.message : 'Error decoding response'
            );
        }
    }

    /**
     * Create an error response object
     * @param message - Error message
     * @returns Error stats response
     */
    private createErrorResponse(message: string): StatsResponse {
        return {
            status: 'error',
            message,
            totalSolved: 0,
            totalQuestions: 0,
            easySolved: 0,
            totalEasy: 0,
            mediumSolved: 0,
            totalMedium: 0,
            hardSolved: 0,
            totalHard: 0,
            acceptanceRate: 0,
            ranking: 0,
            contributionPoints: 0,
            reputation: 0,
            submissionCalendar: {}
        };
    }

    /**
     * Round a number to specified decimal places
     * @param value - Number to round
     * @param decimalPlaces - Number of decimal places
     * @returns Rounded number
     */
    private round(value: number, decimalPlaces: number): number {
        const factor = Math.pow(10, decimalPlaces);
        return Math.round(value * factor) / factor;
    }
}

// Example usage function
export async function fetchLeetCodeStats(username: string): Promise<StatsResponse> {
    const statsService = new LeetCodeStatsService();
    try {
        return await statsService.getStats(username);
    } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
        throw error;
    }
}