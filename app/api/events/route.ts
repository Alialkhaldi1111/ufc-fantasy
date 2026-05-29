import { NextRequest, NextResponse } from 'next/server';
import { getEvents } from '@/lib/data';
import { Event } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as Event['status'] | null;

    const events = await getEvents();
    let results = [...events];

    if (status) {
      results = results.filter((e) => e.status === status);
    }

    return NextResponse.json({ events: results, totalCount: results.length });
  } catch (error) {
    console.error('[GET /api/events]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
