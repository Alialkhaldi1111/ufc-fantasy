import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
    _stripe = new Stripe(key, {
      apiVersion: '2026-05-27.dahlia' as Parameters<typeof Stripe>[1]['apiVersion'],
    });
  }
  return _stripe;
}

// Lazy singleton - use getStripe() at runtime
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as Record<string | symbol, unknown>)[prop];
  },
});

export interface Plan {
  name: string;
  price: number;
  priceId: string | null | undefined;
  features: string[];
}

export const PLANS: Record<'free' | 'pro' | 'elite', Plan> = {
  free: {
    name: 'Free',
    price: 0,
    priceId: null,
    features: [
      'Up to 3 contest entries per event',
      'Basic fighter stats',
      'Public contests only',
      'Community leaderboard access',
      '100 XP cap per event',
    ],
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      'Unlimited contest entries',
      'Advanced fighter analytics',
      'Private & H2H contests',
      'Lineup optimizer (5 per day)',
      'Priority customer support',
      'Pro badge & profile flair',
      'Early access to new features',
    ],
  },
  elite: {
    name: 'Elite',
    price: 24.99,
    priceId: process.env.STRIPE_ELITE_PRICE_ID,
    features: [
      'Everything in Pro',
      'Unlimited lineup optimizer',
      'Exclusive Elite-only tournaments',
      'AI-powered pick suggestions',
      'Fight-night live scoring alerts',
      'Elite badge & animated flair',
      'Monthly bonus credits ($10/mo)',
      'Direct access to OctaFight team',
    ],
  },
};

export type PlanKey = keyof typeof PLANS;
