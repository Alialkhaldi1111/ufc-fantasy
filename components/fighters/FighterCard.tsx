'use client';

import React from 'react';
import Image from 'next/image';
import { Zap, DollarSign, Users, Plus, Minus } from 'lucide-react';
import { Fighter } from '@/types';

interface FighterCardProps {
  fighter: Fighter;
  isSelected?: boolean;
  onAdd?: (fighter: Fighter) => void;
  onRemove?: (fighterId: string) => void;
  canAdd?: boolean;
  compact?: boolean;
}

const WEIGHT_CLASS_COLORS: Record<string, string> = {
  Heavyweight: 'bg-red-900/60 text-red-300 border-red-700',
  'Light Heavyweight': 'bg-orange-900/60 text-orange-300 border-orange-700',
  Middleweight: 'bg-yellow-900/60 text-yellow-300 border-yellow-700',
  Welterweight: 'bg-green-900/60 text-green-300 border-green-700',
  Lightweight: 'bg-blue-900/60 text-blue-300 border-blue-700',
  Featherweight: 'bg-purple-900/60 text-purple-300 border-purple-700',
  Bantamweight: 'bg-pink-900/60 text-pink-300 border-pink-700',
  Flyweight: 'bg-indigo-900/60 text-indigo-300 border-indigo-700',
};

export function FighterCard({
  fighter,
  isSelected = false,
  onAdd,
  onRemove,
  canAdd = true,
  compact = false,
}: FighterCardProps) {
  const weightColor =
    WEIGHT_CLASS_COLORS[fighter.weightClass] ??
    'bg-gray-800/60 text-gray-300 border-gray-600';

  if (compact) {
    return (
      <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/80 border border-gray-700">
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
          {fighter.imageUrl ? (
            <Image
              src={fighter.imageUrl}
              alt={fighter.name}
              fill
              className="object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-400">
              {fighter.name[0]}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white truncate">{fighter.name}</p>
          <p className="text-xs text-gray-400">${fighter.salary.toLocaleString()}</p>
        </div>
        {onRemove && (
          <button
            onClick={() => onRemove(fighter.id)}
            className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-900/30 transition-colors"
            aria-label={`Remove ${fighter.name}`}
          >
            <Minus size={12} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`
        relative group rounded-xl border transition-all duration-200 overflow-hidden
        ${isSelected
          ? 'border-[#00ff87] bg-[#00ff87]/5 shadow-[0_0_20px_rgba(0,255,135,0.15)]'
          : 'border-gray-700 bg-gray-800/60 hover:border-gray-500 hover:shadow-[0_0_16px_rgba(0,255,135,0.08)]'
        }
      `}
    >
      {/* Neon glow overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-gradient-to-b from-[#00ff87]/5 to-transparent rounded-xl" />

      <div className="p-4">
        {/* Top: image + name */}
        <div className="flex gap-3 mb-3">
          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
            {fighter.imageUrl ? (
              <Image
                src={fighter.imageUrl}
                alt={fighter.name}
                fill
                className="object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-400">
                {fighter.name[0]}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-sm leading-tight truncate">
              {fighter.name}
            </h3>
            {fighter.nickname && (
              <p className="text-xs text-gray-400 italic truncate">
                &ldquo;{fighter.nickname}&rdquo;
              </p>
            )}
            <span
              className={`mt-1 inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded border ${weightColor}`}
            >
              {fighter.weightClass}
            </span>
          </div>
        </div>

        {/* Record */}
        <p className="text-xs text-gray-400 mb-3 font-mono">
          {fighter.record}
          {fighter.ranking && (
            <span className="ml-2 text-[#00ff87]">#{fighter.ranking}</span>
          )}
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-1 mb-3">
          <div className="text-center">
            <div className="flex items-center justify-center gap-0.5 text-[#00ff87] font-bold text-sm">
              <DollarSign size={11} />
              {(fighter.salary / 1000).toFixed(1)}K
            </div>
            <p className="text-[10px] text-gray-500">Salary</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-0.5 text-yellow-400 font-bold text-sm">
              <Zap size={11} />
              {fighter.projectedPoints.toFixed(1)}
            </div>
            <p className="text-[10px] text-gray-500">Proj Pts</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-0.5 text-blue-400 font-bold text-sm">
              <Users size={11} />
              {fighter.ownership.toFixed(1)}%
            </div>
            <p className="text-[10px] text-gray-500">Own%</p>
          </div>
        </div>

        {/* Add / Remove button */}
        {isSelected ? (
          <button
            onClick={() => onRemove?.(fighter.id)}
            className="w-full py-1.5 rounded-lg border border-red-500/50 bg-red-500/10 text-red-400 text-xs font-semibold flex items-center justify-center gap-1 hover:bg-red-500/20 transition-colors"
          >
            <Minus size={12} />
            Remove
          </button>
        ) : (
          <button
            onClick={() => canAdd && onAdd?.(fighter)}
            disabled={!canAdd}
            className={`
              w-full py-1.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1 transition-colors
              ${canAdd
                ? 'border-[#00ff87]/50 bg-[#00ff87]/10 text-[#00ff87] hover:bg-[#00ff87]/20'
                : 'border-gray-600 bg-gray-700/30 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            <Plus size={12} />
            {canAdd ? 'Add Fighter' : 'Lineup Full'}
          </button>
        )}
      </div>
    </div>
  );
}
