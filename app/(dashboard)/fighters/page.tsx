'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, Users, X, TrendingUp, Shield, Target } from 'lucide-react';
import { fighters } from '@/data/fighters';
import { events } from '@/data/events';
import { useLineupStore } from '@/store/useLineupStore';
import { useEventStore } from '@/store/useEventStore';
import { cn, formatSalary } from '@/lib/utils';
import type { Fighter } from '@/types';

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

function StatBar({ label, value, color = '#39FF14' }: { label: string; value: number; color?: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-500">{label}</span>
        <span className="text-white font-semibold">{value}%</span>
      </div>
      <div className="h-1.5 bg-[#1e2a3a] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function FighterDrawer({ fighter, onClose }: { fighter: Fighter; onClose: () => void }) {
  const { addFighter, removeFighter, isSelected, canAddFighter } = useLineupStore();
  const { getPredictionStats } = useEventStore();
  const selected = isSelected(fighter.id);

  // Find recent fights
  const recentFights = useMemo(() => {
    const matches: { opponent: string; result: string; method: string; event: string; date: string }[] = [];
    for (const event of events) {
      for (const fight of event.fights || []) {
        if (fight.fighterA.id === fighter.id || fight.fighterB.id === fighter.id) {
          if (fight.status === 'completed') {
            const isA = fight.fighterA.id === fighter.id;
            const opponent = isA ? fight.fighterB.name : fight.fighterA.name;
            const won = fight.winnerId === fighter.id;
            matches.push({
              opponent,
              result: fight.winnerId ? (won ? 'W' : 'L') : 'D',
              method: fight.finishMethod || 'Decision',
              event: event.shortName || event.name,
              date: new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
            });
          }
        }
      }
    }
    return matches.slice(0, 5);
  }, [fighter.id]);

  // Find upcoming fight for prediction bar
  const upcomingFight = useMemo(() => {
    for (const event of events) {
      if (event.status !== 'UPCOMING') continue;
      for (const fight of event.fights || []) {
        if (fight.fighterA.id === fighter.id || fight.fighterB.id === fighter.id) {
          return fight;
        }
      }
    }
    return null;
  }, [fighter.id]);

  const predStats = upcomingFight
    ? getPredictionStats(upcomingFight.id, upcomingFight.fighterA.id, upcomingFight.fighterB.id)
    : null;
  const isA = upcomingFight?.fighterA.id === fighter.id;
  const myPredPct = predStats ? (isA ? predStats.aPercent : predStats.bPercent) : null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-[#0f1520] border-l border-[#1e2a3a] z-50 overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#0f1520] border-b border-[#1e2a3a] px-5 py-4 flex items-center justify-between z-10">
          <h2 className="font-bold text-white">Fighter Profile</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-[#1e2a3a] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Avatar + bio */}
          <div className="flex gap-4 items-start">
            <div className="w-20 h-20 rounded-2xl bg-[#39FF14]/10 border-2 border-[#39FF14]/30 flex items-center justify-center text-2xl font-black text-[#39FF14] flex-shrink-0">
              {fighter.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h3 className="text-xl font-black text-white leading-tight">{fighter.name}</h3>
              {fighter.nickname && <p className="text-sm text-gray-400 italic">&ldquo;{fighter.nickname}&rdquo;</p>}
              <p className="text-[#39FF14] font-bold text-lg mt-1">{fighter.record}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-400 text-sm">{fighter.countryFlag} {fighter.nationality}</span>
              </div>
              <span className="inline-block mt-1 px-2 py-0.5 bg-[#1e2a3a] text-[#39FF14] text-xs rounded-full">{fighter.weightClass}</span>
            </div>
          </div>

          {/* Physical stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Height', value: fighter.height },
              { label: 'Weight', value: fighter.weight },
              { label: 'Reach', value: fighter.reach },
              { label: 'Stance', value: fighter.stance },
              { label: 'Age', value: fighter.age ? `${fighter.age}` : '—' },
              { label: 'Salary', value: formatSalary(fighter.salary) },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#080c12] rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-sm font-bold text-white">{value || '—'}</p>
              </div>
            ))}
          </div>

          {/* Finish breakdown */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Finish Breakdown</p>
            <div className="flex gap-2">
              <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">KO/TKO</p>
                <p className="text-xl font-black text-red-400">{fighter.knockoutPct}%</p>
              </div>
              <div className="flex-1 bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Submission</p>
                <p className="text-xl font-black text-blue-400">{fighter.submissionPct}%</p>
              </div>
              <div className="flex-1 bg-[#1e2a3a] border border-[#1e2a3a] rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Decision</p>
                <p className="text-xl font-black text-gray-400">{fighter.decisionPct}%</p>
              </div>
            </div>
          </div>

          {/* Stat bars */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Fighter Stats</p>
            <div className="space-y-3">
              <StatBar label="Strike Accuracy" value={fighter.strikeAccuracy} color="#39FF14" />
              <StatBar label="Strike Defense" value={fighter.strikeDefense} color="#00d4ff" />
              <StatBar label="Takedown Accuracy" value={fighter.takedownAccuracy} color="#a78bfa" />
              <StatBar label="Takedown Defense" value={fighter.takedownDefense} color="#fb923c" />
            </div>
          </div>

          {/* Per fight stats */}
          {fighter.perFightStats && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Per Fight Averages</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Sig. Strikes', value: fighter.perFightStats.sigStrikes, icon: Target },
                  { label: 'Takedowns', value: fighter.perFightStats.takedowns, icon: Shield },
                  { label: 'Knockdowns', value: fighter.perFightStats.knockdowns, icon: Zap },
                  { label: 'Sub Attempts', value: fighter.perFightStats.submissionAttempts, icon: TrendingUp },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-[#080c12] rounded-xl p-3 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#39FF14] flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="text-sm font-bold text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Community prediction */}
          {upcomingFight && myPredPct !== null && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Community Prediction</p>
              <div className="bg-[#080c12] rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-2">
                  {upcomingFight.fighterA.name} vs {upcomingFight.fighterB.name}
                </p>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#39FF14] font-semibold">{isA ? myPredPct : predStats!.aPercent}% {upcomingFight.fighterA.name.split(' ').slice(-1)[0]}</span>
                  <span className="text-blue-400 font-semibold">{upcomingFight.fighterB.name.split(' ').slice(-1)[0]} {isA ? predStats!.bPercent : myPredPct}%</span>
                </div>
                <div className="h-2 bg-[#1e2a3a] rounded-full overflow-hidden flex">
                  <div className="bg-[#39FF14]" style={{ width: `${predStats!.aPercent}%` }} />
                  <div className="bg-blue-400 flex-1" />
                </div>
                {predStats!.total === 0 && <p className="text-xs text-gray-600 mt-2 text-center">No picks yet — be the first!</p>}
              </div>
            </div>
          )}

          {/* Recent fights */}
          {recentFights.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Recent Fight History</p>
              <div className="space-y-2">
                {recentFights.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#080c12] rounded-xl p-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${f.result === 'W' ? 'bg-green-500/20 text-green-400' : f.result === 'L' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {f.result}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-semibold truncate">vs {f.opponent}</p>
                      <p className="text-xs text-gray-500">{f.method} · {f.event}</p>
                    </div>
                    <span className="text-xs text-gray-600 flex-shrink-0">{f.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fantasy value */}
          <div className="bg-gradient-to-br from-[#39FF14]/5 to-[#00d4ff]/3 border border-[#39FF14]/20 rounded-xl p-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs text-gray-500">Salary</p>
                <p className="text-base font-black text-white">{formatSalary(fighter.salary)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Proj Pts</p>
                <p className="text-base font-black text-[#39FF14]">{fighter.projectedPoints}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1"><Users className="w-3 h-3" />Own%</p>
                <p className="text-base font-black text-gray-300">{fighter.ownership}%</p>
              </div>
            </div>
          </div>

          {/* Add to lineup */}
          <button
            onClick={() => selected ? removeFighter(fighter.id) : addFighter(fighter)}
            disabled={!selected && !canAddFighter(fighter)}
            className={cn(
              'w-full py-4 rounded-2xl font-bold text-base transition-all',
              selected
                ? 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20'
                : canAddFighter(fighter)
                ? 'bg-[#39FF14] text-[#080c12] hover:brightness-110'
                : 'bg-[#1e2a3a] text-gray-500 cursor-not-allowed'
            )}
            style={selected || !canAddFighter(fighter) ? {} : { boxShadow: '0 0 20px rgba(57,255,20,0.4)' }}
          >
            {selected ? 'Remove from Lineup' : canAddFighter(fighter) ? 'Add to Lineup' : 'Lineup Full / Over Cap'}
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default function FightersPage() {
  const [search, setSearch] = useState('');
  const [wc, setWc] = useState('All');
  const [sortBy, setSortBy] = useState('projectedPoints');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Fighter | null>(null);
  const PER_PAGE = 24;

  const filtered = useMemo(() => {
    return fighters
      .filter((f) => {
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
        <p className="text-[#4a5568] text-sm mt-1">{fighters.length} active UFC fighters · tap any card to research</p>
      </div>

      {/* Filters */}
      <div className="px-4 lg:px-8 space-y-3 mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568]" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search fighter name or nickname..."
              className="w-full bg-[#0f1520] border border-[#1e2a3a] rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:border-[#39FF14] transition-colors"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#0f1520] border border-[#1e2a3a] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#39FF14]"
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="flex gap-2 flex-wrap">
          {WEIGHT_CLASSES.map((w) => (
            <button
              key={w.value}
              onClick={() => { setWc(w.value); setPage(1); }}
              className={cn('px-3 py-1 rounded-full text-xs font-medium transition-all',
                wc === w.value ? 'bg-[#39FF14] text-[#080c12]' : 'bg-[#0f1520] border border-[#1e2a3a] text-[#4a5568] hover:border-[#39FF14]/50')}
            >
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
            <button onClick={() => setSelected(fighter)} className="w-full text-left">
              <div className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl p-4 hover:border-[#39FF14]/30 transition-all hover:shadow-[0_0_20px_rgba(57,255,20,0.05)] group cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#39FF14]/10 flex items-center justify-center text-lg font-bold text-[#39FF14] border border-[#39FF14]/20 group-hover:border-[#39FF14]/50 transition-all flex-shrink-0">
                    {fighter.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-white text-sm leading-tight group-hover:text-[#39FF14] transition-colors truncate">{fighter.name}</div>
                    {fighter.nickname && <div className="text-[#4a5568] text-xs truncate">&ldquo;{fighter.nickname}&rdquo;</div>}
                    <div className="text-[#4a5568] text-xs mt-0.5">{fighter.record}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-[#1e2a3a] text-[#39FF14] text-xs rounded-full font-medium">
                    {fighter.weightClass.replace("Women's ", 'W-')}
                  </span>
                  {fighter.ranking && <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-400 text-xs rounded-full">#{fighter.ranking}</span>}
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center">
                    <div className="text-[#4a5568] text-xs">Salary</div>
                    <div className="text-white text-xs font-semibold">{formatSalary(fighter.salary)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#4a5568] text-xs">Proj</div>
                    <div className="text-yellow-400 text-xs font-semibold flex items-center justify-center gap-0.5"><Zap size={10} />{fighter.projectedPoints}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#4a5568] text-xs">Own%</div>
                    <div className="text-[#4a5568] text-xs flex items-center justify-center gap-0.5"><Users size={10} />{fighter.ownership}%</div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-xs rounded">KO {fighter.knockoutPct}%</span>
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs rounded">Sub {fighter.submissionPct}%</span>
                  <span className="px-2 py-0.5 bg-[#1e2a3a] text-[#4a5568] text-xs rounded">Dec {fighter.decisionPct}%</span>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8 px-4">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-8 py-3 bg-[#0f1520] border border-[#1e2a3a] text-white rounded-xl hover:border-[#39FF14]/50 transition-all text-sm font-medium"
          >
            Load More ({filtered.length - paginated.length} remaining)
          </button>
        </div>
      )}

      {/* Research Drawer */}
      <AnimatePresence>
        {selected && <FighterDrawer fighter={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
