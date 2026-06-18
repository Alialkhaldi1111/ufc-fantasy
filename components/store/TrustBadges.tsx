import { Truck, RefreshCcw, Shield, Star } from 'lucide-react';

const badges = [
  { icon: Truck, label: 'Free Shipping', sub: 'On orders over $199' },
  { icon: RefreshCcw, label: '30-Day Returns', sub: 'No questions asked' },
  { icon: Shield, label: '1-Year Warranty', sub: 'Full coverage' },
  { icon: Star, label: '4.9/5 Stars', sub: '2,847 reviews' },
];

export default function TrustBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {badges.map(({ icon: Icon, label, sub }) => (
        <div key={label} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
          <Icon className="w-6 h-6 text-[#39FF14] shrink-0" />
          <div>
            <div className="text-sm font-semibold text-white">{label}</div>
            <div className="text-xs text-gray-400">{sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
