'use client';

import React from 'react';
import { Fighter } from '@/types';

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
  suffix?: string;
}

function StatBar({ label, value, max = 100, color = '#00ff87', suffix = '%' }: StatBarProps) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-xs font-semibold text-white">
          {suffix === '%' ? `${value}%` : `${value}${suffix}`}
        </span>
      </div>
      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}cc, ${color})`,
            boxShadow: `0 0 6px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}

interface FighterStatsProps {
  fighter: Fighter;
}

export function FighterStats({ fighter }: FighterStatsProps) {
  return (
    <div className="rounded-xl bg-gray-800/60 border border-gray-700 p-4">
      <h3 className="text-sm font-bold text-white mb-4">Fighter Statistics</h3>

      {/* Striking & Grappling Accuracy */}
      <div className="mb-4">
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Accuracy & Defense
        </p>
        <StatBar label="Strike Accuracy" value={fighter.strikeAccuracy} color="#00ff87" />
        <StatBar label="Strike Defense" value={fighter.strikeDefense} color="#00ff87" />
        <StatBar label="Takedown Accuracy" value={fighter.takedownAccuracy} color="#00d4ff" />
        <StatBar label="Takedown Defense" value={fighter.takedownDefense} color="#00d4ff" />
      </div>

      {/* Finish Rates */}
      <div className="mb-4">
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Finish Rates
        </p>
        <StatBar label="KO / TKO %" value={fighter.knockoutPct} color="#ff4444" />
        <StatBar label="Submission %" value={fighter.submissionPct} color="#ff9900" />
        <StatBar label="Decision %" value={fighter.decisionPct} color="#8888ff" />
      </div>

      {/* Volume Stats */}
      <div>
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Output (per fight avg)
        </p>
        <StatBar
          label="Sig. Strikes / min"
          value={fighter.significantStrikes}
          max={10}
          color="#ffdd00"
          suffix=" /min"
        />
        <StatBar
          label="Takedowns / fight"
          value={fighter.takedownsPerFight}
          max={6}
          color="#00d4ff"
          suffix=" /fight"
        />
      </div>
    </div>
  );
}
