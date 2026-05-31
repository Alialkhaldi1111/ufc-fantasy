export interface StoreProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  badge?: string;
  shortDescription: string;
  bullets: string[];
  features: { title: string; description: string; icon: string }[];
  images: { alt: string; gradient: string }[];
  inStock: boolean;
  sku: string;
  reviewCount: number;
  rating: number;
  whatsInBox: string[];
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  items: string[];
  price: number;
  originalPrice: number;
  savings: number;
  badge?: string;
}

export const products: Record<string, StoreProduct> = {
  'glow-wand': {
    id: 'glow-wand',
    slug: 'glow-wand',
    name: 'Lumé Glow Wand',
    tagline: 'Dual Red Light Therapy Device',
    price: 89,
    originalPrice: 129,
    badge: 'Best Seller',
    shortDescription:
      'Clinic-grade red light therapy in the palm of your hand. 150 medical-grade LEDs at 630nm + 850nm — the exact wavelengths dermatologists use to reduce fine lines, clear acne, and restore radiance in 10 minutes a day.',
    bullets: [
      '630nm Red + 850nm Near-Infrared dual-wavelength therapy',
      '150 high-density medical-grade LEDs',
      'FDA-registered device — clinically-validated wavelengths',
      'USB-C rechargeable — 30+ sessions per charge',
      'Auto 10-minute shutoff — perfectly dosed every session',
      'Lightweight 82g — use anywhere, anytime',
      '1-Year warranty + 30-day money-back guarantee',
    ],
    features: [
      {
        title: 'Dual Wavelength',
        description: '630nm targets surface skin. 850nm penetrates 2–3cm for deep cellular repair.',
        icon: '🔴',
      },
      {
        title: '150 Medical LEDs',
        description: 'Clinical-density array — not the single-bulb toys you\'ve seen elsewhere.',
        icon: '💡',
      },
      {
        title: 'FDA-Registered',
        description: 'Registered as a Class II wellness device. Safety verified, wavelengths validated.',
        icon: '✅',
      },
      {
        title: 'USB-C Charged',
        description: 'One cable for everything. 90-min charge = 30+ ten-minute sessions.',
        icon: '⚡',
      },
      {
        title: 'Auto Shutoff',
        description: 'Precisely timed 10-min sessions. Impossible to over-treat.',
        icon: '⏱️',
      },
      {
        title: '30-Day Guarantee',
        description: 'If your skin doesn\'t improve, we\'ll refund every penny. No questions.',
        icon: '🛡️',
      },
    ],
    images: [
      { alt: 'Lumé Glow Wand — product hero', gradient: 'from-red-100 via-rose-50 to-orange-50' },
      { alt: 'Lumé Glow Wand — red light close-up', gradient: 'from-red-200 via-pink-100 to-rose-100' },
      { alt: 'Lumé Glow Wand — in use lifestyle', gradient: 'from-orange-100 via-amber-50 to-yellow-50' },
      { alt: 'Lumé Glow Wand — travel pouch', gradient: 'from-rose-100 via-red-50 to-pink-50' },
    ],
    inStock: true,
    sku: 'LME-GW-001',
    reviewCount: 2847,
    rating: 4.9,
    whatsInBox: [
      '1× Lumé Glow Wand',
      '1× USB-C Charging Cable',
      '1× Premium Travel Pouch',
      '1× 30-Day Glow Protocol Card',
      '1× Usage Guide',
    ],
  },
};

export const bundles: Bundle[] = [
  {
    id: 'starter',
    name: 'Starter Bundle',
    description: 'Wand + Glow Serum for 3× faster visible results',
    items: ['Lumé Glow Wand', 'Lumé Glow Serum (50ml)'],
    price: 119,
    originalPrice: 136,
    savings: 17,
    badge: 'Most Popular',
  },
  {
    id: 'pro-kit',
    name: 'Pro Kit',
    description: 'Complete ritual — everything you need',
    items: ['Lumé Glow Wand', 'Lumé Glow Serum (50ml)', 'Collagen Eye Patches (12-pack)'],
    price: 169,
    originalPrice: 213,
    savings: 44,
    badge: 'Best Value',
  },
  {
    id: 'gift',
    name: 'Gift Set',
    description: 'Two wands in gift packaging — perfect for gifting',
    items: ['2× Lumé Glow Wand', 'Gift Box + Ribbon'],
    price: 149,
    originalPrice: 178,
    savings: 29,
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Sophia R.',
    location: 'Austin, TX',
    rating: 5,
    text: 'After 3 weeks, my hyperpigmentation faded by at least 60%. My aesthetician asked what I changed.',
    weeks: 3,
  },
  {
    id: 2,
    name: 'Marcus T.',
    location: 'Chicago, IL',
    rating: 5,
    text: "I was skeptical. I'm not anymore. My skin hasn't looked like this since my 20s and I'm 38.",
    weeks: 8,
  },
  {
    id: 3,
    name: 'Jade K.',
    location: 'Los Angeles, CA',
    rating: 5,
    text: "Cleared my cystic acne in 3 weeks. I've tried everything. This actually works.",
    weeks: 3,
  },
  {
    id: 4,
    name: 'Elena M.',
    location: 'New York, NY',
    rating: 5,
    text: "I stopped wearing foundation to work. I didn't think that would ever be possible.",
    weeks: 6,
  },
  {
    id: 5,
    name: 'Priya S.',
    location: 'Seattle, WA',
    rating: 5,
    text: 'Was spending $800/month at my medi-spa. This one $89 device replaced everything.',
    weeks: 12,
  },
  {
    id: 6,
    name: 'Claire B.',
    location: 'Denver, CO',
    rating: 5,
    text: "My dermatologist literally asked me what device I was using. She was impressed.",
    weeks: 4,
  },
];
