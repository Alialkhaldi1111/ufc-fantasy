'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Wallet, Trophy, Target, TrendingUp, Zap, Flame, Clock, ChevronRight, Star } from 'lucide-react';
import { mockUser } from '@/data/mockUser';
import { events } from '@/data/events';
import { fighters } from '@/data/fighters';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const neonGlow = '0 0 12px rgba(57,255,20,0.4)';

function StatCard({ icon, label, value, sub, color = '#39FF14' }: {
  icon: React.ReactNode; label: string; value: string; sub?: string; color?: string;
}) {
  return (
    <motion.div variants={fadeInUp} className="rounded-2xl border border-[#1e2a3a] bg-[#0a0f1a] p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
          <span style={{ color }}>{icon}</span>
        </div>
      </div>
      <p className="text-2xl font-black text-white mb-1" style={{ textShadow: `0 0 10px ${color}30` }}>{value}</p>
      <p className="text-sm font-semibold text-white">{label}</p>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </motion.div>
  );
}

const leaderboard = [
  { rank: 1, name: 'DragonFist99', pts: 4820, trend: 'up' },
  { rank: 2, name: 'OctaKing', pts: 4715, trend: 'up' },
  { rank: 3, name: 'CageMaster', pts: 4690, trend: 'down' },
  { rank: 4, name: 'alexchampion', pts: 4540, trend: 'up', isMe: true },
  { rank: 5, name: 'TapOrSnap', pts: 4410, trend: 'down' },
];

const activeContests = [
  { name: 'UFC 310 Mega Contest', event: 'UFC 310', rank: 142, total: 18420, pts: 87.4, prize: '$500,000' },
  { name: 'Saturday Night Brawl', event: 'UFC 310', rank: 8, total: 100, pts: 91.2, prize: '$1,000' },
];

