import { NextRequest, NextResponse } from 'next/server';
import { contests, updateContest } from '@/data/contests';
import { lineups } from '@/data/lineups';
import { mockUser } from '@/data/mockUser';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json() as { lineupId: string };
    const { lineupId } = body;

    if (!lineupId) {
      return NextResponse.json({ error: 'lineupId is required' }, { status: 400 });
    }

    const contest = contests.find((c) => c.id === id);
    if (!contest) {
      return NextResponse.json({ error: 'Contest not found' }, { status: 404 });
    }

    if (contest.status !== 'OPEN') {
      return NextResponse.json(
        { error: `Contest is not open for entry (status: ${contest.status})` },
        { status: 409 }
      );
    }

    if (contest.currentEntries >= contest.maxEntries) {
      return NextResponse.json({ error: 'Contest is full' }, { status: 409 });
    }

    const lineup = lineups.find((l) => l.id === lineupId);
    if (!lineup) {
      return NextResponse.json({ error: 'Lineup not found' }, { status: 404 });
    }

    if (!lineup.isSubmitted) {
      return NextResponse.json({ error: 'Lineup has not been submitted yet' }, { status: 422 });
    }

    if (lineup.slots.length !== contest.rosterSize) {
      return NextResponse.json(
        { error: `Lineup must have exactly ${contest.rosterSize} fighters` },
        { status: 422 }
      );
    }

    if (lineup.totalSalary > contest.salaryCap) {
      return NextResponse.json({ error: 'Lineup exceeds salary cap' }, { status: 422 });
    }

    // Check user balance for paid contests
    if (contest.entryFee > 0 && mockUser.balance < contest.entryFee) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 402 });
    }

    updateContest(id, { currentEntries: contest.currentEntries + 1 });

    return NextResponse.json({
      success: true,
      message: 'Successfully entered contest',
      contestId: id,
      lineupId,
    });
  } catch (error) {
    console.error('[POST /api/contests/[id]/enter]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
