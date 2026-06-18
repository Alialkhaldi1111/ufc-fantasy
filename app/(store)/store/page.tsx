'use client';

import { useState } from 'react';
import { Star, Check, Zap, ChevronDown, ChevronUp, Truck, RefreshCcw, Shield, Instagram, Plus, Minus } from 'lucide-react';
import CountdownTimer from '@/components/store/CountdownTimer';
import ScarcityBar from '@/components/store/ScarcityBar';
import TrustBadges from '@/components/store/TrustBadges';
import ReviewCard from '@/components/store/ReviewCard';
import { useCartStore } from '@/store/useCartStore';

const PRODUCT = {
  id: 'apex-cold-plunge-v1',
  name: 'APEX Cold Plunge Pro',
  price: 24900,
  comparePrice: 39900,
  image: '🧊',
};

const reviews = [
  {
    name: 'Marcus T.',
    rating: 5,
    date: 'Dec 14, 2025',
    title: 'Absolute game changer for recovery',
    body: 'I\'ve been training MMA for 6 years and always struggled with next-day soreness. Started using the APEX Cold Plunge 3x a week and my recovery time has been cut in HALF. Sets up in under a minute and stays cold for hours. Worth every penny.',
    verified: true,
  },
  {
    name: 'Jenna M.',
    rating: 5,
    date: 'Dec 10, 2025',
    title: 'I was skeptical... now I\'m obsessed',
    body: 'Honestly I bought this as a gift for my boyfriend and ended up using it more than him. The cold plunge has genuinely improved my sleep and energy levels. The quality is incredible for the price point. 10/10 recommend.',
    verified: true,
  },
  {
    name: 'Ryan K.',
    rating: 5,
    date: 'Nov 28, 2025',
    title: 'Better than the $3,000 alternatives',
    body: 'I researched cold plunges for months before buying this. Tried a friend\'s $3k permanent unit and honestly this portable one keeps water just as cold. I use it in my garage, at the gym, and even brought it camping. Unreal portability.',
    verified: true,
  },
  {
    name: 'Derek S.',
    rating: 5,
    date: 'Nov 21, 2025',
    title: 'My coach recommended it and he was right',
    body: 'Our whole amateur fight team chips in and uses this thing after every session. The insulation is top quality — we pack it with ice at 6pm and it\'s still cold the next morning. Shipping was fast too, arrived in 3 days.',
    verified: true,
  },
  {
    name: 'Aaliyah P.',
    rating: 4,
    date: 'Nov 15, 2025',
    title: 'Love it — just get the ice bags too',
    body: 'Great product overall. Setup is genuinely 60 seconds like advertised. My only tip: buy ice bags in bulk so you\'re never scrambling. The cold exposure has been amazing for my inflammation after runs. Would buy again.',
    verified: true,
  },
  {
    name: 'Chris V.',
    rating: 5,
    date: 'Oct 30, 2025',
    title: 'Fits my 6\'3" frame perfectly',
    body: 'I was worried about fit being 6\'3" and 215 lbs but the APEX accommodates me easily. The thick reinforced walls don\'t flex at all. Used it every day for 30 days straight — zero leaks, zero issues. This thing is built to last.',
    verified: true,
  },
];

const faqs = [
  {
    q: 'How cold does the water get?',
    a: 'With ice, the water reaches 39–50°F (4–10°C) — the optimal range for cold therapy benefits. The APEX insulation keeps temperatures cold for 2+ hours.',
  },
  {
    q: 'How long does setup take?',
    a: 'Exactly 60 seconds. Unfold, fill with water and ice, and you\'re in. The self-supporting structure requires no inflation or frame assembly.',
  },
  {
    q: 'What size is it? Will I fit?',
    a: 'The APEX Cold Plunge accommodates users up to 6\'5" and 300 lbs comfortably. Interior dimensions: 32" diameter × 28" depth.',
  },
  {
    q: 'How much ice do I need?',
    a: 'For a 50°F plunge, you\'ll need about 30–40 lbs of ice. For an extreme 39°F plunge, use 60–70 lbs. Standard bags from any grocery store work perfectly.',
  },
  {
    q: 'Can I use it outdoors?',
    a: 'Yes. The UV-resistant outer shell handles full sun exposure. Perfect for garage, backyard, poolside, or even camping.',
  },
  {
    q: 'What\'s your return policy?',
    a: 'Full 30-day returns, no questions asked. If you don\'t feel a difference in your recovery within 30 days, we\'ll refund you completely.',
  },
  {
    q: 'How long until I feel results?',
    a: 'Most users report improved sleep after the first session and noticeably faster muscle recovery within 1 week of consistent use (3–4 sessions/week).',
  },
];

