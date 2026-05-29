'use client';

import React from 'react';
import Image from 'next/image';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LeaderboardEntry } from '@/types';
import { mockUser } from '@/data/mockUser';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
  showTrend?: boolean;
}

const RANK_STYLES: Record<number, { text: string; bg: string; border: string }> = {
  1: { text: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-600/40' },
  2: { text: 'text-gray-300', bg: 'bg-gray-700/20', border: 'border-gray-500/40' },
  3: { text: 'text-orange-400', bg: 'bg-orange-900/20', border: 'border-orange-600/40' },
};

const LEVEL_COLORS = [
  'text-gray-400',
  'text-green-400',
  'text-blue-400',
  'text-purple-400',
  'text-orange-400',
  'text-yellow-400',
  'text-red-400',
];

function RankBadge({ rank }: { rank: number }) {
  const style = RANK_STYLES[rank];
  if (style) {
    return (
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border ${style.text} ${style.bg} ${style.border}`}
      >
        {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}
      </div>
    );
  }
  return (
    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-gray-400 bg-gray-800 border border-gray-700">
      {rank}
    </div>
  );
}

function TrendIcon({ trend }: { trend?: 'up' | 'down' | 'flat' }) {
  if (trend === 'up') return <TrendingUp size={12} className="text-[#00ff87]" />;
  if (trend === 'down') return <TrendingDown size={12} className="text-red-400" />;
  return <Minus size={12} className="text-gray-600" />;
}

export function LeaderboardTable({
  entries,
  currentUserId = mockUser.id,
  showTrend = true,
}: LeaderboardTableProps) {
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800/40 overflow-hidden">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="grid grid-cols-[2rem_1fr_4rem_4rem_4rem_2rem] gap-2 px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
          <span>#</span>
          <span>Player</span>
          <span className="text-right">Points</span>
          <span className="text-right">Wins</span>
          <span className="text-right">ROI</span>
          {showTrend && <span />}
        </div>
      </div>

      <div className="divide-y divide-gray-700/50">
        {entries.map((entry, idx) => {
          const isCurrentUser = entry.userId === currentUserId;
          const levelColor = LEVEL_COLORS[Math.min(entry.user.level - 1, LEVEL_COLORS.length - 1)];
          // Simulate trend from position: top half going up, bottom going down
          const trend: 'up' | 'down' | 'flat' =
            idx % 3 === 0 ? 'up' : idx % 3 === 1 ? 'flat' : 'down';

          return (
            <div
              key={entry.id}
              className={`
                grid grid-cols-[2rem_1fr_4rem_4rem_4rem_2rem] gap-2 px-4 py-3 items-center
                transition-colors duration-150
                ${isCurrentUser
                  ? 'bg-[#00ff87]/5 border-l-2 border-l-[#00ff87]'
                  : 'hover:bg-gray-700/20'
                }
              `}
            >
              {/* Rank */}
              <RankBadge rank={entry.rank ?? idx + 1} />

              {/* Avatar + username */}
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative w-7 h-7 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                  {entry.user.avatar ? (
                    <Image
                      src={entry.user.avatar}
                      alt={entry.user.displayName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-400">
                      {entry.user.displayName[0]}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-xs font-semibold truncate ${
                      isCurrentUser ? 'text-[#00ff87]' : 'text-white'
                    }`}
                  >
                    {entry.user.username}
                    {isCurrentUser && (
                      <span className="ml-1 text-[10px] text-[#00ff87]/60">(you)</span>
                    )}
                  </p>
                  <p className={`text-[10px] font-medium ${levelColor}`}>
                    Lv.{entry.user.level} {entry.user.rank}
                  </p>
                </div>
              </div>

              {/* Points */}
              <p className="text-xs font-bold text-white text-right tabular-nums">
                {entry.points.toFixed(1)}
              </p>

              {/* Wins */}
              <p className="text-xs font-semibold text-gray-300 text-right tabular-nums">
                {entry.wins}
              </p>

              {/* ROI */}
              <p
                className={`text-xs font-semibold text-right tabular-nums ${
                  entry.roi >= 0 ? 'text-[#00ff87]' : 'text-red-400'
                }`}
              >
                {entry.roi >= 0 ? '+' : ''}
                {entry.roi.toFixed(1)}%
              </p>

              {/* Trend */}
              {showTrend && (
                <div className="flex justify-center">
                  <TrendIcon trend={trend} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {entries.length === 0 && (
        <div className="py-12 text-center text-gray-500 text-sm">
          No entries yet
        </div>
      )}
    </div>
  );
}
