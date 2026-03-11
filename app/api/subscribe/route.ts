import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // TODO: Wire up MailerLite API when ready
    // const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
    console.log('Email subscription:', { name, email });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
