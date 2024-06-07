import type {NextRequest, NextResponse} from 'next/server';
import {withAuth} from 'next-auth/middleware';

const authMiddleware = withAuth({
  callbacks: {
    authorized: ({token}) => {
      return token != null;
    }
  },
  pages: {
    signIn: '/explore'
  }
});

export default async function middleware(request: NextRequest) {
  const response: NextResponse = (authMiddleware as any)(request);

  return response;
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|sitemap.xml|sitemap-[\\d].xml|robots.txt|.*\\..*).*)']
};
