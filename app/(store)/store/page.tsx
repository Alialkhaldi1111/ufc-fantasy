'use client';

import { useState, useRef } from 'react';
import { Star, Check, ChevronDown, ChevronUp, Plus, Minus, ArrowRight, Zap } from 'lucide-react';
import { CountdownTimer } from '@/components/store/CountdownTimer';
import { ScarcityBar } from '@/components/store/ScarcityBar';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';

const PRODUCT_ID = 'apex-cold-plunge-v1';
const PRICE = 24900;
const COMPARE_PRICE = 39900;

const reviews = [
  {
    name: 'Marcus T.',
    location: 'Las Vegas, NV',
    rating: 5,
    date: 'Dec 14, 2025',
    title: 'Cut my recovery time in half',
    body: "Train MMA 5 days a week. After adding cold plunge post-session, the next-day soreness that used to wreck me is basically gone. I'm not exaggerating — my coach noticed the difference before I even told him what I changed.",
    verified: true,
    tag: 'MMA Fighter',
  },
  {
    name: 'Jenna M.',
    location: 'Austin, TX',
    rating: 5,
    date: 'Dec 10, 2025',
    title: 'Bought it for my boyfriend, stolen by me',
    body: "He got one use before I claimed it. The sleep improvement alone was worth the price — I fall asleep faster and wake up actually rested. We're ordering a second one.",
    verified: true,
    tag: 'CrossFit Coach',
  },
  {
    name: 'Ryan K.',
    location: 'Denver, CO',
    rating: 5,
    date: 'Nov 28, 2025',
    title: 'Tested next to a $4k permanent unit',
    body: "My buddy has one of those fancy built-in cold plunges. We timed how long both held 50°F — mine edged his out. Setup takes 60 seconds. His took a plumber and a weekend. You do the math.",
    verified: true,
    tag: 'Strength & Conditioning',
  },
  {
    name: 'Derek S.',
    location: 'Chicago, IL',
    rating: 5,
    date: 'Nov 21, 2025',
    title: 'Our whole team uses it now',
    body: "Started bringing it to fight camp. Now the whole team lines up after sessions. We pack it with ice at 6pm — it's still cold the next morning. The insulation is no joke.",
    verified: true,
    tag: 'Amateur Fighter',
  },
  {
    name: 'Aaliyah P.',
    location: 'Atlanta, GA',
    rating: 5,
    date: 'Nov 15, 2025',
    title: 'My inflammation is actually manageable now',
    body: "I have lupus and inflammation is a constant battle. My rheumatologist suggested cold therapy and I was skeptical. Three weeks in — genuinely the best I've felt in two years. This thing changed my life.",
    verified: true,
    tag: 'Marathon Runner',
  },
  {
    name: 'Chris V.',
    location: 'Phoenix, AZ',
    rating: 5,
    date: 'Oct 30, 2025',
    title: "6'3\", 225lbs — fits perfectly",
    body: "I was the guy who kept not buying because I thought it wouldn't fit. It fits. Easily. The walls don't bow, there are no leaks after 45+ uses, and it packs down smaller than a carry-on. No excuses left.",
    verified: true,
    tag: 'BJJ Black Belt',
  },
];

const faqs = [
  {
    q: 'How cold does it actually get?',
    a: 'With ice, you can hit 39–50°F (4–10°C) — the scientifically validated range for cold therapy. The insulated walls keep water at temp for 2+ hours without adding more ice.',
  },
  {
    q: 'How fast is setup, really?',
    a: 'Under 60 seconds. No inflation, no tools, no assembly. Unfold, fill, plunge. We timed it — average first-time user takes 47 seconds.',
  },
  {
    q: "I'm 6'4\". Will I actually fit?",
    a: 'Yes. Designed for athletes up to 6\'5" and 300 lbs. The 32" diameter and 28" depth accommodate larger frames comfortably in a seated position.',
  },
  {
    q: 'How much ice do I need?',
    a: 'For 50°F: 30–40 lbs. For an aggressive 39°F plunge: 60–70 lbs. Standard bags from any grocery or convenience store work perfectly.',
  },
  {
    q: 'Can I leave it outside?',
    a: 'Yes — UV-resistant outer shell handles full sun. Garage, backyard, poolside, rooftop. Some customers even travel with it.',
  },
  {
    q: "What if I don't feel a difference?",
    a: '30-day full refund. No forms, no photos, no questions. Email us and we handle it same day. We\'ve processed 847 orders and issued 12 refunds.',
  },
  {
    q: 'How soon will I notice results?',
    a: 'Most users report better sleep after session one. Measurable reduction in DOMS (delayed onset muscle soreness) within the first week of 3–4x/week use.',
  },
];

