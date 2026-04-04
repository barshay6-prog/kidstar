import { NextRequest, NextResponse } from 'next/server';

// Proxy Google Translate TTS — returns Hebrew MP3 audio without requiring API keys.
export async function GET(req: NextRequest) {
  const text = req.nextUrl.searchParams.get('text');
  if (!text) return new NextResponse('missing text', { status: 400 });

  // Strip nikud/cantillation marks and collapse newlines for cleaner speech
  const clean = text
    .replace(/[\u0591-\u05C7]/g, '')
    .replace(/\n/g, ' ')
    .slice(0, 200); // Google TTS limit per request

  const url = new URL('https://translate.google.com/translate_tts');
  url.searchParams.set('ie', 'UTF-8');
  url.searchParams.set('q', clean);
  url.searchParams.set('tl', 'he');
  url.searchParams.set('client', 'tw-ob');

  try {
    const upstream = await fetch(url.toString(), {
      headers: {
        // Must look like a browser to avoid 403
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Referer: 'https://translate.google.com/',
      },
    });

    if (!upstream.ok) {
      return new NextResponse('upstream error', { status: upstream.status });
    }

    const audio = await upstream.arrayBuffer();
    return new NextResponse(audio, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400', // cache 24h — same text = same audio
      },
    });
  } catch {
    return new NextResponse('fetch error', { status: 502 });
  }
}
