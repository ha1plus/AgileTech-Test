import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get('refreshToken'); 

  // Redirect authenticated users away from the sign-in page
  if (pathname === '/sign-in' && refreshToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Example for handling unauthorized access to the profile page
  if (pathname === '/profile' && !refreshToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Allow requests to proceed as usual
  return NextResponse.next();
}

// Define the paths to apply this middleware
export const config = {
  matcher: ['/sign-in', '/profile'],
};
