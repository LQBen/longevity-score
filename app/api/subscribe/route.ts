import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    const groupId = process.env.MAILERLITE_GROUP_ID;

    if (!apiKey) {
      console.error('MAILERLITE_API_KEY is not configured');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        groups: groupId ? [groupId] : [],
      }),
    });

    if (res.ok || res.status === 422) {
      return NextResponse.json({ success: true });
    }

    const errorBody = await res.text();
    console.error('MailerLite API error:', res.status, errorBody);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 502 });
  } catch (err) {
    console.error('Subscribe route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
