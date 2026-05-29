'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Zap, Search, ChevronDown, Shuffle, Trash2, CheckCircle } from 'lucide-react';
import { fighters } from '@/data/fighters';
import { useLineupStore } from '@/store/useLineupStore';
import type { Fighter } from '@/types';
import { formatSalary, cn } from '@/lib/utils';
import { hapticTap, hapticSuccess, hapticError } from '@/lib/native';

const WEIGHT_CLASSES = ['All', 'HW', 'LHW', 'MW', 'WW', 'LW', 'FW', 'BW', 'FLW', 'W-SW', 'W-FLW'];

const WC_MAP: Record<string, string> = {
  'Heavyweight': 'HW', 'Light Heavyweight': 'LHW', 'Middleweight': 'MW',
  'Welterweight': 'WW', 'Lightweight': 'LW', 'Featherweight': 'FW',
  'Bantamweight': 'BW', 'Flyweight': 'FLW', "Women's Strawweight": 'W-SW',
  "Women's Flyweight": 'W-FLW', "Women's Bantamweight": 'W-BW',
};

export default function LineupPage() {
  const { selectedFighters, addFighter, removeFighter, clearLineup, isSelected, totalSalary, salaryCap, rosterSize } = useLineupStore();
  const [search, setSearch] = useState('');
  const [wcFilter, setWcFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'projectedPoints' | 'salary' | 'ownership'>('projectedPoints');
  const [submitted, setSubmitted] = useState(false);

  const remaining = salaryCap - totalSalary;
  const capPct = (totalSalary / salaryCap) * 100;
  const isFull = selectedFighters.length >= rosterSize;
  const isValid = selectedFighters.length === rosterSize;

  const filtered = useMemo(() => {
    return fighters
      .filter(f => {
        if (wcFilter !== 'All' && WC_MAP[f.weightClass] !== wcFilter) return false;
        if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => (b[sortBy] as number) - (a[sortBy] as number));
  }, [search, wcFilter, sortBy]);

  function handleSubmit() {
    if (!isValid) return;
    hapticSuccess();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  function handleAdd(fighter: Fighter, canAdd: boolean) {
    if (canAdd) {
      hapticTap();
      addFighter(fighter);
    } else {
      hapticError();
    }
  }

  return (
    <div className="min-h-screen bg-[#080c12] pb-24 lg:pb-8">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 lg:px-8">
        <h1 className="text-2xl font-bold text-white">Lineup Builder</h1>
        <p className="text-[#4a5568] text-sm mt-1">UFC 315 · May 31, 2025 · T-Mobile Arena</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-8">
        {/* LEFT: Lineup Panel */}
        <div className="lg:w-80 flex-shrink-0 space-y-4">
          {/* Salary Cap Bar */}
          <div className="bg-[#0f1520] rounded-xl border border-[#1e2a3a] p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#4a5568]">Salary Used</span>
              <span className={cn("text-sm font-bold", remaining < 5000 ? 'text-red-400' : remaining < 15000 ? 'text-yellow-400' : 'text-[#39FF14]')}>
                ${remaining.toLocaleString()} left
              </span>
            </div>
            <div className="h-2 bg-[#1e2a3a] rounded-full overflow-hidden">
              <motion.div
                className={cn("h-full rounded-full transition-colors", capPct > 90 ? 'bg-red-500' : capPct > 75 ? 'bg-yellow-400' : 'bg-[#39FF14]')}
                initial={{ width: 0 }}
                animate={{ width: `${capPct}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-[#4a5568]">${totalSalary.toLocaleString()}</span>
              <span className="text-xs text-[#4a5568]">${salaryCap.toLocaleString()} cap</span>
            </div>
          </div>

          {/* Roster Slots */}
          <div className="bg-[#0f1520] rounded-xl border border-[#1e2a3a] p-4 space-y-2">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-white">Your Roster ({selectedFighters.length}/{rosterSize})</h3>
              {selectedFighters.length > 0 && (
                <button onClick={clearLineup} className="text-xs text-[#4a5568] hover:text-red-400 flex items-center gap-1 transition-colors">
                  <Trash2 size={12} /> Clear
                </button>
              )}
            </div>

            {Array.from({ length: rosterSize }).map((_, i) => {
              const fighter = selectedFighters[i];
              return (
                <AnimatePresence key={i} mode="popLayout">
                  {fighter ? (
                    <motion.div
                      key={fighter.id}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-3 bg-[#141d2e] rounded-lg p-2.5 border border-[#39FF14]/20"
                    >
                      <div className="w-9 h-9 rounded-full bg-[#39FF14]/10 flex items-center justify-center text-xs font-bold text-[#39FF14] flex-shrink-0">
                        {fighter.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{fighter.name}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-[#4a5568]">{WC_MAP[fighter.weightClass] || fighter.weightClass}</span>
                          <span className="text-xs text-[#39FF14]">{formatSalary(fighter.salary)}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-1 text-xs text-yellow-400">
                          <Zap size={10} />{fighter.projectedPoints}
                        </div>
                        <button onClick={() => removeFighter(fighter.id)} className="text-[#4a5568] hover:text-red-400 mt-0.5 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`empty-${i}`}
                      className="flex items-center gap-3 border border-dashed border-[#1e2a3a] rounded-lg p-2.5"
                    >
                      <div className="w-9 h-9 rounded-full border border-dashed border-[#1e2a3a] flex items-center justify-center flex-shrink-0">
                        <Plus size={14} className="text-[#4a5568]" />
                      </div>
                      <span className="text-sm text-[#4a5568]">Select Fighter</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </div>

          {/* Totals */}
          <div className="bg-[#0f1520] rounded-xl border border-[#1e2a3a] p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#4a5568]">Total Projected</span>
              <span className="text-[#39FF14] font-bold flex items-center gap-1">
                <Zap size={14} />{selectedFighters.reduce((s, f) => s + f.projectedPoints, 0).toFixed(1)} pts
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={!isValid}
              className={cn(
                "w-full py-3 rounded-xl font-bold text-sm transition-all",
                isValid
                  ? 'bg-[#39FF14] text-[#080c12] hover:bg-[#2acc10] shadow-[0_0_20px_rgba(57,255,20,0.4)]'
                  : 'bg-[#1e2a3a] text-[#4a5568] cursor-not-allowed'
              )}
            >
              {submitted ? '✓ Lineup Submitted!' : isValid ? 'Submit Lineup' : `Add ${rosterSize - selectedFighters.length} More Fighter${rosterSize - selectedFighters.length !== 1 ? 's' : ''}`}
            </motion.button>
          </div>
        </div>

        {/* RIGHT: Fighter Pool */}
        <div className="flex-1 min-w-0">
          {/* Filters */}
          <div className="bg-[#0f1520] rounded-xl border border-[#1e2a3a] p-4 mb-4 space-y-3">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568]" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search fighters..."
                  className="w-full bg-[#080c12] border border-[#1e2a3a] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:border-[#39FF14] transition-colors"
                />
              </div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="bg-[#080c12] border border-[#1e2a3a] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#39FF14] transition-colors"
              >
                <option value="projectedPoints">Proj Pts</option>
                <option value="salary">Salary</option>
                <option value="ownership">Ownership</option>
              </select>
            </div>
            <div className="flex gap-2 flex-wrap">
              {WEIGHT_CLASSES.map(wc => (
                <button
                  key={wc}
                  onClick={() => setWcFilter(wc)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium transition-all",
                    wcFilter === wc
                      ? 'bg-[#39FF14] text-[#080c12]'
                      : 'bg-[#080c12] border border-[#1e2a3a] text-[#4a5568] hover:border-[#39FF14]/50'
                  )}
                >
                  {wc}
                </button>
              ))}
            </div>
          </div>

          {/* Fighter List */}
          <div className="space-y-2">
            {filtered.map((fighter, i) => {
              const selected = isSelected(fighter.id);
              const canAdd = !selected && !isFull && fighter.salary <= remaining;
              return (
                <motion.div
                  key={fighter.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-xl border transition-all",
                    selected
                      ? 'bg-[#0f2010] border-[#39FF14]/40'
                      : 'bg-[#0f1520] border-[#1e2a3a] hover:border-[#39FF14]/20'
                  )}
                >
                  {/* Avatar */}
                  <div className={cn("w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0", selected ? 'bg-[#39FF14]/20 text-[#39FF14]' : 'bg-[#1e2a3a] text-white')}>
                    {fighter.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={cn("font-semibold text-sm", selected ? 'text-[#39FF14]' : 'text-white')}>{fighter.name}</span>
                      {fighter.ranking && (
                        <span className="text-xs bg-[#1e2a3a] text-[#4a5568] px-1.5 py-0.5 rounded">#{fighter.ranking}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-[#4a5568]">{WC_MAP[fighter.weightClass] || fighter.weightClass}</span>
                      <span className="text-xs text-[#4a5568]">{fighter.record}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden sm:flex items-center gap-4 text-center">
                    <div>
                      <div className="text-[#4a5568] text-xs">Salary</div>
                      <div className="text-white text-sm font-semibold">{formatSalary(fighter.salary)}</div>
                    </div>
                    <div>
                      <div className="text-[#4a5568] text-xs">Proj Pts</div>
                      <div className="text-yellow-400 text-sm font-semibold flex items-center gap-0.5"><Zap size={11} />{fighter.projectedPoints}</div>
                    </div>
                    <div>
                      <div className="text-[#4a5568] text-xs">Own%</div>
                      <div className="text-[#4a5568] text-sm">{fighter.ownership}%</div>
                    </div>
                  </div>

                  {/* Action */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => selected ? removeFighter(fighter.id) : handleAdd(fighter, canAdd)}
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                      selected
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : canAdd
                        ? 'bg-[#39FF14]/20 text-[#39FF14] hover:bg-[#39FF14]/30'
                        : 'bg-[#1e2a3a] text-[#4a5568] cursor-not-allowed'
                    )}
                  >
                    {selected ? <X size={16} /> : canAdd ? <Plus size={16} /> : <ChevronDown size={16} />}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
