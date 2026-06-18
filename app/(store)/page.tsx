'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { CountdownTimer } from '@/components/store/CountdownTimer';
import { ScarcityBar } from '@/components/store/ScarcityBar';
import { ReviewCard } from '@/components/store/ReviewCard';
import { ProductGallery } from '@/components/store/ProductGallery';
import { TrustBadges } from '@/components/store/TrustBadges';
import { useRouter } from 'next/navigation';

const PRODUCT = {
  productId: 'apex-cold-plunge-v1',
  name: 'APEX Cold Plunge Tub',
  slug: 'apex-cold-plunge',
  price: 24900, // cents
  comparePrice: 39900,
};

const SALE_END = new Date(Date.now() + 6 * 60 * 60 * 1000); // 6 hours from now

const REVIEWS = [
  {
    name: 'Marcus T.',
    date: 'Jan 14, 2026',
    title: 'Game changer for recovery',
    body: "I've been training MMA for 8 years and this is hands down the best recovery tool I own. Sets up in literally under a minute. My soreness after hard sparring sessions has dropped dramatically.",
  },
  {
    name: 'Jessica R.',
    date: 'Jan 8, 2026',
    title: 'Worth every penny',
    body: "Was skeptical at first but after just one week of daily cold plunges my inflammation is way down. The portability is insane — I brought it to my gym and everyone wants one now.",
  },
  {
    name: 'DeShawn M.',
    date: 'Dec 28, 2025',
    title: 'Pro-level recovery at home',
    body: "I compete in amateur MMA and my coach actually recommended this. The water stays cold for way longer than I expected. Fits me perfectly at 6'2\". 10/10.",
  },
  {
    name: 'Lauren K.',
    date: 'Dec 20, 2025',
    title: 'My whole CrossFit box uses these now',
    body: "Started with one and now my entire CrossFit class has ordered. The build quality is excellent. No leaks after 3 months of daily use. Love the APEX brand.",
  },
  {
    name: 'Ryan P.',
    date: 'Dec 15, 2025',
    title: 'Bought two — one for home one for travel',
    body: "Fits in my gym bag no problem. I travel for competitions and having my cold plunge with me has been a massive edge. Sleep quality has also improved a ton.",
  },
  {
    name: 'Amara O.',
    date: 'Nov 30, 2025',
    title: 'The science is real',
    body: "I was a cold plunge skeptic. Now I can't go a day without it. Mental clarity is through the roof. I do 3 minutes every morning and it sets my whole day up right.",
  },
  {
    name: 'Tyler B.',
    date: 'Nov 18, 2025',
    title: 'Great for the price',
    body: "Compared to those $3000+ hard tubs this is an absolute steal. Does exactly the same thing. Easy to fill, easy to empty, easy to store. Super happy with this purchase.",
  },
  {
    name: 'Sofia C.',
    date: 'Nov 5, 2025',
    title: 'Already on my second one',
    body: "Got my first one 6 months ago and it was so good I got a second for my partner. Customer service is great too. Solid company, solid product.",
  },
];

const FAQS = [
  {
    q: 'How quickly does it set up?',
    a: 'The APEX Cold Plunge inflates in under 60 seconds using the included electric pump. Just fill with water and ice — you\'re ready to plunge.',
  },
  {
    q: 'How long does it stay cold?',
    a: 'With a standard bag of ice the water stays cold for 2+ hours. For longer sessions you can add more ice or use a chiller (sold separately).',
  },
  {
    q: 'What size can it fit?',
    a: 'The APEX Cold Plunge comfortably fits athletes up to 6\'5" and 300 lbs. The reinforced seams are rated for 400 lbs static load.',
  },
  {
    q: 'Is it durable for daily use?',
    a: 'Absolutely. Made from military-grade PVC with triple-layer reinforcement. Designed for daily use — our testing puts it at 1,000+ inflations before any wear.',
  },
  {
    q: 'Can I use it indoors?',
    a: 'Yes! Many customers use it in their bathroom, garage, or backyard. Just make sure you have a drain nearby — the included hose makes emptying easy.',
  },
  {
    q: 'What comes in the box?',
    a: 'APEX Cold Plunge tub, high-speed electric pump, drainage hose, carry bag, thermometer, and quick-start guide.',
  },
  {
    q: 'What is the return policy?',
    a: 'We offer a 30-day no-questions-asked return policy. If you\'re not completely satisfied, contact us and we\'ll arrange a free pickup and full refund.',
  },
  {
    q: 'How long is the warranty?',
    a: 'Full 1-year warranty covering any manufacturing defects. We\'ll replace your tub for free if anything goes wrong.',
  },
];

