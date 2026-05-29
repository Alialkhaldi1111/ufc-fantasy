'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Filter, Zap, TrendingUp, Users } from 'lucide-react';
import { fighters } from '@/data/fighters';
import { cn, formatSalary } from '@/lib/utils';

const WEIGHT_CLASSES = [
  { value: 'All', label: 'All' },
  { value: 'Heavyweight', label: 'HW' },
  { value: 'Light Heavyweight', label: 'LHW' },
  { value: 'Middleweight', label: 'MW' },
  { value: 'Welterweight', label: 'WW' },
  { value: 'Lightweight', label: 'LW' },
  { value: 'Featherweight', label: 'FW' },
  { value: 'Bantamweight', label: 'BW' },
  { value: 'Flyweight', label: 'FLW' },
  { value: "Women's Strawweight", label: 'W-SW' },
  { value: "Women's Flyweight", label: 'W-FLW' },
];

const SORT_OPTIONS = [
  { value: 'projectedPoints', label: 'Proj Pts' },
  { value: 'salary', label: 'Salary' },
  { value: 'ownership', label: 'Ownership' },
  { value: 'avgFantasyPoints', label: 'Avg Pts' },
];

export default function FightersPage() {
  const [search, setSearch] = useState('');
  const [wc, setWc] = useState('All');
  const [sortBy, setSortBy] = useState('projectedPoints');
  const [page, setPage] = useState(1);
  const PER_PAGE = 24;

  const filtered = useMemo(() => {
    return fighters
      .filter(f => {
        if (wc !== 'All' && f.weightClass !== wc) return false;
        if (search && !f.name.toLowerCase().includes(search.toLowerCase()) &&
            !(f.nickname?.toLowerCase().includes(search.toLowerCase()))) return false;
        return true;
      })
      .sort((a, b) => (b[sortBy as keyof typeof b] as number) - (a[sortBy as keyof typeof a] as number));
  }, [search, wc, sortBy]);

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className="min-h-screen bg-[#080c12] pb-24 lg:pb-8">
      <div className="px-4 pt-6 pb-4 lg:px-8">
        <h1 className="text-2xl font-bold text-white">Fighter Database</h1>
        <p className="text-[#4a5568] text-sm mt-1">{fighters.length} active UFC fighters</p>
      </div>

      {/* Filters */}
      <div className="px-4 lg:px-8 space-y-3 mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568]" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search fighter name or nickname..."
              className="w-full bg-[#0f1520] border border-[#1e2a3a] rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:border-[#39FF14] transition-colors"
            />
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-[#0f1520] border border-[#1e2a3a] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#39FF14]"
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="flex gap-2 flex-wrap">
          {WEIGHT_CLASSES.map(w => (
            <button key={w.value} onClick={() => { setWc(w.value); setPage(1); }}
              className={cn("px-3 py-1 rounded-full text-xs font-medium transition-all",
                wc === w.value ? 'bg-[#39FF14] text-[#080c12]' : 'bg-[#0f1520] border border-[#1e2a3a] text-[#4a5568] hover:border-[#39FF14]/50')}>
              {w.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-[#4a5568]">{filtered.length} fighters found</p>
      </div>

      {/* Grid */}
      <div className="px-4 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginated.map((fighter, i) => (
          <motion.div
            key={fighter.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
          >
            <Link href={`/fighters/${fighter.id}`}>
              <div className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl p-4 hover:border-[#39FF14]/30 transition-all hover:shadow-[0_0_20px_rgba(57,255,20,0.05)] group cursor-pointer">
                {/* Avatar */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#39FF14]/10 flex items-center justify-center text-lg font-bold text-[#39FF14] border border-[#39FF14]/20 group-hover:border-[#39FF14]/50 transition-all flex-shrink-0">
                    {fighter.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-white text-sm leading-tight group-hover:text-[#39FF14] transition-colors truncate">{fighter.name}</div>
                    {fighter.nickname && <div className="text-[#4a5568] text-xs truncate">"{fighter.nickname}"</div>}
                    <div className="text-[#4a5568] text-xs mt-0.5">{fighter.record}</div>
                  </div>
                </div>

                {/* Weight class + ranking */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-[#1e2a3a] text-[#39FF14] text-xs rounded-full font-medium">
                    {fighter.weightClass.replace("Women's ", "W-")}
                  </span>
                  {fighter.ranking && (
                    <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-400 text-xs rounded-full">#{fighter.ranking}</span>
                  )}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center">
                    <div className="text-[#4a5568] text-xs">Salary</div>
                    <div className="text-white text-xs font-semibold">{formatSalary(fighter.salary)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#4a5568] text-xs">Proj</div>
                    <div className="text-yellow-400 text-xs font-semibold flex items-center justify-center gap-0.5">
                      <Zap size={10} />{fighter.projectedPoints}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#4a5568] text-xs">Own%</div>
                    <div className="text-[#4a5568] text-xs flex items-center justify-center gap-0.5">
                      <Users size={10} />{fighter.ownership}%
                    </div>
                  </div>
                </div>

                {/* Finish rates */}
                <div className="flex gap-1.5">
                  <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-xs rounded">KO {fighter.knockoutPct}%</span>
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs rounded">Sub {fighter.submissionPct}%</span>
                  <span className="px-2 py-0.5 bg-[#1e2a3a] text-[#4a5568] text-xs rounded">Dec {fighter.decisionPct}%</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8 px-4">
          <button onClick={() => setPage(p => p + 1)}
            className="px-8 py-3 bg-[#0f1520] border border-[#1e2a3a] text-white rounded-xl hover:border-[#39FF14]/50 transition-all text-sm font-medium">
            Load More ({filtered.length - paginated.length} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
