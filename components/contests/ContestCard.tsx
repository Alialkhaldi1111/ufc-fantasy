'use client';

import React from 'react';
import { Trophy, Users, DollarSign, Lock, Zap } from 'lucide-react';
import { Contest } from '@/types';

interface ContestCardProps {
  contest: Contest;
  onEnter?: (contestId: string) => void;
}

const TYPE_CONFIG = {
  PUBLIC: { label: 'GPP', color: 'text-blue-400 bg-blue-900/40 border-blue-700' },
  HEAD_TO_HEAD: { label: 'H2H', color: 'text-purple-400 bg-purple-900/40 border-purple-700' },
  TOURNAMENT: { label: 'Tournament', color: 'text-orange-400 bg-orange-900/40 border-orange-700' },
  PRIVATE: { label: 'Private', color: 'text-gray-400 bg-gray-800/40 border-gray-600' },
} as const;

const STATUS_CONFIG = {
  OPEN: { label: 'Open', color: 'text-[#00ff87] bg-[#00ff87]/10 border-[#00ff87]/30' },
  LIVE: { label: 'Live', color: 'text-red-400 bg-red-900/30 border-red-700', pulse: true },
  UPCOMING: { label: 'Upcoming', color: 'text-yellow-400 bg-yellow-900/30 border-yellow-700' },
  LOCKED: { label: 'Locked', color: 'text-gray-400 bg-gray-800/40 border-gray-600' },
  COMPLETED: { label: 'Completed', color: 'text-gray-500 bg-gray-800/40 border-gray-600' },
  CANCELLED: { label: 'Cancelled', color: 'text-red-600 bg-red-900/20 border-red-800' },
} as const;

function formatPrize(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount}`;
}

export function ContestCard({ contest, onEnter }: ContestCardProps) {
  const typeConfig = TYPE_CONFIG[contest.type];
  const statusConfig = STATUS_CONFIG[contest.status];
  const fillPct = Math.min((contest.currentEntries / contest.maxEntries) * 100, 100);
  const isFull = contest.currentEntries >= contest.maxEntries;
  const canEnter = contest.status === 'OPEN' && !isFull;

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800/60 hover:border-gray-600 transition-all duration-200 overflow-hidden group hover:shadow-[0_0_16px_rgba(0,255,135,0.06)]">
      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-sm leading-tight truncate">
              {contest.name}
            </h3>
            {contest.event && (
              <p className="text-xs text-gray-400 mt-0.5 truncate">{contest.event.name}</p>
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${typeConfig.color}`}>
              {typeConfig.label}
            </span>
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border flex items-center gap-1 ${statusConfig.color}`}
            >
              {contest.status === 'LIVE' && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              )}
              {statusConfig.label}
            </span>
          </div>
        </div>

        {/* Prize pool */}
        <div className="mb-3">
          <div className="flex items-baseline gap-1">
            <Trophy size={14} className="text-[#00ff87] flex-shrink-0 mt-0.5" />
            <span className="text-2xl font-black text-[#00ff87] leading-none">
              {formatPrize(contest.prizePool)}
            </span>
            {contest.isGuaranteed && (
              <span className="text-[10px] font-bold text-[#00ff87]/70 uppercase tracking-wide">
                GTD
              </span>
            )}
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5">Prize Pool</p>
        </div>

        {/* Entry fee + entries */}
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-1 text-gray-300">
            <DollarSign size={12} className="text-gray-500" />
            <span className="font-semibold">
              {contest.entryFee === 0 ? 'FREE' : `$${contest.entryFee}`}
            </span>
            <span className="text-gray-500">entry</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Users size={12} />
            <span>
              {contest.currentEntries.toLocaleString()} /{' '}
              {contest.maxEntries.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${fillPct}%`,
                background:
                  fillPct >= 90
                    ? 'linear-gradient(90deg, #ef4444, #dc2626)'
                    : fillPct >= 60
                    ? 'linear-gradient(90deg, #eab308, #ca8a04)'
                    : 'linear-gradient(90deg, #00ff87cc, #00ff87)',
              }}
            />
          </div>
          {isFull && (
            <p className="text-[10px] text-red-400 mt-0.5 text-right">Contest Full</p>
          )}
        </div>

        {/* Enter button */}
        <button
          onClick={() => canEnter && onEnter?.(contest.id)}
          disabled={!canEnter}
          className={`
            w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all
            ${canEnter
              ? 'bg-[#00ff87] text-black hover:bg-[#00e87a] active:scale-95'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {!canEnter && <Lock size={11} />}
          {canEnter ? (
            <>
              <Zap size={11} />
              Enter Contest
            </>
          ) : isFull ? (
            'Contest Full'
          ) : (
            statusConfig.label
          )}
        </button>
      </div>
    </div>
  );
}
