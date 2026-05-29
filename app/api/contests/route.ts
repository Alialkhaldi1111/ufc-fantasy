import { NextRequest, NextResponse } from 'next/server';
import { contests, addContest } from '@/data/contests';
import { events } from '@/data/events';
import { Contest } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as Contest['type'] | null;
    const status = searchParams.get('status') as Contest['status'] | null;
    const eventId = searchParams.get('eventId');

    let results = contests.map((c) => ({
      ...c,
      event: events.find((e) => e.id === c.eventId),
    }));

    if (type) results = results.filter((c) => c.type === type);
    if (status) results = results.filter((c) => c.status === status);
    if (eventId) results = results.filter((c) => c.eventId === eventId);

    return NextResponse.json({ contests: results, totalCount: results.length });
  } catch (error) {
    console.error('[GET /api/contests]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      eventId: string;
      name: string;
      type: Contest['type'];
      entryFee: number;
      prizePool: number;
      maxEntries: number;
      salaryCap: number;
      rosterSize: number;
    };

    const { eventId, name, type, entryFee, prizePool, maxEntries, salaryCap, rosterSize } = body;

    if (!eventId || !name || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: eventId, name, type' },
        { status: 400 }
      );
    }

    const event = events.find((e) => e.id === eventId);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const newContest = addContest({
      eventId,
      name,
      type,
      status: 'UPCOMING',
      entryFee: entryFee ?? 0,
      prizePool: prizePool ?? 0,
      maxEntries: maxEntries ?? 100,
      salaryCap: salaryCap ?? 50000,
      rosterSize: rosterSize ?? 6,
    });

    return NextResponse.json({ contest: newContest }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/contests]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
