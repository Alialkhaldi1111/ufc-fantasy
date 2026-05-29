import { NextRequest, NextResponse } from 'next/server';
import { lineups, addLineup } from '@/data/lineups';
import { contests } from '@/data/contests';
import { fighters } from '@/data/fighters';
import { mockUser } from '@/data/mockUser';
import { LineupSlot } from '@/types';

export async function GET(_request: NextRequest) {
  try {
    // In production this would filter by authenticated user
    const userLineups = lineups.filter((l) => l.userId === mockUser.id);
    return NextResponse.json({ lineups: userLineups, totalCount: userLineups.length });
  } catch (error) {
    console.error('[GET /api/lineups]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      contestId?: string;
      name: string;
      fighters: { fighterId: string; slot: number }[];
    };

    const { contestId, name, fighters: fighterSlots } = body;

    if (!name || !fighterSlots?.length) {
      return NextResponse.json(
        { error: 'Missing required fields: name, fighters' },
        { status: 400 }
      );
    }

    // Determine constraints from contest or defaults
    const contest = contestId ? contests.find((c) => c.id === contestId) : null;
    const salaryCap = contest?.salaryCap ?? 50000;
    const rosterSize = contest?.rosterSize ?? 6;

    if (fighterSlots.length > rosterSize) {
      return NextResponse.json(
        { error: `Lineup cannot exceed ${rosterSize} fighters` },
        { status: 422 }
      );
    }

    // Resolve fighters and calculate salary
    const resolvedSlots: LineupSlot[] = [];
    let totalSalary = 0;

    for (const slot of fighterSlots) {
      const fighter = fighters.find((f) => f.id === slot.fighterId);
      if (!fighter) {
        return NextResponse.json(
          { error: `Fighter not found: ${slot.fighterId}` },
          { status: 404 }
        );
      }
      totalSalary += fighter.salary;
      resolvedSlots.push({
        id: `slot-${slot.slot}`,
        lineupId: '',
        fighterId: fighter.id,
        slot: slot.slot,
        fighter,
      });
    }

    if (totalSalary > salaryCap) {
      return NextResponse.json(
        { error: `Lineup salary $${totalSalary} exceeds cap $${salaryCap}` },
        { status: 422 }
      );
    }

    const isSubmitted = fighterSlots.length === rosterSize;

    const newLineup = addLineup({
      userId: mockUser.id,
      contestId,
      name,
      totalSalary,
      totalPoints: 0,
      isSubmitted,
      slots: resolvedSlots,
    });

    // Fix slot lineupIds
    newLineup.slots = newLineup.slots.map((s) => ({ ...s, lineupId: newLineup.id }));

    return NextResponse.json({ lineup: newLineup }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/lineups]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
