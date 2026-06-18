import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, source } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const subscriber = await prisma.emailSubscriber.upsert({
      where: { email },
      update: { firstName, source },
      create: { email, firstName, source: source ?? 'waitlist' },
    });

    const count = await prisma.emailSubscriber.count();

    return NextResponse.json({ success: true, subscriber, count });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
  }
}