export default function DashboardPage() {
  const upcomingEvt = events.filter((e) => e.status === 'UPCOMING').slice(0, 2);
  const winRate = Math.round((mockUser.contestWins / mockUser.totalContests) * 100);

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8">
      {/* Welcome banner */}
      <motion.div
        variants={fadeInUp}
        className="rounded-2xl border border-[#39FF14]/30 bg-gradient-to-r from-[#39FF14]/10 to-[#00d4ff]/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ boxShadow: '0 0 30px rgba(57,255,20,0.06)' }}
      >
        <div>
          <h1 className="text-2xl font-black text-white">
            Welcome back, {mockUser.displayName} 🔥
          </h1>
          <p className="text-gray-400 mt-1">
            You&apos;re on a <span className="text-[#39FF14] font-bold">{mockUser.streakDays}-day streak</span>. Keep it up!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-orange-500/40 bg-orange-500/10 px-4 py-2">
            <Flame className="h-4 w-4 text-orange-400" />
            <span className="text-sm font-bold text-orange-400">{mockUser.streakDays} Day Streak</span>
          </div>
          <Link href="/lineup" className="px-4 py-2 rounded-xl bg-[#39FF14] text-[#080c12] text-sm font-bold hover:bg-[#39FF14]/90 transition-all" style={{ boxShadow: neonGlow }}>
            Build Lineup
          </Link>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div>
        <motion.h2 variants={fadeInUp} className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Your Stats</motion.h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<Wallet className="h-5 w-5" />} label="Balance" value={`$${mockUser.balance.toFixed(2)}`} sub="Available to withdraw" />
          <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Total Winnings" value={`$${mockUser.totalWinnings.toLocaleString()}`} sub="Lifetime earnings" color="#00d4ff" />
          <StatCard icon={<Trophy className="h-5 w-5" />} label="Contest Wins" value={`${mockUser.contestWins}`} sub={`of ${mockUser.totalContests} total`} color="#f59e0b" />
          <StatCard icon={<Target className="h-5 w-5" />} label="Win Rate" value={`${winRate}%`} sub="Season average" color="#a855f7" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Contests */}
        <motion.div variants={fadeInUp} className="lg:col-span-2 rounded-2xl border border-[#1e2a3a] bg-[#0a0f1a] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-white">Active Contests</h2>
            <Link href="/contests" className="text-xs text-[#39FF14] hover:underline flex items-center gap-1">
              View All <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {activeContests.map((c) => (
              <div key={c.name} className="rounded-xl border border-[#1e2a3a] bg-[#0f1520] p-4 flex items-center gap-4">
                <div className="flex-shrink-0 text-center">
                  <p className="text-2xl font-black text-[#39FF14]">#{c.rank}</p>
                  <p className="text-[10px] text-gray-500">of {c.total.toLocaleString()}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-white truncate">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.event}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-[#1e2a3a]">
                      <div className="h-full rounded-full bg-[#39FF14]" style={{ width: `${Math.min(100, (c.rank / c.total) * 100 * 10)}%`, boxShadow: neonGlow }} />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#39FF14] text-sm">{c.pts} pts</p>
                  <p className="text-xs text-gray-500">Prize: {c.prize}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard preview */}
        <motion.div variants={fadeInUp} className="rounded-2xl border border-[#1e2a3a] bg-[#0a0f1a] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-white">Leaderboard</h2>
            <Link href="/leaderboard" className="text-xs text-[#39FF14] hover:underline flex items-center gap-1">
              Full Rankings <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${
                  entry.isMe ? 'bg-[#39FF14]/10 border border-[#39FF14]/30' : 'bg-[#0f1520]'
                }`}
              >
                <span className={`text-sm font-black w-6 text-center ${
                  entry.rank === 1 ? 'text-yellow-400' : entry.rank === 2 ? 'text-gray-400' : entry.rank === 3 ? 'text-amber-600' : 'text-gray-600'
                }`}>
                  {entry.rank === 1 ? '👑' : `#${entry.rank}`}
                </span>
                <div className="h-7 w-7 rounded-full bg-[#39FF14]/20 border border-[#39FF14]/30 flex items-center justify-center text-[10px] font-bold text-[#39FF14]">
                  {entry.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold truncate ${entry.isMe ? 'text-[#39FF14]' : 'text-white'}`}>
                    {entry.name} {entry.isMe && '(You)'}
                  </p>
                </div>
                <span className="text-xs text-gray-400 font-mono">{entry.pts.toLocaleString()}</span>
                <span className={`text-xs ${entry.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {entry.trend === 'up' ? '↑' : '↓'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <motion.div variants={fadeInUp} className="rounded-2xl border border-[#1e2a3a] bg-[#0a0f1a] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-white">Upcoming Events</h2>
            <Link href="/events" className="text-xs text-[#39FF14] hover:underline flex items-center gap-1">
              All Events <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingEvt.map((evt) => (
              <Link key={evt.id} href={`/events/${evt.id}`} className="block rounded-xl border border-[#1e2a3a] bg-[#0f1520] p-4 hover:border-[#39FF14]/40 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-sm text-white">{evt.shortName || evt.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{evt.venue}, {evt.city}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-[#39FF14] font-semibold">
                      {new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-[10px] text-gray-500">{evt.mainCardTime}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  {evt.broadcasters.map((b) => (
                    <span key={b} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1e2a3a] text-gray-400">{b}</span>
                  ))}
                  <span className="ml-auto text-xs text-gray-500">{evt.fights?.length || 0} fights</span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Daily Challenge + AI Lineup */}
        <div className="space-y-4">
          {/* Daily Challenge */}
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-[#39FF14]/30 bg-[#39FF14]/5 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-[#39FF14]/20 flex items-center justify-center">
                <Zap className="h-5 w-5 text-[#39FF14]" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Daily Challenge</p>
                <p className="text-xs text-gray-400">Resets in 14h 32m</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-[#39FF14] font-bold">+50 XP</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Pick the winner of tonight&apos;s main event: <span className="font-semibold text-white">Makhachev vs. Moicano</span>
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button className="py-2.5 rounded-xl border border-[#1e2a3a] bg-[#0f1520] text-sm font-semibold text-white hover:border-[#39FF14]/40 hover:bg-[#39FF14]/5 transition-all">
                Islam Makhachev
              </button>
              <button className="py-2.5 rounded-xl border border-[#1e2a3a] bg-[#0f1520] text-sm font-semibold text-white hover:border-[#39FF14]/40 hover:bg-[#39FF14]/5 transition-all">
                Renato Moicano
              </button>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Progress: 2 / 5 challenges</span>
                <span>40%</span>
              </div>
              <div className="h-2 rounded-full bg-[#1e2a3a]">
                <div className="h-full w-[40%] rounded-full bg-[#39FF14]" style={{ boxShadow: neonGlow }} />
              </div>
            </div>
          </motion.div>

          {/* AI Recommended Lineup */}
          <motion.div variants={fadeInUp} className="rounded-2xl border border-[#1e2a3a] bg-[#0a0f1a] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-[#39FF14]" />
                <p className="font-bold text-white text-sm">AI Recommended Lineup</p>
              </div>
              <span className="text-[10px] font-semibold bg-[#39FF14]/20 text-[#39FF14] px-2 py-0.5 rounded-full">BETA</span>
            </div>
            <div className="space-y-2 mb-4">
              {fighters.slice(0, 4).map((f) => (
                <div key={f.id} className="flex items-center gap-2 text-xs">
                  <div className="h-6 w-6 rounded-full bg-[#39FF14]/20 flex items-center justify-center text-[8px] font-bold text-[#39FF14]">
                    {f.name.slice(0,2)}
                  </div>
                  <span className="flex-1 text-gray-300 truncate">{f.name}</span>
                  <span className="text-[#39FF14] font-semibold">{f.projectedPoints} pts</span>
                  <span className="text-gray-500">${(f.salary/1000).toFixed(1)}k</span>
                </div>
              ))}
            </div>
            <Link href="/lineup" className="block text-center py-2.5 rounded-xl border border-[#39FF14]/30 bg-[#39FF14]/10 text-[#39FF14] text-sm font-semibold hover:bg-[#39FF14]/20 transition-all">
              Use This Lineup
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
