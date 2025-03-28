import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest
) {
    const searchParams = req.nextUrl.searchParams
    const username = searchParams.get('username')

    if (!username || typeof username !== 'string') {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const query = JSON.stringify({
        query: `query getUserProfile($username: String!) { 
            allQuestionsCount { difficulty count } 
            matchedUser(username: $username) { 
                contributions { points } 
                profile { reputation ranking } 
                submissionCalendar 
                submitStats { 
                    acSubmissionNum { difficulty count submissions } 
                    totalSubmissionNum { difficulty count submissions } 
                } 
            } 
        }`,
        variables: { username }
    });

    try {
        const response = await fetch('https://leetcode.com/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': `https://leetcode.com/${username}/`
            },
            body: query
        });

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}