const benefits = [
  { icon: '⚡', title: 'Faster Recovery', desc: 'Cut muscle soreness by up to 50% with consistent cold exposure post-training.' },
  { icon: '🧠', title: 'Mental Clarity', desc: '2–4 minutes in cold water triggers dopamine levels 250% above baseline — for hours.' },
  { icon: '😴', title: 'Deeper Sleep', desc: 'Cold exposure regulates your body temperature cycle, dramatically improving sleep quality.' },
  { icon: '🔥', title: 'Boost Metabolism', desc: 'Activates brown adipose tissue — your body burns calories just to keep warm.' },
];

const instagramPosts = [
  { handle: '@mma_recovery', text: 'Day 30 of daily cold plunges 🧊 My recovery is insane', emoji: '🥊' },
  { handle: '@fighter_life_daily', text: 'APEX is the move. No cap.', emoji: '💪' },
  { handle: '@icebath_nation', text: 'Got mine 2 weeks ago. Already a different person', emoji: '🧊' },
  { handle: '@ufc_training_tips', text: 'Cold plunge > everything else for recovery', emoji: '🏆' },
  { handle: '@recover_harder', text: 'The portable cold plunge life is undefeated', emoji: '❄️' },
  { handle: '@grappling_goals', text: '3 min cold plunge after every BJJ session. I\'m sold.', emoji: '🥋' },
];

