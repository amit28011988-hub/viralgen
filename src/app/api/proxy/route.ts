import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get('url');
    if (!url) return new NextResponse('Missing URL', { status: 400 });

    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const headers = new Headers();
        headers.set('Content-Type', response.headers.get('Content-Type') || 'image/jpeg');
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');

        return new NextResponse(blob, { headers });
    } catch (e) {
        return new NextResponse('Failed to fetch image', { status: 500 });
    }
}
