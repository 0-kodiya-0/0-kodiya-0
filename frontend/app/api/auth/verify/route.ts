import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function GET() {
    const token = cookies().get('token');
    
    try {

        if (!token?.value) {
            return NextResponse.json(
                { message: 'Authentication required' },
                { status: 401 }
            );
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
        const { payload } = await jwtVerify(token.value, secret);

        return NextResponse.json({
            message: 'Authenticated',
            user: {
                username: payload.username,
                role: payload.role
            }
        });
    } catch (error) {
        console.error('Auth verification error:', error);
        return NextResponse.json(
            { message: 'Invalid or expired token' },
            { status: 401 }
        );
    }
}