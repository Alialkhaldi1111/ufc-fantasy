const BADGES = [
  { icon: '🚚', label: 'Free Shipping', sub: 'On all orders' },
  { icon: '↩️', label: '30-Day Returns', sub: 'No questions asked' },
  { icon: '🛡️', label: '1-Year Warranty', sub: 'Full coverage' },
  { icon: '🔒', label: 'Secure Checkout', sub: '256-bit SSL' },
];

interface TrustBadgesProps {
  compact?: boolean;
}

export function TrustBadges({ compact = false }: TrustBadgesProps) {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-3 justify-center">
        {BADGES.map((b) => (
          <span key={b.label} className="text-xs text-white/60 flex items-center gap-1">
            <span>{b.icon}</span>
            <span>{b.label}</span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {BADGES.map((b) => (
        <div
          key={b.label}
          className="bg-white/5 border border-white/10 rounded-xl p-3 text-center space-y-1"
        >
          <div className="text-2xl">{b.icon}</div>
          <p className="text-white font-semibold text-sm">{b.label}</p>
          <p className="text-white/50 text-xs">{b.sub}</p>
        </div>
      ))}
    </div>
  );
}
