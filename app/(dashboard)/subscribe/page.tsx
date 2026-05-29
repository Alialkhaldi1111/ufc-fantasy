'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    icon: <Star size={24} className="text-[#4a5568]" />,
    color: 'border-[#1e2a3a]',
    badge: null,
    features: [
      'Enter free contests',
      'Basic fighter stats',
      'Standard leaderboard',
      '6-fighter lineup builder',
      'Community chat',
      'Mobile app access',
    ],
    notIncluded: ['AI lineup optimizer', 'Advanced analytics', 'VIP tournaments', 'Priority support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 9.99,
    annualPrice: 7.99,
    icon: <Zap size={24} className="text-[#39FF14]" />,
    color: 'border-[#39FF14]/50',
    badge: 'MOST POPULAR',
    features: [
      'Everything in Free',
      'Enter all paid contests',
      'AI lineup optimizer',
      'Advanced fighter analytics',
      'Ownership projections',
      'Historical performance data',
      'Lineup export tools',
      'Email support',
    ],
    notIncluded: ['VIP tournaments', 'Insider picks', 'Custom private leagues'],
  },
  {
    id: 'elite',
    name: 'Elite',
    monthlyPrice: 24.99,
    annualPrice: 19.99,
    icon: <Crown size={24} className="text-yellow-400" />,
    color: 'border-yellow-500/40',
    badge: 'BEST VALUE',
    features: [
      'Everything in Pro',
      'Exclusive VIP tournaments',
      'Insider fighter picks',
      'Custom private leagues',
      'VIP analytics dashboard',
      'Early contest access',
      'Dedicated support',
      'Verified badge',
    ],
    notIncluded: [],
  },
];

export default function SubscribePage() {
  const [annual, setAnnual] = useState(false);
  const [selected, setSelected] = useState('pro');

  return (
    <div className="min-h-screen bg-[#080c12] pb-24 lg:pb-8">
      <div className="px-4 pt-8 pb-4 lg:px-8 text-center">
        <motion.h1 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-black text-white mb-2">Upgrade Your Game</motion.h1>
        <motion.p initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="text-[#4a5568] max-w-md mx-auto">
          Unlock premium features and compete at the highest level.
        </motion.p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className={cn("text-sm font-medium", !annual ? 'text-white' : 'text-[#4a5568]')}>Monthly</span>
          <button onClick={() => setAnnual(!annual)}
            className={cn("relative w-12 h-6 rounded-full transition-colors", annual ? 'bg-[#39FF14]' : 'bg-[#1e2a3a]')}>
            <span className={cn("absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform", annual ? 'translate-x-6' : 'translate-x-0')} />
          </button>
          <span className={cn("text-sm font-medium", annual ? 'text-white' : 'text-[#4a5568]')}>
            Annual <span className="text-[#39FF14] text-xs ml-1">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="px-4 lg:px-8 mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {PLANS.map((plan, i) => {
          const price = annual ? plan.annualPrice : plan.monthlyPrice;
          const isSelected = selected === plan.id;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelected(plan.id)}
              className={cn(
                "relative bg-[#0f1520] rounded-2xl border-2 p-6 cursor-pointer transition-all",
                plan.color,
                isSelected && plan.id === 'pro' && 'shadow-[0_0_40px_rgba(57,255,20,0.15)]',
                isSelected && plan.id === 'elite' && 'shadow-[0_0_40px_rgba(234,179,8,0.15)]',
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={cn("px-3 py-1 text-xs font-black rounded-full",
                    plan.id === 'pro' ? 'bg-[#39FF14] text-[#080c12]' : 'bg-yellow-400 text-[#080c12]')}>
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 mb-4">
                {plan.icon}
                <h3 className="text-white font-black text-xl">{plan.name}</h3>
              </div>

              <div className="mb-6">
                {price === 0 ? (
                  <span className="text-4xl font-black text-white">Free</span>
                ) : (
                  <div>
                    <span className="text-4xl font-black text-white">${price}</span>
                    <span className="text-[#4a5568] text-sm">/mo</span>
                    {annual && <div className="text-[#4a5568] text-xs mt-0.5">billed annually</div>}
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-6">
                {plan.features.map(f => (
                  <div key={f} className="flex items-start gap-2">
                    <Check size={14} className="text-[#39FF14] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">{f}</span>
                  </div>
                ))}
                {plan.notIncluded.map(f => (
                  <div key={f} className="flex items-start gap-2 opacity-30">
                    <span className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-center text-xs leading-3.5">✕</span>
                    <span className="text-sm text-[#4a5568] line-through">{f}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "w-full py-3 rounded-xl font-bold text-sm transition-all",
                  plan.id === 'free'
                    ? 'bg-[#1e2a3a] text-[#4a5568] cursor-default'
                    : plan.id === 'pro'
                    ? 'bg-[#39FF14] text-[#080c12] hover:bg-[#2acc10]'
                    : 'bg-yellow-400 text-[#080c12] hover:bg-yellow-300'
                )}
                onClick={e => e.stopPropagation()}
              >
                {plan.id === 'free' ? 'Current Plan' : `Get ${plan.name}`}
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="px-4 lg:px-8 mt-12 max-w-2xl mx-auto">
        <h2 className="text-white font-bold text-xl mb-4 text-center">Frequently Asked</h2>
        <div className="space-y-3">
          {[
            { q: 'Can I cancel anytime?', a: 'Yes. Cancel anytime from settings. You keep access until the end of your billing period.' },
            { q: 'Is this real-money gambling?', a: 'No. OctaFight Fantasy is a skill-based fantasy sports platform, not sports betting.' },
            { q: 'How are winners determined?', a: 'Winners are determined by real UFC fighter performance using our fantasy scoring system.' },
            { q: 'What payment methods are accepted?', a: 'All major credit cards, Apple Pay, and Google Pay via Stripe.' },
          ].map((faq, i) => (
            <div key={i} className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl p-4">
              <div className="text-white text-sm font-semibold mb-1">{faq.q}</div>
              <div className="text-[#4a5568] text-sm">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
