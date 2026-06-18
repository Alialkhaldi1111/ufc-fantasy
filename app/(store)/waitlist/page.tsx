'use client';

import { useState } from 'react';
import { Zap, Check, Users } from 'lucide-react';
import CountdownTimer from '@/components/store/CountdownTimer';

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/store/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, firstName, source: 'waitlist_page' }),
    });
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="text-6xl">🎉</div>
        <h1 className="text-3xl font-black text-white">You&apos;re on the list, {firstName || 'Athlete'}!</h1>
        <p className="text-gray-300">
          We&apos;ll email you your <strong className="text-[#39FF14]">15% early access discount</strong> the moment we launch. You&apos;re one of the first.
        </p>
        <div className="bg-white/5 border border-[#39FF14]/30 rounded-2xl p-4">
          <div className="text-[#39FF14] font-mono font-bold text-xl">EARLY15</div>
          <div className="text-gray-400 text-sm mt-1">Your early access code — valid at launch</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] text-sm font-semibold px-4 py-2 rounded-full">
          <Zap className="w-4 h-4" />
          Early Access — Limited Spots
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
          Get <span className="text-[#39FF14]">15% Off</span>
          <br />Before We Launch
        </h1>
        <p className="text-gray-300 text-lg">
          The APEX Cold Plunge launches soon. Early access members get 15% off, free priority shipping, and first choice of inventory.
        </p>
      </div>

      <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
        <span className="flex items-center gap-1">
          <Users className="w-4 h-4 text-[#39FF14]" />
          <strong className="text-white">3,847</strong> already waiting
        </span>
        <span>·</span>
        <span>Limited to first <strong className="text-white">500</strong> spots</span>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-400 font-medium">LAUNCH COUNTDOWN:</div>
        <div className="flex justify-center">
          <CountdownTimer hours={72} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 text-left">
        <h2 className="font-bold text-white text-center">Reserve Your Spot</h2>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#39FF14]"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#39FF14]"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#39FF14] hover:bg-[#2acc10] disabled:opacity-60 text-black font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-95"
        >
          {loading ? 'Joining...' : 'Get Early Access + 15% Off →'}
        </button>
        <p className="text-xs text-gray-500 text-center">No spam. One email at launch. Unsubscribe anytime.</p>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: '💰', title: '15% Off', desc: 'Exclusive launch discount' },
          { icon: '🚀', title: 'First Access', desc: 'Before public launch' },
          { icon: '📦', title: 'Priority Ship', desc: 'Jump the queue' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1">
            <div className="text-2xl">{icon}</div>
            <div className="font-semibold text-white text-sm">{title}</div>
            <div className="text-xs text-gray-400">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
