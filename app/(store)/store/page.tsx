'use client';

import { useState, useRef } from 'react';
import { Star, Check, ChevronDown, ChevronUp, Plus, Minus, Shield, Truck, RotateCcw, Zap } from 'lucide-react';
import { CountdownTimer } from '@/components/store/CountdownTimer';
import { ScarcityBar } from '@/components/store/ScarcityBar';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';

const PRODUCT_ID = 'apex-cold-plunge-v1';
const PRICE = 24900;
const COMPARE_PRICE = 39900;

// Free-to-use Unsplash images — replace with your CJDropshipping supplier photos
const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=90',
  'https://images.unsplash.com/photo-1594882645126-14ac19a7b0d2?w=800&q=90',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=90',
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=90',
];

const reviews = [
  {
    name: 'Marcus T.',
    location: 'Las Vegas, NV',
    rating: 5,
    date: 'Dec 14, 2025',
    title: 'Cut my recovery time in half',
    body: "Train MMA 5 days a week. After adding cold plunge post-session, the next-day soreness is basically gone. My coach noticed the difference before I even told him what I changed.",
    verified: true,
    tag: 'MMA Fighter',
    initial: 'M',
  },
  {
    name: 'Jenna M.',
    location: 'Austin, TX',
    rating: 5,
    date: 'Dec 10, 2025',
    title: 'Bought it for my boyfriend, stolen by me',
    body: "He got one use before I claimed it. The sleep improvement alone was worth the price — I fall asleep faster and wake up actually rested.",
    verified: true,
    tag: 'CrossFit Coach',
    initial: 'J',
  },
  {
    name: 'Ryan K.',
    location: 'Denver, CO',
    rating: 5,
    date: 'Nov 28, 2025',
    title: 'Tested next to a $4k permanent unit',
    body: "My buddy has a built-in cold plunge. We timed both at 50°F — mine held longer. Setup takes 60 seconds. His took a plumber and a weekend.",
    verified: true,
    tag: 'Strength Coach',
    initial: 'R',
  },
  {
    name: 'Derek S.',
    location: 'Chicago, IL',
    rating: 5,
    date: 'Nov 21, 2025',
    title: 'The whole team uses it now',
    body: "Started bringing it to fight camp. Now everyone lines up after sessions. Pack it with ice at 6pm — still cold the next morning.",
    verified: true,
    tag: 'Amateur Fighter',
    initial: 'D',
  },
  {
    name: 'Aaliyah P.',
    location: 'Atlanta, GA',
    rating: 5,
    date: 'Nov 15, 2025',
    title: 'My inflammation is actually manageable',
    body: "I have lupus. My rheumatologist suggested cold therapy and I was skeptical. Three weeks in — genuinely the best I've felt in two years.",
    verified: true,
    tag: 'Marathon Runner',
    initial: 'A',
  },
  {
    name: 'Chris V.',
    location: 'Phoenix, AZ',
    rating: 5,
    date: 'Oct 30, 2025',
    title: "6'3\", 225lbs — fits perfectly",
    body: "Was the guy who kept not buying because I thought it wouldn't fit. It fits easily. No leaks after 45+ uses. No excuses left.",
    verified: true,
    tag: 'BJJ Black Belt',
    initial: 'C',
  },
];

const faqs = [
  { q: 'How cold does it get?', a: 'With ice, 39–50°F (4–10°C). The insulated walls hold temperature for 2+ hours without adding more ice.' },
  { q: 'How fast is setup?', a: 'Under 60 seconds. No inflation, no tools. Unfold, fill, plunge. Average first-time user: 47 seconds.' },
  { q: "Will I fit? I'm 6'4\".", a: "Yes. Fits athletes up to 6'5\" and 300 lbs. 32\" diameter, 28\" depth — designed for larger frames." },
  { q: 'How much ice do I need?', a: 'For 50°F: 30–40 lbs. For 39°F: 60–70 lbs. Any grocery store bag works.' },
  { q: 'Can it stay outside?', a: 'Yes — UV-resistant shell handles full sun. Garage, backyard, rooftop. Customers travel with it.' },
  { q: "What if I don't feel a difference?", a: '30-day full refund. No forms, no photos. Email us and we handle it same day.' },
];

