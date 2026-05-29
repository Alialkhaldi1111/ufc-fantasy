'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, TrendingUp, TrendingDown, Minus, Trophy, Zap } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

const MOCK_LEADERS = [
  { rank: 1, username: 'KnockoutKing_88', displayName: 'Kevin Nguyen', level: 7, points: 4821, wins: 47, winRate: 68, winnings: 12400, trend: 0 },
  { rank: 2, username: 'OctagonOracle', displayName: 'Maria Santos', level: 6, points: 4750, wins: 41, winRate: 62, winnings: 9800, trend: 1 },
  { rank: 3, username: 'FightIQ_Pro', displayName: 'Alex Thompson', level: 6, points: 4690, wins: 38, winRate: 59, winnings: 8300, trend: -1 },
  { rank: 4, username: 'SalaryCapGod', displayName: 'James Liu', level: 5, points: 4520, wins: 35, winRate: 55, winnings: 6700, trend: 2 },
  { rank: 5, username: 'FinishLineKing', displayName: 'Tyler Brown', level: 5, points: 4480, wins: 33, winRate: 53, winnings: 5400, trend: -1 },
  { rank: 6, username: 'MMAMathWiz', displayName: 'Sandra Lee', level: 5, points: 4310, wins: 30, winRate: 51, winnings: 4200, trend: 3 },
  { rank: 7, username: 'TapOrSnapBets', displayName: 'Mike Jordan', level: 4, points: 4250, wins: 28, winRate: 48, winnings: 3800, trend: 0 },
  { rank: 8, username: 'RoundOneRazor', displayName: 'Chris Park', level: 4, points: 4190, wins: 26, winRate: 46, winnings: 3100, trend: -2 },
  { rank: 9, username: 'SubGrappler420', displayName: 'Emma Davis', level: 4, points: 4080, wins: 24, winRate: 44, winnings: 2700, trend: 1 },
  { rank: 10, username: 'NeonFistsFan', displayName: 'Ryan Wilson', level: 3, points: 3970, wins: 22, winRate: 42, winnings: 2300, trend: 0 },
  { rank: 11, username: 'CardiacKid_MMA', displayName: 'Zoe Harris', level: 3, points: 3850, wins: 20, winRate: 40, winnings: 1900, trend: 4 },
  { rank: 12, username: 'DistanceDecision', displayName: 'Nick Chen', level: 3, points: 3720, wins: 18, winRate: 38, winnings: 1600, trend: -1 },
  { rank: 13, username: 'BloodBrotherz', displayName: 'Sam Rodriguez', level: 3, points: 3600, wins: 17, winRate: 36, winnings: 1400, trend: 2 },
  { rank: 14, username: 'CageAnalyst', displayName: 'Laura Kim', level: 2, points: 3480, wins: 15, winRate: 34, winnings: 1200, trend: 0 },
  { rank: 15, username: 'AlexChampion', displayName: 'Alex Champion', level: 3, points: 3340, wins: 8, winRate: 33, winnings: 342, trend: 5, isCurrentUser: true },
];

const TABS = ['Global', 'Weekly', 'Friends', 'All Time'];

const rankColors = ['rank-gold', 'rank-silver', 'rank-bronze'];