export default function StorePage() {
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailDone, setEmailDone] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { addItem } = useCartStore();
  const router = useRouter();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(PRODUCT);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setEmailLoading(true);
    try {
      await fetch('/api/store/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'landing_cta' }),
      });
      setEmailDone(true);
    } catch {
      // still show success UX
      setEmailDone(true);
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="pb-24 md:pb-0">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080c12] via-blue-950/30 to-[#39FF14]/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(57,255,20,0.08)_0%,_transparent_70%)]" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {/* Social proof pill */}
            <div className="inline-flex items-center gap-2 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-full px-4 py-1.5">
              <span className="text-yellow-400 text-sm">★★★★★</span>
              <span className="text-white/80 text-sm font-medium">4.9/5 · 2,847 reviews</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
              Train Like a UFC Champion.{' '}
              <span className="text-[#39FF14]">Recover Like One.</span>
            </h1>

            <p className="text-xl text-white/70 leading-relaxed">
              The APEX Cold Plunge — portable inflatable ice bath used by professional MMA fighters
              worldwide. Set up in 60 seconds. Recover in minutes.
            </p>

            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black text-white">$249</span>
              <span className="text-2xl text-white/40 line-through">$399</span>
              <span className="bg-[#FF3131] text-white text-sm font-bold px-2 py-1 rounded">
                SAVE $150
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-white/60">
                Sale ends in:{' '}
                <CountdownTimer targetDate={SALE_END} className="text-[#FF3131] text-base" />
              </p>
              <ScarcityBar stock={47} total={200} />
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full md:w-auto bg-[#39FF14] text-black font-black text-xl px-12 py-5 rounded-xl hover:bg-[#2acc10] transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(57,255,20,0.4)]"
            >
              GET YOURS — $249
            </button>

            <TrustBadges compact />
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900 via-[#080c12] to-[#39FF14]/20 border border-white/10 shadow-2xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-[120px] leading-none">🧊</div>
                <p className="text-white/40 text-sm uppercase tracking-widest">APEX Cold Plunge</p>
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-[#FF3131] text-white px-3 py-2 rounded-xl text-sm font-bold shadow-lg">
              🔥 47 left!
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#0f1520] border border-[#39FF14]/30 text-white px-3 py-2 rounded-xl text-sm font-semibold shadow-lg">
              ✅ Ships in 24 hours
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <section className="bg-white/5 border-y border-white/10 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-white/50 text-sm mb-3 uppercase tracking-widest">Used and recommended by</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-white/70 text-sm font-semibold">
            {['@ufc_fighter_1', '@mma_recovery', '@cold_therapy_lab', '@octagon_prep', '@ice_bath_king', '@fighter_wellness'].map((h) => (
              <span key={h} className="text-[#39FF14]/70">{h}</span>
            ))}
          </div>
          <p className="text-center text-white/40 text-sm mt-3">10,000+ cold plungers worldwide</p>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section id="product" className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <ProductGallery name="APEX Cold Plunge" />

          <div className="space-y-6 lg:sticky lg:top-24">
            <div>
              <p className="text-[#39FF14] text-sm font-semibold uppercase tracking-widest mb-2">
                Most Popular
              </p>
              <h2 className="text-3xl font-black text-white">APEX Cold Plunge Tub</h2>
              <p className="text-white/60 mt-2 leading-relaxed">
                The portable inflatable ice bath engineered for elite recovery. Military-grade PVC,
                insulated walls, and a design that fits where hard tubs can&apos;t.
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-white">$249</span>
              <span className="text-xl text-white/40 line-through">$399</span>
              <span className="bg-[#FF3131] text-white text-sm font-bold px-2 py-1 rounded">
                38% OFF
              </span>
            </div>

            {/* Countdown */}
            <div className="bg-[#FF3131]/10 border border-[#FF3131]/30 rounded-xl p-4">
              <p className="text-[#FF3131] text-sm font-semibold">
                ⏰ Sale ends in: <CountdownTimer targetDate={SALE_END} className="text-lg" />
              </p>
            </div>

            <ScarcityBar stock={47} />

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="text-white/70 text-sm">Qty:</span>
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-white/70 hover:text-white w-6 h-6 flex items-center justify-center"
                >
                  −
                </button>
                <span className="text-white font-bold w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="text-white/70 hover:text-white w-6 h-6 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="space-y-3">
              <button
                onClick={handleBuyNow}
                className="w-full bg-[#39FF14] text-black font-black text-xl py-5 rounded-xl hover:bg-[#2acc10] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(57,255,20,0.3)]"
              >
                BUY NOW — ${(PRODUCT.price * quantity / 100).toFixed(2)}
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full border-2 border-[#39FF14] text-[#39FF14] font-black text-xl py-4 rounded-xl hover:bg-[#39FF14]/10 transition-all"
              >
                ADD TO CART
              </button>
            </div>

            {/* Highlights */}
            <div className="space-y-2 border-t border-white/10 pt-5">
              {[
                'Fits up to 6\'5", 300 lbs',
                'Sets up in 60 seconds',
                'Keeps water ice cold for 2+ hours',
                'Portable — fits in a backpack',
                'Built for daily use — 1,000+ cycle tested',
                'Free US shipping on all orders',
              ].map((h) => (
                <p key={h} className="text-white/80 text-sm flex items-center gap-2">
                  <span className="text-[#39FF14]">✅</span> {h}
                </p>
              ))}
            </div>

            <TrustBadges compact />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#0f1520] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: '💨',
                title: 'Inflate in 60 Seconds',
                desc: 'Use the included electric pump. Fully inflated and ready to fill in under a minute.',
              },
              {
                step: '02',
                icon: '🧊',
                title: 'Fill with Ice & Water',
                desc: 'Add cold water and 1-2 bags of ice. Temperature drops to optimal range in minutes.',
              },
              {
                step: '03',
                icon: '⚡',
                title: 'Plunge & Recover',
                desc: 'Start with 2-3 minutes. Work up to 10-15 minutes for maximum recovery benefits.',
              },
            ].map((step) => (
              <div key={step.step} className="text-center space-y-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-[#39FF14]/30 text-5xl font-black">{step.step}</div>
                <div className="text-5xl">{step.icon}</div>
                <h3 className="text-white font-bold text-lg">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-white mb-6">
              The Science Behind Cold Exposure
            </h2>
            <div className="space-y-5">
              {[
                {
                  title: 'Reduce Muscle Soreness by 40%',
                  desc: 'Cold immersion constricts blood vessels, flushing out lactic acid and inflammatory markers that cause post-workout soreness.',
                },
                {
                  title: 'Boost Dopamine by 250%',
                  desc: 'Cold exposure triggers a massive dopamine surge that lasts 2-3 hours — enhancing focus, mood, and motivation.',
                },
                {
                  title: 'UFC Fighter Recovery Protocol',
                  desc: 'Top MMA athletes use cold plunging between training sessions to compress 48 hours of recovery into 12, training harder and more frequently.',
                },
                {
                  title: 'Improve Mental Toughness',
                  desc: 'Regular cold exposure builds stress tolerance, teaching your mind to stay calm under pressure — a critical edge in competition.',
                },
              ].map((b) => (
                <div key={b.title} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#39FF14] flex-shrink-0 mt-2" />
                  <div>
                    <p className="text-white font-semibold">{b.title}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/50 to-[#39FF14]/10 rounded-2xl p-8 border border-white/10 text-center space-y-6">
            <div className="text-8xl">🧬</div>
            <h3 className="text-2xl font-black text-white">Backed by Science</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: '40%', label: 'Less soreness' },
                { stat: '250%', label: 'Dopamine boost' },
                { stat: '2x', label: 'Faster recovery' },
                { stat: '10k+', label: 'Athletes worldwide' },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 rounded-xl p-4">
                  <p className="text-[#39FF14] font-black text-2xl">{s.stat}</p>
                  <p className="text-white/60 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="bg-[#0f1520] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-2">What Athletes Are Saying</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="text-yellow-400 text-2xl">★★★★★</span>
              <span className="text-white font-bold text-xl">4.9 / 5</span>
              <span className="text-white/50">(2,847 reviews)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((r) => (
              <ReviewCard key={r.name} {...r} />
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM FEED */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-black text-white text-center mb-4">
          @APEXColdPlunge on Instagram
        </h2>
        <p className="text-white/50 text-center mb-10">Tag us for a chance to be featured</p>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-gradient-to-br from-blue-900/50 to-[#39FF14]/10 border border-white/10 flex items-center justify-center hover:border-[#39FF14]/50 transition-colors cursor-pointer"
            >
              <span className="text-2xl">🧊</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#0f1520] py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-semibold">{faq.q}</span>
                  <span className="text-white/50 text-xl ml-4 flex-shrink-0">
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-white/70 text-sm leading-relaxed border-t border-white/10 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA / EMAIL CAPTURE */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl font-black text-white">
            Join 10,000+ Athletes
          </h2>
          <p className="text-white/60 text-lg">
            Get 10% off your first order + exclusive recovery tips from pro fighters.
          </p>

          {emailDone ? (
            <div className="bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-xl p-6">
              <p className="text-[#39FF14] font-bold text-lg">
                You&apos;re in! Check your email for your 10% off code.
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#39FF14]/50"
                required
              />
              <button
                type="submit"
                disabled={emailLoading}
                className="bg-[#39FF14] text-black font-black px-6 py-4 rounded-xl hover:bg-[#2acc10] transition-colors disabled:opacity-50"
              >
                {emailLoading ? '...' : 'GET 10% OFF'}
              </button>
            </form>
          )}

          <p className="text-white/30 text-xs">No spam. Unsubscribe anytime.</p>

          {/* Final buy button */}
          <div className="pt-6 border-t border-white/10">
            <button
              onClick={handleBuyNow}
              className="bg-[#39FF14] text-black font-black text-2xl px-16 py-6 rounded-2xl hover:bg-[#2acc10] transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(57,255,20,0.4)]"
            >
              GET YOUR APEX NOW — $249
            </button>
            <p className="text-white/40 text-sm mt-3">
              Free shipping · 30-day returns · 1-year warranty
            </p>
          </div>
        </div>
      </section>

      {/* STICKY MOBILE BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#080c12] border-t border-white/20 p-4">
        <button
          onClick={handleBuyNow}
          className="w-full bg-[#39FF14] text-black font-black text-lg py-4 rounded-xl hover:bg-[#2acc10] transition-colors"
        >
          ADD TO CART — $249
        </button>
      </div>
    </div>
  );
}