const specs = [
  ['Dimensions', '32" diameter × 28" deep'],
  ['Capacity', 'Up to 300 lbs / 6\'5"'],
  ['Temperature Range', '39°F – ambient'],
  ['Hold Time', '2+ hours with ice'],
  ['Setup Time', '< 60 seconds'],
  ['Material', 'Military-spec insulated PVC'],
  ['Drain', 'Valve included, drains in 2 min'],
  ['UV Resistance', 'Full outdoor rated'],
  ['Weight', '8.5 lbs packed'],
  ['Warranty', '1 year full coverage'],
];

export default function StorePage() {
  const [qty, setQty] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [imgError, setImgError] = useState<boolean[]>([false, false, false, false]);
  const { addItem } = useCartStore();
  const productRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ productId: PRODUCT_ID, name: 'APEX Cold Plunge Pro', price: PRICE, image: PRODUCT_IMAGES[0] });
    }
  };

  const handleImgError = (i: number) => {
    const next = [...imgError];
    next[i] = true;
    setImgError(next);
  };

  return (
    <div className="bg-[#060910] text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#060910] via-transparent to-[#060910] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060910] via-[#060910]/80 to-transparent z-10" />
          {!imgError[0] ? (
            <img
              src={PRODUCT_IMAGES[2]}
              alt="Cold plunge"
              className="w-full h-full object-cover object-center opacity-40"
              onError={() => handleImgError(0)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0a1628] to-[#060910]" />
          )}
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-6 py-32 w-full">
          <div className="max-w-2xl space-y-8">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-white/50 text-sm">4.9 · 2,847 reviews</span>
            </div>

            <div className="space-y-3">
              <p className="text-[#4FC3F7] text-xs font-bold tracking-[0.3em] uppercase">APEX Cold Plunge Pro</p>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.88] tracking-tight">
                RECOVER
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#4FC3F7]">
                  LIKE A
                </span>
                <br />
                CHAMPION.
              </h1>
            </div>

            <p className="text-white/60 text-lg leading-relaxed max-w-lg">
              The portable ice bath that pro fighters, elite coaches, and serious athletes use to train harder, recover faster, and perform longer.
            </p>

            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-black">${(PRICE / 100).toFixed(0)}</span>
              <span className="text-2xl text-white/30 line-through">${(COMPARE_PRICE / 100).toFixed(0)}</span>
              <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">SAVE $150</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <button
                onClick={() => productRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 bg-white text-black font-black py-4 px-8 rounded-xl text-lg hover:bg-[#4FC3F7] transition-colors"
              >
                Order Now
              </button>
              <button
                onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 border border-white/20 text-white font-semibold py-4 px-8 rounded-xl hover:border-white/50 transition-colors text-sm"
              >
                See Reviews
              </button>
            </div>

            <div className="flex flex-wrap gap-5 pt-2">
              {[
                [Truck, 'Free Shipping'],
                [RotateCcw, '30-Day Returns'],
                [Shield, '1-Year Warranty'],
              ].map(([Icon, label]) => (
                <span key={label as string} className="flex items-center gap-2 text-xs text-white/40">
                  <Icon className="w-3.5 h-3.5 text-[#4FC3F7]" />
                  {label as string}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <div className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-8 text-sm">
          <span className="text-white/25 text-xs uppercase tracking-[0.2em] font-semibold hidden md:block">Trusted by athletes at</span>
          {['UFC Performance Institute', 'Gracie Barra', 'AKA', 'Tiger Muay Thai', 'Onnit'].map((org) => (
            <span key={org} className="text-white/40 font-medium">{org}</span>
          ))}
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {[
            { n: '250%', l: 'Dopamine boost', s: 'Post-plunge, lasting hours' },
            { n: '40%', l: 'Less inflammation', s: 'After 3x/week use' },
            { n: '50%', l: 'Faster recovery', s: 'Reduced DOMS' },
            { n: '10k+', l: 'Athletes served', s: 'And counting' },
          ].map(({ n, l, s }) => (
            <div key={l} className="bg-[#060910] px-6 py-10 text-center space-y-1">
              <div className="text-4xl font-black text-white">{n}</div>
              <div className="text-white/80 text-sm font-semibold">{l}</div>
              <div className="text-white/30 text-xs">{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUCT SECTION ── */}
      <section ref={productRef} id="product" className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[1fr_480px] gap-16 items-start">

          {/* Images */}
          <div className="space-y-3 lg:sticky lg:top-24">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#0d1a2e]">
              {!imgError[activeImg] ? (
                <img
                  src={PRODUCT_IMAGES[activeImg]}
                  alt="APEX Cold Plunge Pro"
                  className="w-full h-full object-cover"
                  onError={() => handleImgError(activeImg)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#0d1a2e] to-[#060910]">
                  <div className="w-32 h-32 rounded-full bg-[#4FC3F7]/10 border border-[#4FC3F7]/20 flex items-center justify-center">
                    <span className="text-5xl">❄️</span>
                  </div>
                  <p className="text-white/30 text-xs text-center max-w-xs">Add your product photos from<br />your CJDropshipping supplier</p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {PRODUCT_IMAGES.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-[#4FC3F7]' : 'border-white/10 hover:border-white/30'}`}
                >
                  {!imgError[i] ? (
                    <img src={src} alt="" className="w-full h-full object-cover" onError={() => handleImgError(i)} />
                  ) : (
                    <div className="w-full h-full bg-[#0d1a2e] flex items-center justify-center text-lg">❄️</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Purchase Box */}
          <div className="space-y-7">
            <div className="space-y-2">
              <p className="text-[#4FC3F7] text-xs font-bold tracking-widest uppercase">APEX Cold Plunge</p>
              <h2 className="text-3xl font-black tracking-tight">Cold Plunge Pro</h2>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <span className="text-white/40 text-sm">2,847 verified reviews</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black">${(PRICE / 100).toFixed(0)}</span>
                <span className="text-xl text-white/25 line-through">${(COMPARE_PRICE / 100).toFixed(0)}</span>
                <span className="text-red-400 text-sm font-bold">37% OFF</span>
              </div>
              <p className="text-white/30 text-xs">Free US shipping · Arrives in 3–5 days</p>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <Zap className="w-4 h-4 text-red-400 shrink-0" />
              <div className="flex-1">
                <p className="text-red-400 text-xs font-bold uppercase tracking-wider mb-1">Sale ends in</p>
                <CountdownTimer hours={18} />
              </div>
            </div>

            <ScarcityBar stock={47} total={200} />

            {/* Qty + CTA */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-white/15 rounded-xl overflow-hidden bg-white/5">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3.5 hover:bg-white/10 transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 font-bold min-w-[2.5rem] text-center">{qty}</span>
                  <button onClick={() => setQty(Math.min(5, qty + 1))} className="px-4 py-3.5 hover:bg-white/10 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white hover:bg-[#4FC3F7] text-black font-black py-4 rounded-xl text-base transition-colors"
                >
                  Add to Cart — ${((PRICE * qty) / 100).toFixed(0)}
                </button>
              </div>
              <Link
                href="/store/cart"
                onClick={handleAddToCart}
                className="block w-full border border-white/15 hover:border-white/40 text-white font-semibold py-3.5 rounded-xl text-center text-sm transition-colors"
              >
                Buy Now → Skip to Checkout
              </Link>
            </div>

            {/* Feature checklist */}
            <div className="border-t border-white/[0.07] pt-6 space-y-2.5">
              {[
                "Fits up to 6'5\" and 300 lbs",
                "Holds 39–50°F for 2+ hours",
                "60-second setup, no tools",
                "Military-spec insulated walls",
                "UV-resistant for outdoor use",
                "Packs to carry-on size",
              ].map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm text-white/60">
                  <Check className="w-4 h-4 text-[#4FC3F7] shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 border-t border-white/[0.07] pt-6">
              {[
                [Shield, '1-Year', 'Warranty'],
                [RotateCcw, '30-Day', 'Free Returns'],
                [Truck, 'Free', 'US Shipping'],
              ].map(([Icon, top, bot]) => (
                <div key={top as string} className="flex flex-col items-center gap-1.5 text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <Icon className="w-4 h-4 text-[#4FC3F7]" />
                  <span className="text-white text-xs font-bold leading-none">{top as string}</span>
                  <span className="text-white/30 text-[10px] leading-none">{bot as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECS ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-5">
            <p className="text-[#4FC3F7] text-xs font-bold tracking-[0.3em] uppercase">Specs</p>
            <h2 className="text-4xl font-black leading-tight">Built for athletes.<br />Not for show.</h2>
            <p className="text-white/50 leading-relaxed">Every measurement, material, and design decision was made for one purpose — to let you plunge harder, more often, anywhere.</p>
          </div>
          <div className="divide-y divide-white/[0.06]">
            {specs.map(([key, val]) => (
              <div key={key} className="flex justify-between items-center py-3.5">
                <span className="text-white/40 text-sm">{key}</span>
                <span className="text-white text-sm font-semibold">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-y border-white/[0.06] bg-white/[0.015] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 space-y-3">
            <p className="text-[#4FC3F7] text-xs font-bold tracking-[0.3em] uppercase">Process</p>
            <h2 className="text-4xl font-black">Cold in 60 seconds.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', t: 'Unfold', d: 'Self-supporting structure. No frame, no stakes, no inflation. Drop it anywhere in 10 seconds.' },
              { n: '02', t: 'Fill + Ice', d: '30–70 lbs of ice from any store. Cold tap water. Ready in minutes.' },
              { n: '03', t: 'Plunge', d: '2–5 minutes. The science says 11 minutes/week is optimal. Results from day one.' },
            ].map(({ n, t, d }) => (
              <div key={n} className="relative p-8 rounded-2xl border border-white/[0.07] hover:border-[#4FC3F7]/30 transition-colors bg-white/[0.02]">
                <div className="text-7xl font-black text-white/[0.04] leading-none mb-5">{n}</div>
                <div className="text-xl font-bold mb-2">{t}</div>
                <p className="text-white/40 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <p className="text-[#4FC3F7] text-xs font-bold tracking-[0.3em] uppercase">Reviews</p>
            <h2 className="text-4xl font-black">Real athletes.<br />Real results.</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-6xl font-black text-white leading-none">4.9</div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
              </div>
              <div className="text-white/30 text-xs">2,847 verified purchases</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 space-y-4 hover:border-white/20 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4FC3F7]/30 to-[#0d1a2e] flex items-center justify-center font-black text-sm border border-white/10 shrink-0">
                    {r.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-white/30 text-xs">{r.location}</div>
                  </div>
                </div>
                <span className="text-[10px] bg-[#4FC3F7]/10 text-[#4FC3F7] border border-[#4FC3F7]/20 px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                  {r.tag}
                </span>
              </div>
              <div className="flex gap-0.5">
                {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="font-bold text-sm">{r.title}</p>
              <p className="text-white/50 text-sm leading-relaxed">{r.body}</p>
              <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
                <span className="text-white/25 text-xs">{r.date}</span>
                {r.verified && (
                  <span className="flex items-center gap-1 text-xs text-[#4FC3F7]/60">
                    <Check className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="border-t border-white/[0.06] py-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12 space-y-3">
            <p className="text-[#4FC3F7] text-xs font-bold tracking-[0.3em] uppercase">FAQ</p>
            <h2 className="text-4xl font-black">Every question.<br />Honest answers.</h2>
          </div>
          <div className="divide-y divide-white/[0.06]">
            {faqs.map(({ q, a }, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4"
                >
                  <span className="font-semibold text-white">{q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-4 h-4 text-[#4FC3F7] shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-white/30 shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <div className="pb-5 text-white/50 text-sm leading-relaxed">{a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0d1a2e] to-[#060910] border border-white/[0.07]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4FC3F7]/5 rounded-full blur-3xl" />
          <div className="relative px-8 md:px-16 py-16 text-center space-y-6 max-w-2xl mx-auto">
            <p className="text-[#4FC3F7] text-xs font-bold tracking-[0.3em] uppercase">Limited Time</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Stop losing to<br />slow recovery.
            </h2>
            <p className="text-white/40 leading-relaxed">
              Join 10,000+ athletes. Get 10% off your first order when you join the list.
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
                await fetch('/api/store/waitlist', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, source: 'landing_footer' }),
                });
                (e.currentTarget as HTMLFormElement).reset();
                alert('Check your email for your 10% off code.');
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#4FC3F7] text-sm"
              />
              <button
                type="submit"
                className="bg-white hover:bg-[#4FC3F7] text-black font-black px-6 py-3.5 rounded-xl transition-colors whitespace-nowrap text-sm"
              >
                Get 10% Off
              </button>
            </form>
            <p className="text-white/15 text-xs">No spam. Discount sent instantly.</p>
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#060910]/95 backdrop-blur border-t border-white/10 md:hidden z-40">
        <div className="flex items-center justify-between text-xs text-white/40 mb-2">
          <span className="text-red-400 font-semibold">Only 47 units left</span>
          <span>Free US shipping</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-white hover:bg-[#4FC3F7] text-black font-black py-4 rounded-xl text-base transition-colors"
        >
          Add to Cart — $249 <span className="line-through text-black/30 font-normal text-sm">$399</span>
        </button>
      </div>
    </div>
  );
}
