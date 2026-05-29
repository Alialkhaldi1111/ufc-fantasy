'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trophy, Users, Zap, Lock, Globe, Swords, Star } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

const MOCK_CONTESTS = [
  { id: '1', name: 'UFC 315 Grand Slam — $10K GTD', event: 'UFC 315', type: 'GPP', status: 'Open', entryFee: 10, prizePool: 10000, entries: 247, maxEntries: 1000, isGuaranteed: true, isFeatured: true },
  { id: '2', name: 'Free Roll — No Entry Fee', event: 'UFC 315', type: 'Free', status: 'Open', entryFee: 0, prizePool: 500, entries: 892, maxEntries: 2000, isGuaranteed: true, isFeatured: false },
  { id: '3', name: 'Head-to-Head Showdown', event: 'UFC 315', type: 'H2H', status: 'Open', entryFee: 5, prizePool: 9, entries: 1, maxEntries: 2, isGuaranteed: false, isFeatured: false },
  { id: '4', name: 'Champion League $50 Buy-In', event: 'UFC 315', type: 'GPP', status: 'Open', entryFee: 50, prizePool: 5000, entries: 78, maxEntries: 150, isGuaranteed: true, isFeatured: false },
  { id: '5', name: 'Tournament of Champions', event: 'UFC 315', type: 'Tournament', status: 'Open', entryFee: 25, prizePool: 2500, entries: 54, maxEntries: 64, isGuaranteed: false, isFeatured: false },
  { id: '6', name: 'H2H Quick Match $10', event: 'UFC 315', type: 'H2H', status: 'Open', entryFee: 10, prizePool: 18, entries: 0, maxEntries: 2, isGuaranteed: false, isFeatured: false },
  { id: '7', name: 'UFC 316 Early Bird Special', event: 'UFC 316', type: 'GPP', status: 'Upcoming', entryFee: 5, prizePool: 1000, entries: 34, maxEntries: 500, isGuaranteed: false, isFeatured: false },
  { id: '8', name: 'VIP Elite — $100 Entry', event: 'UFC 315', type: 'GPP', status: 'Open', entryFee: 100, prizePool: 25000, entries: 183, maxEntries: 300, isGuaranteed: true, isFeatured: false },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  'GPP': <Globe size={12} />,
  'H2H': <Swords size={12} />,
  'Tournament': <Trophy size={12} />,
  'Free': <Star size={12} />,
};

const TYPE_COLORS: Record<string, string> = {
  'GPP': 'text-blue-400 bg-blue-500/10',
  'H2H': 'text-purple-400 bg-purple-500/10',
  'Tournament': 'text-yellow-400 bg-yellow-500/10',
  'Free': 'text-[#39FF14] bg-[#39FF14]/10',
};

const TABS = ['All', 'Free', 'Paid', 'Head-to-Head', 'My Contests'];

export default function ContestsPage() {
  const [tab, setTab] = useState('All');

  const filtered = MOCK_CONTESTS.filter(c => {
    if (tab === 'Free') return c.entryFee === 0;
    if (tab === 'Paid') return c.entryFee > 0;
    if (tab === 'Head-to-Head') return c.type === 'H2H';
    if (tab === 'My Contests') return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#080c12] pb-24 lg:pb-8">
      <div className="px-4 pt-6 pb-4 lg:px-8">
        <h1 className="text-2xl font-bold text-white">Contests</h1>
        <p className="text-[#4a5568] text-sm mt-1">{MOCK_CONTESTS.length} active contests</p>
      </div>

      {/* Featured Banner */}
      <div className="px-4 lg:px-8 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-[#0f2010] to-[#0f1520] rounded-2xl border border-[#39FF14]/30 p-6 overflow-hidden"
          style={{ boxShadow: '0 0 40px rgba(57,255,20,0.08)' }}
        >
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-[#39FF14] text-[#080c12] text-xs font-bold rounded-full animate-pulse">FEATURED</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-[#39FF14] text-xs font-medium mb-1">UFC 315 · May 31, 2025</p>
              <h2 className="text-white text-xl font-black mb-1">UFC 315 Grand Slam</h2>
              <p className="text-[#4a5568] text-sm">Enter for just $10. 1st place takes home $3,000!</p>
              <div className="flex items-center gap-4 mt-3">
                <div>
                  <div className="text-[#4a5568] text-xs">Prize Pool</div>
                  <div className="text-[#39FF14] text-2xl font-black">$10,000</div>
                </div>
                <div>
                  <div className="text-[#4a5568] text-xs">Entries</div>
                  <div className="text-white text-lg font-bold">247 / 1,000</div>
                </div>
              </div>
            </div>
            <Link href="/lineup">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 bg-[#39FF14] text-[#080c12] font-black rounded-xl hover:bg-[#2acc10] transition-all whitespace-nowrap"
              >
                Enter — $10
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="px-4 lg:px-8 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                tab === t ? 'bg-[#39FF14] text-[#080c12]' : 'bg-[#0f1520] border border-[#1e2a3a] text-[#4a5568] hover:border-[#39FF14]/30')}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Contest Grid */}
      <div className="px-4 lg:px-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((contest, i) => {
          const pct = (contest.entries / contest.maxEntries) * 100;
          const isFull = pct >= 100;
          return (
            <motion.div
              key={contest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl p-5 hover:border-[#39FF14]/20 transition-all flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", TYPE_COLORS[contest.type] || 'text-[#4a5568] bg-[#1e2a3a]')}>
                      {TYPE_ICONS[contest.type]} {contest.type}
                    </span>
                    {contest.isGuaranteed && (
                      <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs rounded-full">GTD</span>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-sm leading-tight">{contest.name}</h3>
                  <p className="text-[#4a5568] text-xs mt-0.5">{contest.event}</p>
                </div>
              </div>

              {/* Prize */}
              <div className="mb-3">
                <div className="text-[#4a5568] text-xs">Prize Pool</div>
                <div className="text-[#39FF14] text-2xl font-black">{formatCurrency(contest.prizePool)}</div>
              </div>

              {/* Entries progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#4a5568]">{contest.entries.toLocaleString()} entered</span>
                  <span className="text-[#4a5568]">{contest.maxEntries.toLocaleString()} max</span>
                </div>
                <div className="h-1.5 bg-[#1e2a3a] rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all", isFull ? 'bg-red-500' : pct > 75 ? 'bg-yellow-400' : 'bg-[#39FF14]')}
                    style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
              </div>

              <div className="mt-auto">
                <Link href="/lineup">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    disabled={isFull}
                    className={cn(
                      "w-full py-2.5 rounded-lg font-bold text-sm transition-all",
                      isFull
                        ? 'bg-[#1e2a3a] text-[#4a5568] cursor-not-allowed'
                        : contest.entryFee === 0
                        ? 'bg-[#39FF14] text-[#080c12] hover:bg-[#2acc10]'
                        : 'bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30 hover:bg-[#39FF14]/20'
                    )}
                  >
                    {isFull ? 'Contest Full' : contest.entryFee === 0 ? 'Enter Free →' : `Enter — $${contest.entryFee} →`}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-[#4a5568]">
            <Trophy size={40} className="mx-auto mb-3 opacity-30" />
            <p>No contests found in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
