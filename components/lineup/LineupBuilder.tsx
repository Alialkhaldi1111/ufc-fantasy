'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Zap, Trash2, Shuffle } from 'lucide-react';
import { useLineupStore } from '@/store/useLineupStore';
import { SalaryCapBar } from './SalaryCapBar';
import type { Fighter } from '@/types';
import { cn, formatSalary } from '@/lib/utils';

interface LineupBuilderProps {
  fighters: Fighter[];
  salaryCap?: number;
  rosterSize?: number;
  onSubmit?: (fighters: Fighter[]) => void;
}

export function LineupBuilder({ fighters, salaryCap = 50000, rosterSize = 6, onSubmit }: LineupBuilderProps) {
  const { selectedFighters, addFighter, removeFighter, clearLineup, totalSalary } = useLineupStore();
  const isValid = selectedFighters.length === rosterSize;
  const totalProjected = selectedFighters.reduce((s, f) => s + f.projectedPoints, 0);

  return (
    <div className="bg-[#0f1520] border border-[#1e2a3a] rounded-2xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-white font-bold text-lg">Your Lineup</h2>
        <div className="flex items-center gap-2">
          {selectedFighters.length > 0 && (
            <button onClick={clearLineup}
              className="flex items-center gap-1 text-[#4a5568] hover:text-red-400 text-xs transition-colors">
              <Trash2 size={12} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Salary Cap Bar */}
      <SalaryCapBar used={totalSalary} cap={salaryCap} />

      {/* Slots */}
      <div className="space-y-2">
        {Array.from({ length: rosterSize }).map((_, i) => {
          const fighter = selectedFighters[i];
          return (
            <AnimatePresence key={i} mode="popLayout">
              {fighter ? (
                <motion.div
                  key={fighter.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.9 }}
                  className="flex items-center gap-3 bg-[#141d2e] rounded-xl p-3 border border-[#39FF14]/20"
                >
                  <div className="w-8 h-8 rounded-full bg-[#39FF14]/10 flex items-center justify-center text-xs font-bold text-[#39FF14] flex-shrink-0">
                    {fighter.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-semibold truncate">{fighter.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[#4a5568] text-xs">{fighter.weightClass.replace("Women's ", "W-")}</span>
                      <span className="text-[#39FF14] text-xs">{formatSalary(fighter.salary)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-xs flex-shrink-0">
                    <Zap size={10} />{fighter.projectedPoints}
                  </div>
                  <button onClick={() => removeFighter(fighter.id)} className="text-[#4a5568] hover:text-red-400 transition-colors ml-1">
                    <X size={16} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={`empty-${i}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-[#1e2a3a]"
                >
                  <div className="w-8 h-8 rounded-full border border-dashed border-[#1e2a3a] flex items-center justify-center flex-shrink-0">
                    <Plus size={14} className="text-[#4a5568]" />
                  </div>
                  <span className="text-[#4a5568] text-sm">Select fighter {i + 1}</span>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Totals */}
      <div className="flex items-center justify-between p-3 bg-[#080c12] rounded-xl border border-[#1e2a3a]">
        <span className="text-[#4a5568] text-sm">Total Projected</span>
        <span className="text-[#39FF14] font-bold flex items-center gap-1">
          <Zap size={14} />{totalProjected.toFixed(1)} pts
        </span>
      </div>

      {/* Submit */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        disabled={!isValid}
        onClick={() => isValid && onSubmit?.(selectedFighters)}
        className={cn(
          "w-full py-3 rounded-xl font-bold text-sm transition-all",
          isValid
            ? 'bg-[#39FF14] text-[#080c12] hover:bg-[#2acc10] shadow-[0_0_20px_rgba(57,255,20,0.3)]'
            : 'bg-[#1e2a3a] text-[#4a5568] cursor-not-allowed'
        )}
      >
        {isValid ? 'Submit Lineup →' : `Select ${rosterSize - selectedFighters.length} More Fighter${rosterSize - selectedFighters.length !== 1 ? 's' : ''}`}
      </motion.button>
    </div>
  );
}
