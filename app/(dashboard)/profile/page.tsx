'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Target, Flame, Star, TrendingUp, Edit3, Users, DollarSign } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

const MOCK_USER = {
  displayName: 'Alex Champion',
  username: 'alexchampion',
  bio: 'MMA enthusiast & fantasy sports addict. UFC fanatic since 2009.',
  level: 3,
  levelName: 'Fighter',
  xp: 450,
  xpNeeded: 700,
  streakDays: 5,
  totalContests: 24,
  wins: 8,
  winRate: 33,
  winnings: 342,
  balance: 125,
};

const MOCK_ACHIEVEMENTS = [
  { name: 'First Blood', icon: '🩸', rarity: 'common', earned: true },
  { name: 'Sharp Shooter', icon: '🎯', rarity: 'rare', earned: true },
  { name: 'Grind', icon: '🔥', rarity: 'common', earned: true },
  { name: 'Scholar', icon: '📚', rarity: 'common', earned: true },
  { name: 'Champion', icon: '🏆', rarity: 'rare', earned: false },
  { name: 'High Roller', icon: '💰', rarity: 'epic', earned: false },
  { name: 'Perfect Pick', icon: '⚡', rarity: 'epic', earned: false },
  { name: 'Legend', icon: '⭐', rarity: 'legendary', earned: false },
];

const MOCK_HISTORY = [
  { contest: 'UFC 314 Grand Slam', event: 'UFC 314', score: 127.5, result: 'Top 20%', prize: 15 },
  { contest: 'UFC 314 Free Roll', event: 'UFC 314', score: 98.0, result: 'Top 35%', prize: 0 },
  { contest: 'UFC FN Head-to-Head', event: 'UFC Fight Night', score: 145.0, result: 'WON', prize: 45 },
  { contest: 'UFC 313 GPP', event: 'UFC 313', score: 82.5, result: 'Bottom 50%', prize: 0 },
  { contest: 'Monthly Tournament', event: 'UFC 312', score: 190.0, result: 'WON', prize: 150 },
];

const RARITY_COLORS: Record<string, string> = {
  common: 'border-[#1e2a3a] text-[#4a5568]',
  rare: 'border-blue-500/30 text-blue-400',
  epic: 'border-purple-500/30 text-purple-400',
  legendary: 'border-yellow-500/30 text-yellow-400',
};

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const xpPct = (MOCK_USER.xp / MOCK_USER.xpNeeded) * 100;

  return (
    <div className="min-h-screen bg-[#080c12] pb-24 lg:pb-8">
      <div className="px-4 pt-6 pb-4 lg:px-8">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
      </div>

      <div className="px-4 lg:px-8 space-y-6">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f1520] rounded-2xl border border-[#1e2a3a] p-6">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-[#39FF14]/10 border-2 border-[#39FF14]/30 flex items-center justify-center text-2xl font-black text-[#39FF14] flex-shrink-0">
              AC
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-xl font-black text-white">{MOCK_USER.displayName}</h2>
                  <p className="text-[#4a5568] text-sm">@{MOCK_USER.username}</p>
                </div>
                <button onClick={() => setEditing(!editing)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e2a3a] text-white rounded-lg text-xs font-medium hover:bg-[#2a3a4a] transition-colors flex-shrink-0">
                  <Edit3 size={12} /> Edit
                </button>
              </div>
              <p className="text-[#4a5568] text-sm mt-2">{MOCK_USER.bio}</p>

              {/* Level + XP */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 bg-[#39FF14]/10 text-[#39FF14] text-xs rounded-full font-bold">Lv.{MOCK_USER.level} {MOCK_USER.levelName}</span>
                  </span>
                  <span className="text-[#4a5568] text-xs">{MOCK_USER.xp} / {MOCK_USER.xpNeeded} XP</span>
                </div>
                <div className="h-2 bg-[#1e2a3a] rounded-full overflow-hidden">
                  <motion.div className="h-full bg-[#39FF14] rounded-full"
                    initial={{ width: 0 }} animate={{ width: `${xpPct}%` }} transition={{ duration: 1, delay: 0.3 }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Contests', value: MOCK_USER.totalContests, icon: Target, color: 'text-blue-400' },
            { label: 'Wins', value: MOCK_USER.wins, icon: Trophy, color: 'text-yellow-400' },
            { label: 'Win Rate', value: `${MOCK_USER.winRate}%`, icon: TrendingUp, color: 'text-[#39FF14]' },
            { label: 'Earned', value: formatCurrency(MOCK_USER.winnings), icon: DollarSign, color: 'text-[#39FF14]' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl p-4 text-center">
              <stat.icon size={20} className={cn("mx-auto mb-2", stat.color)} />
              <div className="text-white font-black text-xl">{stat.value}</div>
              <div className="text-[#4a5568] text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Streaks */}
        <div className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl p-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-lg px-3 py-2">
            <Flame size={16} className="text-orange-400" />
            <span className="text-white text-sm font-bold">{MOCK_USER.streakDays}-Day Streak</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-2">
            <Trophy size={16} className="text-yellow-400" />
            <span className="text-white text-sm font-bold">{MOCK_USER.wins} Contest Wins</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2">
            <Zap size={16} className="text-blue-400" />
            <span className="text-white text-sm font-bold">127 Best Score</span>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl p-5">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Star size={16} className="text-yellow-400" /> Achievements</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
            {MOCK_ACHIEVEMENTS.map(ach => (
              <div key={ach.name} title={ach.name}
                className={cn("flex flex-col items-center gap-1 p-2 rounded-xl border transition-all",
                  ach.earned ? RARITY_COLORS[ach.rarity] : 'border-[#1e2a3a] opacity-30 grayscale')}>
                <span className="text-2xl">{ach.icon}</span>
                <span className="text-xs text-center leading-tight hidden sm:block">{ach.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl p-5">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-[#39FF14]" /> Recent Activity</h3>
          <div className="space-y-2">
            {MOCK_HISTORY.map((h, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#080c12] rounded-lg">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0",
                  h.result.includes('WON') ? 'bg-[#39FF14]/20 text-[#39FF14]' : 'bg-[#1e2a3a] text-[#4a5568]')}>
                  {h.result.includes('WON') ? 'W' : h.result.split(' ')[1] || '%'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{h.contest}</div>
                  <div className="text-[#4a5568] text-xs">{h.event} · Score: {h.score}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  {h.prize > 0 ? (
                    <span className="text-[#39FF14] text-sm font-bold">+{formatCurrency(h.prize)}</span>
                  ) : (
                    <span className="text-[#4a5568] text-sm">{h.result}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
