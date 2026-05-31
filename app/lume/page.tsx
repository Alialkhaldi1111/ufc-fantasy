import Link from 'next/link';
import { Star, Shield, Truck, RefreshCw, ChevronRight, CheckCircle2, Zap, Microscope, Heart } from 'lucide-react';
import { AddToCartButton } from '@/components/store/AddToCartButton';
import { testimonials } from '@/data/storeProducts';

const trustItems = [
  { icon: <Star className="w-4 h-4 fill-[#C9A96E] text-[#C9A96E]" />, text: '4.9/5 · 2,847 Reviews' },
  { icon: <Shield className="w-4 h-4 text-[#E8443A]" />, text: '30-Day Guarantee' },
  { icon: <Truck className="w-4 h-4 text-[#E8443A]" />, text: 'Free US Shipping' },
  { icon: <RefreshCw className="w-4 h-4 text-[#E8443A]" />, text: 'FDA-Registered' },
];

const steps = [
  {
    step: '01',
    title: 'Cleanse & Dry',
    description: 'Start with clean, dry skin — no serums or makeup.',
  },
  {
    step: '02',
    title: 'Glide & Treat',
    description: 'Glide the wand slowly across your face for 10 minutes. The device guides you.',
  },
  {
    step: '03',
    title: 'Seal & Sleep',
    description: 'Apply your serum immediately after — red light dramatically boosts absorption.',
  },
];

const results = [
  { week: 'Week 2', result: 'Improved skin texture + hydration' },
  { week: 'Week 3–4', result: 'Visible reduction in fine lines' },
  { week: 'Week 6', result: 'Noticeably clearer, more even tone' },
  { week: 'Week 8–12', result: 'Peak collagen results — skin transformation' },
];

const sciencePoints = [
  {
    icon: <Zap className="w-6 h-6 text-[#E8443A]" />,
    title: '630nm Red Light',
    description:
      'Penetrates the epidermis to stimulate fibroblast activity and ATP production — triggering collagen synthesis that reverses surface aging.',
  },
  {
    icon: <Microscope className="w-6 h-6 text-[#E8443A]" />,
    title: '850nm Near-Infrared',
    description:
      'Reaches 2–3cm below skin surface into the dermis. Reduces deep inflammation, accelerates cellular repair, and improves blood circulation.',
  },
  {
    icon: <Heart className="w-6 h-6 text-[#E8443A]" />,
    title: '4,000+ Studies Agree',
    description:
      'Photobiomodulation is one of the most-studied non-invasive therapies. The mechanism is verified, the results are reproducible.',
  },
];

