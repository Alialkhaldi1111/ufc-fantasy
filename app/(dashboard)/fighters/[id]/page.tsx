'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Zap, Users, Target, Shield, TrendingUp, Trophy } from 'lucide-react';
import { fighters } from '@/data/fighters';
import { formatSalary, cn } from '@/lib/utils';
import { useLineupStore } from '@/store/useLineupStore';

function StatBar({ label, value, max = 100, color = '#39FF14' }: { label: string; value: number; max?: number; color?: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-[#4a5568]">{label}</span>
        <span className="text-xs text-white font-medium">{value}%</span>
      </div>
      <div className="h-1.5 bg-[#1e2a3a] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>
    </div>
  );
}

const MOCK_HISTORY = [
  { opponent: 'Ciryl Gane', result: 'W', method: 'Decision', round: 5, pts: 82 },
  { opponent: 'Stipe Miocic', result: 'W', method: 'KO/TKO', round: 3, pts: 145 },
  { opponent: 'Sergei Pavlovich', result: 'W', method: 'KO/TKO', round: 1, pts: 168 },
];

export default function FighterProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const fighter = fighters.find(f => f.id === id);
  const { addFighter, removeFighter, isSelected, canAddFighter } = useLineupStore();

  if (!fighter) {
    return (
      <div className="min-h-screen bg-[#080c12] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#4a5568] text-lg mb-4">Fighter not found</p>
          <Link href="/fighters" className="text-[#39FF14] hover:underline">← Back to Fighters</Link>
        </div>
      </div>
    );
  }

  const selected = isSelected(fighter.id);
  const addable = canAddFighter(fighter);

  return (
    <div className="min-h-screen bg-[#080c12] pb-24 lg:pb-8">
      {/* Back */}
      <div className="px-4 pt-4 lg:px-8">
        <Link href="/fighters" className="inline-flex items-center gap-2 text-[#4a5568] hover:text-white transition-colors text-sm">
          <ArrowLeft size={16} /> Back to Fighters
        </Link>
      </div>

      {/* Hero */}
      <div className="px-4 lg:px-8 mt-4">
        <div className="bg-[#0f1520] rounded-2xl border border-[#1e2a3a] overflow-hidden">
          <div className="bg-gradient-to-br from-[#39FF14]/5 to-transparent p-6 flex flex-col sm:flex-row gap-6">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center text-4xl sm:text-5xl font-black text-[#39FF14] flex-shrink-0 mx-auto sm:mx-0"
            >
              {fighter.name.split(' ').map(n => n[0]).join('').slice(0,2)}
            </motion.div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                {fighter.nickname && (
                  <p className="text-[#39FF14] text-sm mb-1">"{fighter.nickname}"</p>
                )}
                <h1 className="text-3xl font-black text-white mb-2">{fighter.name}</h1>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
                  <span className="px-3 py-1 bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20 rounded-full text-sm font-medium">{fighter.record}</span>
                  <span className="px-3 py-1 bg-[#1e2a3a] text-white rounded-full text-sm">{fighter.weightClass}</span>
                  {fighter.ranking && <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full text-sm">#{fighter.ranking} Ranked</span>}
                  <span className="px-3 py-1 bg-[#1e2a3a] text-[#4a5568] rounded-full text-sm">{fighter.nationality} {fighter.countryFlag}</span>
                </div>
                {/* Quick stats */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {[
                    { label: 'Height', value: fighter.height },
                    { label: 'Weight', value: fighter.weight },
                    { label: 'Reach', value: fighter.reach || 'N/A' },
                    { label: 'Stance', value: fighter.stance },
                    { label: 'Age', value: fighter.age?.toString() || 'N/A' },
                  ].map(s => (
                    <div key={s.label} className="text-center bg-[#080c12] rounded-lg p-2">
                      <div className="text-[#4a5568] text-xs">{s.label}</div>
                      <div className="text-white text-sm font-semibold mt-0.5">{s.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Charts & Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Fighting Style */}
          <div className="bg-[#0f1520] rounded-xl border border-[#1e2a3a] p-5">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2"><Target size={16} className="text-[#39FF14]" /> Fighting Style</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <StatBar label="Strike Accuracy" value={fighter.strikeAccuracy} />
              <StatBar label="Strike Defense" value={fighter.strikeDefense} />
              <StatBar label="Takedown Accuracy" value={fighter.takedownAccuracy} />
              <StatBar label="Takedown Defense" value={fighter.takedownDefense} />
            </div>
          </div>

          {/* Finish Rates */}
          <div className="bg-[#0f1520] rounded-xl border border-[#1e2a3a] p-5">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2"><Trophy size={16} className="text-[#39FF14]" /> Finish Rates</h2>
            <div className="space-y-3">
              <StatBar label="KO/TKO %" value={fighter.knockoutPct} color="#ef4444" />
              <StatBar label="Submission %" value={fighter.submissionPct} color="#3b82f6" />
              <StatBar label="Decision %" value={fighter.decisionPct} color="#6b7280" />
            </div>
          </div>

          {/* Fight History */}
          <div className="bg-[#0f1520] rounded-xl border border-[#1e2a3a] p-5">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-[#39FF14]" /> Recent Fights</h2>
            <div className="space-y-2">
              {MOCK_HISTORY.map((fight, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-[#080c12] rounded-lg">
                  <span className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                    fight.result === 'W' ? 'bg-[#39FF14]/20 text-[#39FF14]' : 'bg-red-500/20 text-red-400')}>
                    {fight.result}
                  </span>
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">vs. {fight.opponent}</div>
                    <div className="text-[#4a5568] text-xs">{fight.method} · R{fight.round}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 text-sm font-bold flex items-center gap-1"><Zap size={12} />{fight.pts}</div>
                    <div className="text-[#4a5568] text-xs">pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Fantasy Card */}
        <div className="space-y-4">
          {/* Fantasy Stats */}
          <div className="bg-[#0f1520] rounded-xl border border-[#1e2a3a] p-5">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2"><Zap size={16} className="text-[#39FF14]" /> Fantasy Stats</h2>
            <div className="space-y-3">
              {[
                { label: 'Salary', value: formatSalary(fighter.salary), highlight: true },
                { label: 'Projected Points', value: `${fighter.projectedPoints} pts`, highlight: true },
                { label: 'Avg Fantasy Points', value: `${fighter.avgFantasyPoints} pts` },
                { label: 'Ownership', value: `${fighter.ownership}%` },
                { label: 'Sig. Strikes/fight', value: fighter.significantStrikes.toFixed(1) },
                { label: 'Takedowns/fight', value: fighter.takedownsPerFight.toFixed(1) },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-center">
                  <span className="text-[#4a5568] text-sm">{stat.label}</span>
                  <span className={cn("text-sm font-semibold", stat.highlight ? 'text-[#39FF14]' : 'text-white')}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add to Lineup CTA */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => selected ? removeFighter(fighter.id) : addable ? addFighter(fighter) : undefined}
            className={cn(
              "w-full py-4 rounded-xl font-bold text-base transition-all",
              selected
                ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                : addable
                ? 'bg-[#39FF14] text-[#080c12] hover:bg-[#2acc10] shadow-[0_0_20px_rgba(57,255,20,0.3)]'
                : 'bg-[#1e2a3a] text-[#4a5568] cursor-not-allowed'
            )}
          >
            {selected ? '✕ Remove from Lineup' : addable ? '+ Add to Lineup' : 'Lineup Full or Over Cap'}
          </motion.button>

          <div className="flex items-center gap-2 text-xs text-[#4a5568]">
            <Users size={12} />
            <span>{fighter.ownership}% of lineups include this fighter</span>
          </div>
        </div>
      </div>
    </div>
  );
}
