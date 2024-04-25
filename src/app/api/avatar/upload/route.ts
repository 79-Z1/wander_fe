import {NextResponse} from 'next/server';
import {put} from '@vercel/blob';

export async function POST(request: Request): Promise<NextResponse> {
  const {searchParams} = new URL(request.url);
  const filename = searchParams.get('filename') || 'unknown.png';

  const blob = await put(filename, request.body as any, {
    access: 'public'
  });

  return NextResponse.json(blob);
}
