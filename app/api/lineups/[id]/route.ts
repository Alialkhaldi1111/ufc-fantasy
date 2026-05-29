import { NextRequest, NextResponse } from 'next/server';
import { lineups, updateLineup, deleteLineup } from '@/data/lineups';
import { fighters } from '@/data/fighters';
import { LineupSlot } from '@/types';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const lineup = lineups.find((l) => l.id === id);

    if (!lineup) {
      return NextResponse.json({ error: 'Lineup not found' }, { status: 404 });
    }

    return NextResponse.json({ lineup });
  } catch (error) {
    console.error('[GET /api/lineups/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const lineup = lineups.find((l) => l.id === id);

    if (!lineup) {
      return NextResponse.json({ error: 'Lineup not found' }, { status: 404 });
    }

    if (lineup.isSubmitted) {
      return NextResponse.json({ error: 'Cannot modify a submitted lineup' }, { status: 409 });
    }

    const body = await request.json() as {
      name?: string;
      fighters?: { fighterId: string; slot: number }[];
    };

    let updates: Partial<typeof lineup> = {};

    if (body.name) updates.name = body.name;

    if (body.fighters) {
      const resolvedSlots: LineupSlot[] = [];
      let totalSalary = 0;

      for (const slot of body.fighters) {
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
          lineupId: id,
          fighterId: fighter.id,
          slot: slot.slot,
          fighter,
        });
      }

      updates.slots = resolvedSlots;
      updates.totalSalary = totalSalary;
    }

    const updated = updateLineup(id, updates);
    return NextResponse.json({ lineup: updated });
  } catch (error) {
    console.error('[PUT /api/lineups/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const removed = deleteLineup(id);

    if (!removed) {
      return NextResponse.json({ error: 'Lineup not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE /api/lineups/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
