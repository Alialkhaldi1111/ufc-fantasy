import { NextRequest, NextResponse } from 'next/server';
import { contests, updateContest, deleteContest } from '@/data/contests';
import { events } from '@/data/events';
import { Contest } from '@/types';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contest = contests.find((c) => c.id === id);

    if (!contest) {
      return NextResponse.json({ error: 'Contest not found' }, { status: 404 });
    }

    return NextResponse.json({
      contest: { ...contest, event: events.find((e) => e.id === contest.eventId) },
    });
  } catch (error) {
    console.error('[GET /api/contests/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json() as Partial<Contest>;

    const updated = updateContest(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Contest not found' }, { status: 404 });
    }

    return NextResponse.json({ contest: updated });
  } catch (error) {
    console.error('[PUT /api/contests/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const removed = deleteContest(id);

    if (!removed) {
      return NextResponse.json({ error: 'Contest not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE /api/contests/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
