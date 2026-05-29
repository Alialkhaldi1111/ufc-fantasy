'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SalaryCapBarProps {
  used: number;
  cap: number;
  className?: string;
}

export function SalaryCapBar({ used, cap, className }: SalaryCapBarProps) {
  const remaining = cap - used;
  const pct = Math.min((used / cap) * 100, 100);
  const isWarning = pct > 75;
  const isDanger = pct > 90;

  const barColor = isDanger ? '#ef4444' : isWarning ? '#facc15' : '#39FF14';
  const textColor = isDanger ? 'text-red-400' : isWarning ? 'text-yellow-400' : 'text-[#39FF14]';

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex justify-between items-center">
        <span className="text-xs text-[#4a5568]">Salary Cap</span>
        <span className={cn("text-xs font-bold", textColor)}>
          ${remaining.toLocaleString()} remaining
        </span>
      </div>
      <div className="h-2 bg-[#1e2a3a] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full transition-colors duration-300"
          style={{ background: barColor }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-xs text-[#4a5568]">${used.toLocaleString()} used</span>
        <span className="text-xs text-[#4a5568]">${cap.toLocaleString()} cap</span>
      </div>
    </div>
  );
}
