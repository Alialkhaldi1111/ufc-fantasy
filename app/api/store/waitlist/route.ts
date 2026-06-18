import { NextRequest, NextResponse } from 'next/server';

// In-memory store for demo — replace with Prisma in production
const subscribers = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, source } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    subscribers.add(email.toLowerCase().trim());
    console.log(`Waitlist signup: ${email} (${source || 'unknown'})`);
    return NextResponse.json({ success: true, message: 'Added to waitlist' });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ count: subscribers.size });
}