export default function LeaderboardPage() {
  const [tab, setTab] = useState('Global');

  return (
    <div className="min-h-screen bg-[#080c12] pb-24 lg:pb-8">
      <div className="px-4 pt-6 pb-4 lg:px-8">
        <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        <p className="text-[#4a5568] text-sm mt-1">Season 2025 · Updates live</p>
      </div>

      {/* Tabs */}
      <div className="px-4 lg:px-8 mb-6">
        <div className="flex gap-2">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all",
                tab === t ? 'bg-[#39FF14] text-[#080c12]' : 'bg-[#0f1520] border border-[#1e2a3a] text-[#4a5568] hover:border-[#39FF14]/30')}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Podium */}
      <div className="px-4 lg:px-8 mb-6">
        <div className="flex items-end justify-center gap-4">
          {/* 2nd */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
            className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#C0C0C0]/20 border-2 border-[#C0C0C0]/40 flex items-center justify-center text-xl font-black text-[#C0C0C0] mb-2">
              {MOCK_LEADERS[1].displayName.split(' ').map(n=>n[0]).join('')}
            </div>
            <div className="text-[#C0C0C0] text-xs font-bold mb-1">2nd</div>
            <div className="text-white text-xs font-semibold text-center max-w-[80px] truncate">{MOCK_LEADERS[1].username}</div>
            <div className="text-[#C0C0C0] text-xs">{MOCK_LEADERS[1].points.toLocaleString()} pts</div>
            <div className="w-20 bg-[#C0C0C0]/10 border border-[#C0C0C0]/20 rounded-t-lg mt-2 h-16" />
          </motion.div>

          {/* 1st */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0 }}
            className="flex flex-col items-center">
            <Crown size={24} className="text-yellow-400 mb-1" />
            <div className="w-20 h-20 rounded-full bg-yellow-500/20 border-2 border-yellow-400/60 flex items-center justify-center text-2xl font-black text-yellow-400 mb-2 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
              {MOCK_LEADERS[0].displayName.split(' ').map(n=>n[0]).join('')}
            </div>
            <div className="text-yellow-400 text-xs font-bold mb-1">1st Place</div>
            <div className="text-white text-sm font-semibold text-center">{MOCK_LEADERS[0].username}</div>
            <div className="text-yellow-400 text-sm font-bold">{MOCK_LEADERS[0].points.toLocaleString()} pts</div>
            <div className="w-24 bg-yellow-500/10 border border-yellow-500/20 rounded-t-lg mt-2 h-24" />
          </motion.div>

          {/* 3rd */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-amber-700/20 border-2 border-amber-700/40 flex items-center justify-center text-xl font-black text-amber-600 mb-2">
              {MOCK_LEADERS[2].displayName.split(' ').map(n=>n[0]).join('')}
            </div>
            <div className="text-amber-600 text-xs font-bold mb-1">3rd</div>
            <div className="text-white text-xs font-semibold text-center max-w-[80px] truncate">{MOCK_LEADERS[2].username}</div>
            <div className="text-amber-600 text-xs">{MOCK_LEADERS[2].points.toLocaleString()} pts</div>
            <div className="w-20 bg-amber-700/10 border border-amber-700/20 rounded-t-lg mt-2 h-10" />
          </motion.div>
        </div>
      </div>

      {/* Full Table */}
      <div className="px-4 lg:px-8">
        <div className="bg-[#0f1520] rounded-xl border border-[#1e2a3a] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e2a3a]">
                  <th className="text-left text-[#4a5568] text-xs font-medium px-4 py-3">Rank</th>
                  <th className="text-left text-[#4a5568] text-xs font-medium px-4 py-3">Player</th>
                  <th className="text-right text-[#4a5568] text-xs font-medium px-4 py-3">Points</th>
                  <th className="text-right text-[#4a5568] text-xs font-medium px-4 py-3 hidden sm:table-cell">Wins</th>
                  <th className="text-right text-[#4a5568] text-xs font-medium px-4 py-3 hidden md:table-cell">Win%</th>
                  <th className="text-right text-[#4a5568] text-xs font-medium px-4 py-3 hidden lg:table-cell">Winnings</th>
                  <th className="text-right text-[#4a5568] text-xs font-medium px-4 py-3">Trend</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_LEADERS.map((entry, i) => (
                  <motion.tr
                    key={entry.rank}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={cn(
                      "border-b border-[#1e2a3a]/50 transition-colors",
                      (entry as any).isCurrentUser
                        ? 'bg-[#39FF14]/5 border-l-2 border-l-[#39FF14]'
                        : 'hover:bg-[#141d2e]'
                    )}
                  >
                    <td className="px-4 py-3">
                      <span className={cn("font-black text-base", i < 3 ? [rankColors[0], rankColors[1], rankColors[2]][i] : 'text-[#4a5568]')}>
                        {entry.rank < 4 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : `#${entry.rank}`}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                          (entry as any).isCurrentUser ? 'bg-[#39FF14]/20 text-[#39FF14]' : 'bg-[#1e2a3a] text-white')}>
                          {entry.displayName.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <div>
                          <div className={cn("text-sm font-semibold", (entry as any).isCurrentUser ? 'text-[#39FF14]' : 'text-white')}>
                            {entry.username} {(entry as any).isCurrentUser && '(You)'}
                          </div>
                          <div className="text-xs text-[#4a5568]">Level {entry.level}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-white font-bold text-sm">{entry.points.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell">
                      <span className="text-[#4a5568] text-sm">{entry.wins}</span>
                    </td>
                    <td className="px-4 py-3 text-right hidden md:table-cell">
                      <span className="text-[#4a5568] text-sm">{entry.winRate}%</span>
                    </td>
                    <td className="px-4 py-3 text-right hidden lg:table-cell">
                      <span className="text-[#39FF14] text-sm font-medium">{formatCurrency(entry.winnings)}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {entry.trend > 0 ? (
                        <span className="text-[#39FF14] text-xs flex items-center justify-end gap-0.5"><TrendingUp size={12} />+{entry.trend}</span>
                      ) : entry.trend < 0 ? (
                        <span className="text-red-400 text-xs flex items-center justify-end gap-0.5"><TrendingDown size={12} />{entry.trend}</span>
                      ) : (
                        <span className="text-[#4a5568] text-xs flex items-center justify-end"><Minus size={12} /></span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Your Rank Footer */}
        <div className="mt-4 bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy size={20} className="text-[#39FF14]" />
            <div>
              <div className="text-white text-sm font-semibold">Your Global Rank</div>
              <div className="text-[#4a5568] text-xs">Keep playing to climb higher!</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[#39FF14] text-2xl font-black">#15</div>
            <div className="text-[#4a5568] text-xs">3,340 pts</div>
          </div>
        </div>
      </div>
    </div>
  );
}
