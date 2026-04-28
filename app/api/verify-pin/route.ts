import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { pin } = await req.json().catch(() => ({ pin: '' }));
  const serverPin = process.env.PARENT_PIN ?? '1234';

  if (!pin || typeof pin !== 'string') {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Constant-time compare to prevent timing attacks
  const match = pin.length === serverPin.length &&
    [...pin].every((c, i) => c === serverPin[i]);

  return NextResponse.json({ ok: match }, { status: match ? 200 : 401 });
}
