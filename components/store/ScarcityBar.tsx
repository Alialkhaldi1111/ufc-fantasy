'use client';

interface ScarcityBarProps {
  stock: number;
  total?: number;
}

export function ScarcityBar({ stock, total = 200 }: ScarcityBarProps) {
  const pct = Math.max(0, Math.min(100, ((total - stock) / total) * 100));

  return (
    <div className="space-y-1">
      <p className="text-sm font-semibold text-[#FF3131] flex items-center gap-1">
        <span>⚡</span>
        <span>Only {stock} units left at this price!</span>
      </p>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#FF3131] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-white/50">{Math.round(pct)}% sold — hurry before we run out!</p>
    </div>
  );
}
