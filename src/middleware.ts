import {NextRequest, NextResponse} from 'next/server';

export default function middleware(
  request: NextRequest
  // event: NextFetchEvent
) {
  // return your new response;
  const wildcard = request.headers.get('host')?.split('.')[0];

  if (wildcard === 'stage' || wildcard?.includes('localhost')) {
    return NextResponse.next({
      headers: {
        ...request.headers,
        'X-Robots-Tag': 'noindex'
      }
    });
  }

  return NextResponse.next();
}
