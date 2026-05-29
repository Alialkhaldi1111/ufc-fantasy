import { NextRequest, NextResponse } from 'next/server';
import { mockUser } from '@/data/mockUser';
import { LeaderboardEntry } from '@/types';

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lb1',
    userId: 'user2',
    user: {
      id: 'user2',
      email: 'mma_master@octafight.gg',
      username: 'mma_master',
      displayName: 'MMA Master',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mma_master',
      role: 'PREMIUM',
      xp: 9800,
      level: 18,
      rank: 'Legend',
      streakDays: 21,
      balance: 1250.0,
      totalWinnings: 8400.0,
      totalContests: 142,
      contestWins: 51,
    },
    contestId: undefined,
    season: '2025',
    points: 1248.5,
    rank: 1,
    wins: 51,
    roi: 124.3,
  },
  {
    id: 'lb2',
    userId: 'user3',
    user: {
      id: 'user3',
      email: 'fightprophet@octafight.gg',
      username: 'fightprophet',
      displayName: 'Fight Prophet',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fightprophet',
      role: 'PREMIUM',
      xp: 7200,
      level: 15,
      rank: 'Champion',
      streakDays: 14,
      balance: 890.0,
      totalWinnings: 5600.0,
      totalContests: 110,
      contestWins: 38,
    },
    season: '2025',
    points: 1102.0,
    rank: 2,
    wins: 38,
    roi: 98.7,
  },
  {
    id: 'lb3',
    userId: 'user4',
    user: {
      id: 'user4',
      email: 'octagonking@octafight.gg',
      username: 'octagonking',
      displayName: 'Octagon King',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=octagonking',
      role: 'USER',
      xp: 5100,
      level: 12,
      rank: 'Contender',
      streakDays: 5,
      balance: 320.0,
      totalWinnings: 2100.0,
      totalContests: 75,
      contestWins: 24,
    },
    season: '2025',
    points: 987.4,
    rank: 3,
    wins: 24,
    roi: 74.2,
  },
  {
    id: 'lb4',
    userId: mockUser.id,
    user: mockUser,
    season: '2025',
    points: 921.1,
    rank: 4,
    wins: mockUser.contestWins,
    roi: 62.8,
  },
  {
    id: 'lb5',
    userId: 'user5',
    user: {
      id: 'user5',
      email: 'bloodsport@octafight.gg',
      username: 'bloodsport',
      displayName: 'BloodSport',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bloodsport',
      role: 'USER',
      xp: 3300,
      level: 9,
      rank: 'Fighter',
      streakDays: 3,
      balance: 180.0,
      totalWinnings: 940.0,
      totalContests: 52,
      contestWins: 15,
    },
    season: '2025',
    points: 855.7,
    rank: 5,
    wins: 15,
    roi: 48.5,
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const season = searchParams.get('season') ?? '2025';
    const contestId = searchParams.get('contestId');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 200);

    let entries = [...MOCK_LEADERBOARD];

    if (season) {
      entries = entries.filter((e) => e.season === season);
    }

    if (contestId) {
      entries = entries.filter((e) => e.contestId === contestId);
    }

    entries = entries
      .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
      .slice(0, limit);

    return NextResponse.json({ entries, totalCount: entries.length, season });
  } catch (error) {
    console.error('[GET /api/leaderboard]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
