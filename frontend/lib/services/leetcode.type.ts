export interface StatsResponse {
    status: 'success' | 'error';
    message: string;
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    totalEasy: number;
    mediumSolved: number;
    totalMedium: number;
    hardSolved: number;
    totalHard: number;
    acceptanceRate: number;
    ranking: number;
    contributionPoints: number;
    reputation: number;
    submissionCalendar: Record<string, number>;
}

// Types for GraphQL Response
export interface GraphQLError {
    message: string;
}

export interface GraphQLQuestionCount {
    difficulty: string;
    count: number;
}

export interface GraphQLSubmissionStats {
    difficulty: string;
    count: number;
    submissions: number;
}

export interface GraphQLUserProfile {
    reputation: number;
    ranking: number;
}

export interface GraphQLUserContributions {
    points: number;
}

export interface GraphQLMatchedUser {
    contributions: GraphQLUserContributions;
    profile: GraphQLUserProfile;
    submissionCalendar: string;
    submitStats: {
        acSubmissionNum: GraphQLSubmissionStats[];
        totalSubmissionNum: GraphQLSubmissionStats[];
    };
}

export interface GraphQLResponse {
    data?: {
        allQuestionsCount: GraphQLQuestionCount[];
        matchedUser: GraphQLMatchedUser;
    };
    errors?: GraphQLError[];
}
