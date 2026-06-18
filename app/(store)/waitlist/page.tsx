'use client';

import React, { useState } from 'react';
import { CountdownTimer } from '@/components/store/CountdownTimer';

const LAUNCH_DATE = new Date('2026-07-01T00:00:00Z');
const WAITLIST_COUNT = 3847;

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/store/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, source: 'waitlist' }),
      });
      if (!res.ok) throw new Error('Failed');
      setDone(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="text-7xl">🧊</div>
        <h1 className="text-4xl font-black text-white">
          The Drop is Coming
        </h1>
        <p className="text-white/60 text-lg">
          Be first in line when the next batch of APEX Cold Plunge tubs drops.
        </p>
      </div>

      {/* Countdown */}
      <div className="bg-[#0f1520] border border-white/10 rounded-2xl p-8 text-center space-y-4">
        <p className="text-white/50 uppercase tracking-widest text-sm">Next Drop In</p>
        <CountdownTimer targetDate={LAUNCH_DATE} className="text-5xl text-[#39FF14]" />
        <div className="flex justify-center gap-8 text-white/40 text-xs uppercase tracking-wide">
          <span>Hours</span>
          <span>Minutes</span>
          <span>Seconds</span>
        </div>
      </div>

      {/* Social proof */}
      <div className="text-center">
        <p className="text-white/70">
          <span className="text-[#39FF14] font-black text-2xl">{WAITLIST_COUNT.toLocaleString()}+</span>
          <span className="text-white/50 ml-2">people already on the waitlist</span>
        </p>
      </div>

      {/* Benefits */}
      <div className="bg-[#0f1520] border border-[#39FF14]/20 rounded-2xl p-6 space-y-3">
        <h2 className="text-white font-bold">Waitlist Benefits</h2>
        {[
          '🎯 Early access — shop before the public',
          '💰 Exclusive 15% off for waitlist members',
          '📦 Priority shipping on your order',
          '🎁 Free APEX Recovery Guide ($29 value)',
        ].map((b) => (
          <p key={b} className="text-white/70 text-sm">{b}</p>
        ))}
      </div>

      {/* Form */}
      {done ? (
        <div className="bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-2xl p-8 text-center space-y-3">
          <div className="text-5xl">✅</div>
          <h2 className="text-white font-black text-xl">You&apos;re on the list!</h2>
          <p className="text-white/60 text-sm">
            We&apos;ll email you at <span className="text-[#39FF14]">{email}</span> when we drop. Your
            exclusive 15% off code will be included.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#39FF14]/50"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#39FF14]/50"
            />
          </div>
          {error && <p className="text-[#FF3131] text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#39FF14] text-black font-black text-xl py-5 rounded-xl hover:bg-[#2acc10] transition-colors disabled:opacity-50"
          >
            {loading ? 'Joining...' : 'JOIN THE WAITLIST — FREE'}
          </button>
          <p className="text-white/30 text-xs text-center">No spam. Unsubscribe anytime.</p>
        </form>
      )}
    </div>
  );
}