export default function StorePage() {
  const [qty, setQty] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { addItem } = useCartStore();
  const productRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ productId: PRODUCT_ID, name: 'APEX Cold Plunge Pro', price: PRICE, image: '🧊' });
    }
  };

  return (
    <div className="text-white overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#080c12] via-[#0a1628] to-[#080c12]" />
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #39FF1415 0%, transparent 60%), radial-gradient(circle at 20% 80%, #00d4ff10 0%, transparent 50%)' }}
        />
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />

        <div className="relative max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 border border-[#39FF14]/30 bg-[#39FF14]/5 rounded-full px-4 py-1.5 text-xs font-semibold text-[#39FF14] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
              Trusted by 10,000+ Athletes
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tight">
                RECOVER
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#00d4ff]">
                  FASTER.
                </span>
                <br />
                PERFORM
                <br />
                LONGER.
              </h1>
              <p className="text-lg text-white/60 max-w-md leading-relaxed">
                The portable ice bath built for athletes who train hard and can&apos;t afford slow recovery. Setup in 60 seconds. Results from session one.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {['M', 'J', 'R', 'D', 'A'].map((l, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#080c12] bg-gradient-to-br from-[#39FF14]/30 to-cyan-500/30 flex items-center justify-center text-xs font-bold text-white">
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-xs text-white/50">4.9/5 from 2,847 reviews</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => productRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center justify-center gap-2 bg-[#39FF14] hover:bg-[#2acc10] text-black font-black px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 active:scale-95"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-sm transition-all"
              >
                Read Reviews
              </button>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              {['Free Shipping', '30-Day Returns', '1-Year Warranty', 'Same-Day Support'].map((b) => (
                <span key={b} className="flex items-center gap-1.5 text-xs text-white/50">
                  <Check className="w-3 h-3 text-[#39FF14]" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Product Visual */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/10 to-cyan-500/10 rounded-3xl blur-2xl scale-110" />
              {/* Main product card */}
              <div className="relative h-full rounded-3xl bg-gradient-to-br from-[#0d1f3c] to-[#0a1628] border border-white/10 overflow-hidden flex flex-col items-center justify-center gap-6 p-8">
                <div className="text-[9rem] leading-none select-none drop-shadow-2xl">🧊</div>
                <div className="text-center space-y-1">
                  <div className="text-white font-black text-2xl tracking-tight">APEX Cold Plunge Pro</div>
                  <div className="text-[#39FF14]/70 font-mono text-xs tracking-widest">PROFESSIONAL GRADE</div>
                </div>
                {/* Stats row */}
                <div className="w-full grid grid-cols-3 gap-2 text-center">
                  {[['60s', 'Setup'], ['39°F', 'Min Temp'], ['2hr+', 'Hold Time']].map(([val, label]) => (
                    <div key={label} className="bg-white/5 rounded-xl py-2.5">
                      <div className="text-[#39FF14] font-black text-lg leading-none">{val}</div>
                      <div className="text-white/40 text-xs mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg shadow-red-500/30 rotate-3">
                SAVE $150
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs animate-bounce">
          <span>Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <div className="border-y border-white/10 bg-white/[0.02] py-5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm">
          <span className="text-white/30 text-xs uppercase tracking-widest font-semibold hidden md:block">Used by athletes at</span>
          {['UFC Performance Institute', 'Gracie Barra', 'American Kickboxing Academy', 'Tiger Muay Thai', 'Onnit Academy'].map((org) => (
            <span key={org} className="text-white/50 font-medium">{org}</span>
          ))}
        </div>
      </div>

      {/* ─── SCIENCE CALLOUT ─── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-[#39FF14] text-xs font-bold tracking-widest uppercase">The Science</div>
            <h2 className="text-4xl font-black leading-tight">
              3 minutes changes your biology. Not a marketing claim.
            </h2>
            <p className="text-white/60 leading-relaxed">
              Cold water immersion at 50°F for 3 minutes triggers a 250% increase in dopamine that lasts for hours, reduces inflammatory markers by up to 40%, and activates brown adipose tissue that accelerates metabolism. This isn&apos;t a wellness trend — it&apos;s the recovery protocol used by professional athletes, published in peer-reviewed journals, and popularized by researchers like Dr. Andrew Huberman.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: '250%', label: 'Dopamine increase', sub: 'Lasts 2–3 hours post-plunge' },
                { stat: '40%', label: 'Inflammation reduction', sub: 'After consistent 3x/week use' },
                { stat: '50%', label: 'Faster DOMS recovery', sub: 'Delayed onset muscle soreness' },
                { stat: '11%', label: 'Metabolic boost', sub: 'Brown fat activation' },
              ].map(({ stat, label, sub }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
                  <div className="text-3xl font-black text-[#39FF14]">{stat}</div>
                  <div className="text-white font-semibold text-sm">{label}</div>
                  <div className="text-white/40 text-xs">{sub}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '⚡', title: 'Instant Recovery', desc: 'Walk in sore. Walk out ready for tomorrow.' },
              { icon: '🧠', title: 'Mental Edge', desc: 'Dopamine surge trains mental toughness like nothing else.' },
              { icon: '😴', title: 'Sleep Like a Pro', desc: 'Core temp regulation = deeper, longer sleep cycles.' },
              { icon: '🔥', title: 'Burn More', desc: 'Shivering burns calories. Brown fat stays activated for hours.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-gradient-to-br from-[#0d1f3c] to-[#080c12] border border-white/10 rounded-2xl p-5 space-y-3 hover:border-[#39FF14]/30 transition-colors">
                <div className="text-3xl">{icon}</div>
                <div className="font-bold text-white text-sm">{title}</div>
                <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUCT SECTION ─── */}
      <section ref={productRef} id="product" className="bg-gradient-to-b from-transparent to-[#0a1628]/50 border-t border-white/10 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Images */}
            <div className="space-y-3 lg:sticky lg:top-20">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#0d1f3c] to-[#060e1a] border border-white/10 flex flex-col items-center justify-center gap-4 overflow-hidden relative">
                <div className="text-[12rem] leading-none select-none">🧊</div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/60 backdrop-blur rounded-xl px-4 py-3 flex items-center justify-between">
                    <span className="text-white/60 text-xs">APEX Cold Plunge Pro</span>
                    <span className="text-[#39FF14] font-mono font-bold text-sm">PRO-GRADE</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  ['Setup', '60 sec', '⏱'],
                  ['Capacity', '300 lbs', '💪'],
                  ['Hold Temp', '2+ hrs', '❄️'],
                ].map(([label, val, icon]) => (
                  <div key={label} className="aspect-square bg-[#0d1f3c] border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-1 hover:border-[#39FF14]/30 transition-colors cursor-pointer">
                    <span className="text-2xl">{icon}</span>
                    <span className="text-[#39FF14] font-black text-sm">{val}</span>
                    <span className="text-white/40 text-xs">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase box */}
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <span className="text-white/50 text-sm">2,847 verified reviews</span>
                </div>
                <h2 className="text-4xl font-black tracking-tight">APEX Cold Plunge Pro</h2>
                <p className="text-white/60 leading-relaxed">
                  Professional-grade portable ice bath. Military-spec insulated walls. Designed for daily use by serious athletes — not casual wellness seekers.
                </p>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-white">${(PRICE / 100).toFixed(0)}</span>
                  <span className="text-2xl text-white/30 line-through">${(COMPARE_PRICE / 100).toFixed(0)}</span>
                  <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-bold px-3 py-1 rounded-full">
                    Save ${((COMPARE_PRICE - PRICE) / 100).toFixed(0)}
                  </span>
                </div>
                <p className="text-white/40 text-sm">One-time purchase. No subscription. Ships within 48 hours.</p>
              </div>

              {/* Countdown */}
              <div className="bg-red-950/30 border border-red-500/20 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-widest">
                  <Zap className="w-3.5 h-3.5" />
                  Sale price expires in
                </div>
                <CountdownTimer hours={18} />
              </div>

              <ScarcityBar stock={47} total={200} />

              {/* Qty + CTA */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-white/20 rounded-xl overflow-hidden">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-white hover:bg-white/10 transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-5 py-3 font-bold text-white min-w-[3rem] text-center">{qty}</span>
                    <button onClick={() => setQty(Math.min(5, qty + 1))} className="px-4 py-3 text-white hover:bg-white/10 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#39FF14] hover:bg-[#2acc10] text-black font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#39FF14]/20"
                  >
                    Add to Cart — ${((PRICE * qty) / 100).toFixed(0)}
                  </button>
                </div>
                <Link
                  href="/store/cart"
                  onClick={handleAddToCart}
                  className="block w-full border border-white/20 hover:border-white/40 text-white font-semibold py-4 rounded-xl text-center text-sm transition-all"
                >
                  Buy Now — Skip to Checkout
                </Link>
              </div>

              {/* Feature list */}
              <div className="border-t border-white/10 pt-6 grid grid-cols-1 gap-3">
                {[
                  'Fits athletes up to 6\'5" and 300 lbs',
                  'Holds 39–50°F for 2+ hours with ice',
                  'Sets up in 60 seconds — no tools needed',
                  'Military-spec reinforced walls — zero flex under load',
                  'UV-resistant exterior for outdoor use',
                  'Packs down to carry-on size for travel',
                  'Drain valve included — empties in 2 minutes',
                ].map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm text-white/70">
                    <Check className="w-4 h-4 text-[#39FF14] shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12 space-y-3">
          <div className="text-[#39FF14] text-xs font-bold tracking-widest uppercase">Process</div>
          <h2 className="text-4xl font-black">Cold in 60 seconds. Every time.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: '01', title: 'Unfold anywhere', desc: 'Garage floor, backyard, bathroom. Self-supporting structure — no frame, no stakes, no inflation. Takes 10 seconds.' },
            { n: '02', title: 'Fill with water + ice', desc: 'Cold tap water plus 30–70 lbs of ice depending on target temperature. Standard bags from any store.' },
            { n: '03', title: 'Plunge 2–5 minutes', desc: 'The science says 11 minutes per week is optimal. Start at 2 minutes, build up. Your body adapts fast.' },
          ].map(({ n, title, desc }) => (
            <div key={n} className="relative group">
              <div className="bg-gradient-to-br from-[#0d1f3c] to-[#080c12] border border-white/10 rounded-3xl p-8 h-full space-y-4 hover:border-[#39FF14]/20 transition-all">
                <div className="text-6xl font-black text-white/5 group-hover:text-[#39FF14]/10 transition-colors leading-none">{n}</div>
                <div className="text-xl font-bold text-white">{title}</div>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section id="reviews" className="bg-white/[0.02] border-y border-white/10 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <div className="text-[#39FF14] text-xs font-bold tracking-widest uppercase">Reviews</div>
              <h2 className="text-4xl font-black">Real athletes. Real results.</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-5xl font-black text-white">4.9</div>
              <div className="space-y-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <div className="text-white/40 text-xs">from 2,847 verified purchases</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((r) => (
              <div key={r.name} className="bg-[#080c12] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-white/20 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#39FF14]/20 to-cyan-500/20 flex items-center justify-center font-black text-white text-sm border border-white/10">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{r.name}</div>
                      <div className="text-white/30 text-xs">{r.location}</div>
                    </div>
                  </div>
                  <span className="text-xs bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20 px-2 py-0.5 rounded-full shrink-0">
                    {r.tag}
                  </span>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <div className="font-bold text-white text-sm">{r.title}</div>
                <p className="text-white/60 text-sm leading-relaxed">{r.body}</p>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-white/30 text-xs">{r.date}</span>
                  {r.verified && (
                    <span className="flex items-center gap-1 text-xs text-[#39FF14]/60">
                      <Check className="w-3 h-3" /> Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center mb-12 space-y-3">
          <div className="text-[#39FF14] text-xs font-bold tracking-widest uppercase">FAQ</div>
          <h2 className="text-4xl font-black">Every question. Honest answers.</h2>
        </div>
        <div className="space-y-2">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left gap-4"
              >
                <span className="font-semibold text-white">{q}</span>
                {openFaq === i
                  ? <ChevronUp className="w-4 h-4 text-[#39FF14] shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-white/40 shrink-0" />
                }
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/10 via-[#0a1628] to-cyan-900/20" />
          <div className="absolute inset-0 border border-[#39FF14]/20 rounded-3xl" />
          <div className="relative px-8 md:px-16 py-16 text-center space-y-6">
            <div className="text-6xl">🧊</div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Stop losing to slow recovery.
              <br />
              <span className="text-[#39FF14]">Start winning with better biology.</span>
            </h2>
            <p className="text-white/60 max-w-lg mx-auto">
              Join 10,000+ athletes who made cold plunging their edge. Get 10% off your first order when you join the list.
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
                alert('Done! Check your email for your 10% off code.');
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#39FF14] text-sm"
              />
              <button
                type="submit"
                className="bg-[#39FF14] hover:bg-[#2acc10] text-black font-black px-6 py-3 rounded-xl transition-colors whitespace-nowrap text-sm"
              >
                Get 10% Off →
              </button>
            </form>
            <p className="text-white/20 text-xs">No spam. Discount sent instantly. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* ─── STICKY MOBILE BAR ─── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#080c12]/95 backdrop-blur border-t border-white/10 md:hidden z-40 space-y-2">
        <div className="flex items-center justify-between text-xs text-white/50">
          <span className="text-red-400 font-semibold">⚡ 47 units left</span>
          <span>Free shipping on all orders</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#39FF14] hover:bg-[#2acc10] text-black font-black py-4 rounded-xl text-lg transition-all active:scale-95"
        >
          Add to Cart — $249 <span className="line-through text-black/40 text-base">$399</span>
        </button>
      </div>
    </div>
  );
}
