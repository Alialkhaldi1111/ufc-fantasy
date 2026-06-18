'use client';

interface ScarcityBarProps {
  total?: number;
  remaining?: number;
}

export default function ScarcityBar({ total = 100, remaining = 47 }: ScarcityBarProps) {
  const sold = total - remaining;
  const pct = (sold / total) * 100;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-red-400 font-semibold">⚡ Only {remaining} units left at this price!</span>
        <span className="text-gray-400">{sold} sold</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
