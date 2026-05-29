import { NextRequest, NextResponse } from 'next/server';
import { calculateFantasyScore, FightStats } from '@/lib/scoring';
import { getFighterById } from '@/data/fighters';

interface CalculateBody {
  fighterId: string;
  fightStats: {
    won: boolean;
    finishMethod?: FightStats['finishMethod'];
    finishRound?: number;
    significantStrikes: number;
    takedowns: number;
    knockdowns: number;
    controlTimeSeconds: number;
    opponentRanking?: number;
    fighterRanking?: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as CalculateBody;
    const { fighterId, fightStats } = body;

    if (!fighterId || !fightStats) {
      return NextResponse.json(
        { error: 'Missing required fields: fighterId, fightStats' },
        { status: 400 }
      );
    }

    if (typeof fightStats.won !== 'boolean') {
      return NextResponse.json(
        { error: 'fightStats.won must be a boolean' },
        { status: 400 }
      );
    }

    if (
      typeof fightStats.significantStrikes !== 'number' ||
      typeof fightStats.takedowns !== 'number' ||
      typeof fightStats.knockdowns !== 'number' ||
      typeof fightStats.controlTimeSeconds !== 'number'
    ) {
      return NextResponse.json(
        { error: 'fightStats must include numeric: significantStrikes, takedowns, knockdowns, controlTimeSeconds' },
        { status: 400 }
      );
    }

    const fighter = getFighterById(fighterId);
    if (!fighter) {
      return NextResponse.json({ error: 'Fighter not found' }, { status: 404 });
    }

    const scoreBreakdown = calculateFantasyScore(fightStats);

    return NextResponse.json({
      fighter: { id: fighter.id, name: fighter.name },
      fightStats,
      scoreBreakdown,
    });
  } catch (error) {
    console.error('[POST /api/scoring/calculate]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