export default function LumeHomePage() {
  return (
    <main className="bg-[#FAF6F1]">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDF0EE] via-[#FAF6F1] to-[#FDE8E0] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E8443A]/10 text-[#E8443A] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8443A] animate-pulse" />
                Clinically-Studied Wavelengths
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.05] mb-6 tracking-tight">
                The Clinic Is{' '}
                <span className="text-[#E8443A]">Overpriced.</span>
                <br />
                Your Skin{' '}
                <span className="italic font-light">Doesn't</span>{' '}
                Have to Wait.
              </h1>

              <p className="text-lg text-[#6B5B4E] leading-relaxed mb-8 max-w-lg">
                LUMÉ harnesses FDA-recognized red and near-infrared light frequencies used by
                dermatologists — to reduce fine lines, clear acne, and restore radiance in{' '}
                <strong className="text-[#1A1A1A]">10 minutes a day, at home.</strong>
              </p>

              {/* Star rating */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C9A96E] text-[#C9A96E]" />
                  ))}
                </div>
                <span className="text-[#4A3728] font-semibold">4.9</span>
                <span className="text-[#9B8B7E] text-sm">· 2,847 verified reviews</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <AddToCartButton
                  productId="glow-wand"
                  productName="Lumé Glow Wand"
                  productTagline="Dual Red Light Therapy Device"
                  price={89}
                  label="Start Glowing — $89"
                  className="sm:max-w-xs"
                />
                <Link
                  href="/lume/products/glow-wand"
                  className="flex items-center justify-center gap-1 text-[#4A3728] font-medium text-sm hover:text-[#E8443A] transition-colors"
                >
                  See full details <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-xs text-[#9B8B7E] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                30-day money-back guarantee · No questions asked
              </p>
            </div>

            {/* Right — product visual */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Glow rings */}
                <div className="absolute inset-0 rounded-full bg-[#E8443A]/10 animate-pulse scale-125" />
                <div className="absolute inset-4 rounded-full bg-[#E8443A]/15 animate-pulse" style={{ animationDelay: '0.5s' }} />

                {/* Product card */}
                <div className="absolute inset-8 rounded-3xl bg-gradient-to-br from-red-100 via-rose-50 to-orange-50 flex flex-col items-center justify-center shadow-2xl border border-red-100">
                  <div className="text-7xl mb-3">✨</div>
                  <div className="text-center px-4">
                    <p className="font-bold text-[#1A1A1A] text-lg">LUMÉ Glow Wand</p>
                    <p className="text-[#9B8B7E] text-xs mt-1">Dual 630nm + 850nm LEDs</p>
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <span className="text-2xl font-bold text-[#E8443A]">$89</span>
                      <span className="text-[#9B8B7E] line-through text-sm">$129</span>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-2 -right-2 bg-[#E8443A] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  Best Seller
                </div>
                <div className="absolute -bottom-4 left-0 bg-white rounded-2xl px-4 py-3 shadow-xl border border-[#E8D5C8]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs font-medium text-[#1A1A1A]">In Stock · Ships in 24hrs</span>
                  </div>
                </div>
                <div className="absolute top-1/4 -left-6 bg-white rounded-2xl px-4 py-3 shadow-xl border border-[#E8D5C8]">
                  <p className="text-xs text-[#9B8B7E]">Results in</p>
                  <p className="text-sm font-bold text-[#1A1A1A]">10–14 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-white border-y border-[#E8D5C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[#4A3728] font-medium">
                {item.icon}
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#E8443A] text-sm font-semibold uppercase tracking-widest mb-3">Simple Ritual</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            How It Works
          </h2>
          <p className="text-[#6B5B4E] mt-4 text-lg max-w-xl mx-auto">
            Three steps. Ten minutes. Results that compound every single day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.step} className="relative bg-white rounded-3xl p-8 shadow-sm border border-[#E8D5C8] hover:shadow-md transition-shadow">
              <div className="text-6xl font-bold text-[#E8443A]/10 leading-none mb-4">{s.step}</div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{s.title}</h3>
              <p className="text-[#6B5B4E] leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESULTS TIMELINE ── */}
      <section className="bg-[#1A1A1A] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#E8443A] text-sm font-semibold uppercase tracking-widest mb-3">
              What to Expect
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Your Results Timeline
            </h2>
            <p className="text-[#9B8B7E] mt-4 text-lg max-w-xl mx-auto">
              Consistent daily use is everything. Here's exactly what happens.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {results.map((r, i) => (
              <div
                key={r.week}
                className="bg-[#2A2A2A] rounded-3xl p-6 border border-[#3A3A3A] hover:border-[#E8443A]/40 transition-colors"
              >
                <div className="text-[#E8443A] font-bold text-sm uppercase tracking-wider mb-3">
                  {r.week}
                </div>
                <p className="text-white font-medium leading-relaxed">{r.result}</p>
                <div className="mt-4 h-1 bg-[#3A3A3A] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#E8443A] to-[#F4B8B2] rounded-full"
                    style={{ width: `${25 * (i + 1)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="results" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#E8443A] text-sm font-semibold uppercase tracking-widest mb-3">Real People</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            No Filters. No Edits.
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#C9A96E] text-[#C9A96E]" />
            ))}
            <span className="text-[#4A3728] font-semibold ml-2">4.9/5 · 2,847 reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-3xl p-7 border border-[#E8D5C8] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A96E] text-[#C9A96E]" />
                ))}
              </div>
              <blockquote className="text-[#1A1A1A] leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">{t.name}</p>
                  <p className="text-[#9B8B7E] text-xs">{t.location}</p>
                </div>
                <div className="bg-[#E8443A]/10 text-[#E8443A] text-xs font-semibold px-3 py-1 rounded-full">
                  Week {t.weeks}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE SCIENCE ── */}
      <section className="bg-gradient-to-br from-[#FDF0EE] to-[#FAF6F1] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#E8443A] text-sm font-semibold uppercase tracking-widest mb-3">
                Photobiomodulation
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight mb-6">
                This Isn't a Trend.
                <br />
                It's Physics.
              </h2>
              <p className="text-[#6B5B4E] text-lg leading-relaxed mb-8">
                Red light therapy has been validated in{' '}
                <strong className="text-[#1A1A1A]">over 4,000 peer-reviewed studies</strong>. The
                mechanism — stimulating mitochondrial ATP production in skin cells — works the same
                way in everyone. It's reproducible, it's documented, and it works.
              </p>
              <Link
                href="/lume/science"
                className="inline-flex items-center gap-2 text-[#E8443A] font-semibold hover:gap-3 transition-all"
              >
                Read the science <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-5">
              {sciencePoints.map((p) => (
                <div key={p.title} className="bg-white rounded-2xl p-6 border border-[#E8D5C8] flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#E8443A]/10 rounded-xl flex items-center justify-center">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A1A] mb-1">{p.title}</h3>
                    <p className="text-[#6B5B4E] text-sm leading-relaxed">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            The Math Is Simple
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl border border-[#E8D5C8] overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 bg-[#1A1A1A] text-white">
              <div className="p-5 font-semibold text-sm">Treatment</div>
              <div className="p-5 font-semibold text-sm text-center border-x border-[#2A2A2A]">Cost Per Session</div>
              <div className="p-5 font-semibold text-sm text-right">Annual Cost</div>
            </div>
            {[
              { name: 'Medi-spa red light session', per: '$95–$150', annual: '~$4,940–$7,800', highlight: false },
              { name: 'Dermatologist laser', per: '$200–$400', annual: '~$5,200+', highlight: false },
              { name: 'Premium at-home device (Joovv)', per: '$600–$3,000 upfront', annual: '$600–$3,000', highlight: false },
              { name: 'LUMÉ Glow Wand', per: '$89 once', annual: '$89. Forever.', highlight: true },
            ].map((row) => (
              <div
                key={row.name}
                className={`grid grid-cols-3 border-t border-[#E8D5C8] ${
                  row.highlight ? 'bg-[#E8443A]/5 border-[#E8443A]/20' : ''
                }`}
              >
                <div className="p-5 text-sm flex items-center gap-2">
                  {row.highlight && <CheckCircle2 className="w-4 h-4 text-[#E8443A] flex-shrink-0" />}
                  <span className={`${row.highlight ? 'font-bold text-[#E8443A]' : 'text-[#4A3728]'}`}>
                    {row.name}
                  </span>
                </div>
                <div
                  className={`p-5 text-sm text-center border-x border-[#E8D5C8] ${
                    row.highlight ? 'font-bold text-[#E8443A]' : 'text-[#6B5B4E]'
                  }`}
                >
                  {row.per}
                </div>
                <div
                  className={`p-5 text-sm text-right ${
                    row.highlight ? 'font-bold text-[#E8443A]' : 'text-[#6B5B4E]'
                  }`}
                >
                  {row.annual}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-[#E8443A] py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Your skin in 30 days —
            <br />
            or your money back.
          </h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            We offer a full 30-day satisfaction guarantee. If LUMÉ doesn't improve your skin,
            we'll refund every dollar. No questions. No hassle.
          </p>

          <AddToCartButton
            productId="glow-wand"
            productName="Lumé Glow Wand"
            productTagline="Dual Red Light Therapy Device"
            price={89}
            label="Claim Your Lumé Wand — $89"
            className="max-w-sm mx-auto bg-white !text-[#E8443A] hover:bg-[#FAF6F1]"
          />

          <div className="flex items-center justify-center gap-8 mt-8 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" />30-Day Guarantee</span>
            <span className="flex items-center gap-1.5"><Truck className="w-4 h-4" />Free Shipping</span>
            <span className="flex items-center gap-1.5"><RefreshCw className="w-4 h-4" />FDA-Registered</span>
          </div>
        </div>
      </section>
    </main>
  );
}