export default function StoreLandingPage() {
  const [qty, setQty] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({ id: PRODUCT.id, name: PRODUCT.name, price: PRODUCT.price, image: PRODUCT.image });
  };

  const savings = PRODUCT.comparePrice - PRODUCT.price;

  return (
    <div className="text-white">
      {/* Discount Banner */}
      <div className="bg-[#39FF14] text-black py-2 px-4 text-center text-sm font-bold">
        🔥 LIMITED TIME: Use code <span className="bg-black text-[#39FF14] px-2 py-0.5 rounded font-mono mx-1">APEX20</span> for 20% off — Sale ends soon!
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Copy */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-300">4.9/5 from <span className="text-white font-semibold">2,847 reviews</span></span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Train Like a{' '}
            <span className="text-[#39FF14]">UFC Champion.</span>
            <br />
            Recover Like One.
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed">
            The <strong className="text-white">APEX Cold Plunge</strong> is the professional-grade portable ice bath used by MMA fighters, elite athletes, and recovery enthusiasts worldwide. Set up in 60 seconds. Feel the difference in 3 minutes.
          </p>

          <ul className="space-y-2">
            {[
              'Fits up to 6\'5", 300 lbs — built for big athletes',
              'Keeps water ice-cold for 2+ hours',
              'Sets up in 60 seconds — no tools needed',
              'Ultra-portable: fits in a gym bag',
              'Military-grade insulated walls',
            ].map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-gray-200">
                <Check className="w-4 h-4 text-[#39FF14] shrink-0" />
                {point}
              </li>
            ))}
          </ul>

          {/* Price & CTA */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black text-white">${(PRODUCT.price / 100).toFixed(0)}</span>
              <span className="text-xl text-gray-500 line-through">${(PRODUCT.comparePrice / 100).toFixed(0)}</span>
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                SAVE ${(savings / 100).toFixed(0)}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-gray-400 font-medium">SALE ENDS IN:</div>
              <CountdownTimer hours={18} />
            </div>

            <ScarcityBar total={100} remaining={47} />

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-white/20 rounded-xl overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-white/10 transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-bold w-10 text-center">{qty}</span>
                <button onClick={() => setQty(Math.min(5, qty + 1))} className="px-3 py-2 hover:bg-white/10 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#39FF14] hover:bg-[#2acc10] text-black font-black py-3 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-95"
              >
                ADD TO CART — ${((PRODUCT.price * qty) / 100).toFixed(0)}
              </button>
            </div>

            <TrustBadges />
          </div>
        </div>

        {/* Right: Product Visual */}
        <div className="relative">
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-cyan-950 via-blue-950 to-[#080c12] border border-white/10 flex flex-col items-center justify-center gap-4 overflow-hidden">
            <div className="text-[10rem] leading-none select-none">🧊</div>
            <div className="text-center space-y-1">
              <div className="text-2xl font-black text-white">APEX Cold Plunge Pro</div>
              <div className="text-[#39FF14] font-mono text-sm">PORTABLE · INSULATED · PRO-GRADE</div>
            </div>
            {/* Floating badges */}
            <div className="absolute top-6 left-6 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              🔥 BESTSELLER
            </div>
            <div className="absolute top-6 right-6 bg-[#39FF14] text-black text-xs font-bold px-3 py-1.5 rounded-full">
              AS SEEN ON UFC
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {['Side view', 'Packaged', 'In use'].map((label) => (
              <div key={label} className="aspect-square rounded-xl bg-gradient-to-br from-cyan-950 to-blue-950 border border-white/10 flex items-center justify-center text-xs text-gray-500">
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="border-y border-white/10 bg-white/5 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <span className="font-semibold text-white">Trusted by athletes at:</span>
            {['UFC Performance Institute', 'Gracie Barra', 'AKA MMA', 'Tiger Muay Thai', 'Team Quest'].map((org) => (
              <span key={org} className="font-medium text-gray-300">• {org}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-black text-center mb-10">
          From Box to <span className="text-[#39FF14]">Cold in 60 Seconds</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Unfold & Fill', desc: 'Unfold the APEX tub, place it anywhere — garage, backyard, bathroom. Fill with cold water.' },
            { step: '02', title: 'Add Ice', desc: 'Add 30–70 lbs of ice depending on target temperature. The insulated walls keep it cold for 2+ hours.' },
            { step: '03', title: 'Plunge & Recover', desc: 'Step in for 2–5 minutes. Feel the dopamine rush. Your muscles start recovering immediately.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="text-5xl font-black text-[#39FF14]/30">{step}</div>
              <div className="text-xl font-bold text-white">{title}</div>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white/5 border-y border-white/10 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-3">
            The Science of <span className="text-[#39FF14]">Cold Therapy</span>
          </h2>
          <p className="text-center text-gray-400 mb-10 max-w-xl mx-auto">
            Used by elite athletes for decades. Now backed by Huberman Lab, Joe Rogan, and dozens of UFC champions.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon, title, desc }) => (
              <div key={title} className="text-center space-y-3">
                <div className="text-5xl">{icon}</div>
                <div className="font-bold text-white">{title}</div>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black">What Athletes Are Saying</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-400 text-sm">4.9 average · 2,847 reviews</span>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white/5 border-y border-white/10 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-white">{q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 text-[#39FF14] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-gray-300 leading-relaxed">{a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Instagram className="w-6 h-6 text-pink-500" />
          <h2 className="text-2xl font-black">Community <span className="text-[#39FF14]">@APEXColdPlunge</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {instagramPosts.map(({ handle, text, emoji }) => (
            <div key={handle} className="aspect-square bg-gradient-to-br from-cyan-950 to-blue-950 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 p-3 hover:border-[#39FF14]/50 transition-colors cursor-pointer">
              <div className="text-3xl">{emoji}</div>
              <div className="text-xs text-[#39FF14] font-medium text-center">{handle}</div>
              <p className="text-xs text-gray-400 text-center leading-tight line-clamp-2">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Email Capture CTA */}
      <section className="max-w-6xl mx-auto px-4 py-10 mb-10">
        <div className="bg-gradient-to-br from-[#39FF14]/10 to-cyan-900/20 border border-[#39FF14]/30 rounded-3xl p-8 md:p-12 text-center space-y-6">
          <div className="text-5xl">🧊</div>
          <h2 className="text-3xl md:text-4xl font-black">
            Join 10,000+ Athletes.<br />
            <span className="text-[#39FF14]">Get 10% Off Your First Order.</span>
          </h2>
          <p className="text-gray-300 max-w-md mx-auto">
            Subscribe for exclusive recovery tips, athlete features, and first access to new products.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const email = (form.elements.namedItem('email') as HTMLInputElement).value;
              await fetch('/api/store/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'landing_cta' }),
              });
              form.reset();
              alert('You\'re in! Check your email for your discount code.');
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#39FF14]"
            />
            <button
              type="submit"
              className="bg-[#39FF14] hover:bg-[#2acc10] text-black font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
            >
              Get 10% Off
            </button>
          </form>
          <p className="text-xs text-gray-500">No spam. Unsubscribe anytime. Discount sent instantly.</p>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#080c12]/95 backdrop-blur border-t border-white/10 md:hidden z-40">
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#39FF14] hover:bg-[#2acc10] text-black font-black py-4 rounded-xl text-lg transition-all active:scale-95"
        >
          ADD TO CART — $249 <span className="line-through text-black/50 text-base ml-1">$399</span>
        </button>
      </div>
    </div>
  );
}
