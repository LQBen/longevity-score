import { NextResponse } from 'next/server';
import { calculateScore } from '@/lib/scoring-config';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers } = body;

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Invalid request: answers required' }, { status: 400 });
    }

    const result = calculateScore(answers);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
