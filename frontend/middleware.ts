// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Helper function to verify JWT
async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
    return await jwtVerify(token, secret);
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Allow open access to GET methods on public API routes
  if (
    (path.startsWith('/api/projects') || 
     path.startsWith('/api/testimonials')) && 
    request.method === 'GET'
  ) {
    return NextResponse.next();
  }
  
  // Protected routes - require authentication
  if (
    path.startsWith('/api/projects') || 
    path.startsWith('/api/testimonials') || 
    path.startsWith('/api/admin')
  ) {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const verifiedToken = await verifyToken(token);
    
    if (!verifiedToken) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    
    // Continue to the route handler if authenticated
    return NextResponse.next();
  }
  
  // Allow access to all other routes
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: ['/api/:path*'],
};