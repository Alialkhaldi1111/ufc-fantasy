import Link from 'next/link';
import { ChevronRight, Heart, Zap, Shield } from 'lucide-react';

export const metadata = { title: 'About Lumé' };

const values = [
  {
    icon: <Zap className="w-6 h-6 text-[#E8443A]" />,
    title: 'Accessible Science',
    description:
      'We take technology proven in clinical settings and put it in your hands at a price that doesn\'t require financing.',
  },
  {
    icon: <Shield className="w-6 h-6 text-[#E8443A]" />,
    title: 'Honest Claims Only',
    description:
      'We cite peer-reviewed research. No buzzwords, no pseudoscience. If we can\'t back it up, we don\'t say it.',
  },
  {
    icon: <Heart className="w-6 h-6 text-[#E8443A]" />,
    title: 'Real Guarantee',
    description:
      'Our 30-day money-back guarantee isn\'t a policy — it\'s proof we believe in what we sell.',
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#FAF6F1]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-[#9B8B7E]">
          <Link href="/lume" className="hover:text-[#E8443A] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A1A1A]">About</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#FDF0EE] via-[#FAF6F1] to-[#FAF6F1]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#E8443A] text-sm font-semibold uppercase tracking-widest mb-4">Our Story</p>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight mb-6 leading-tight">
            We Built LUMÉ Because
            <br />
            the Alternatives Were{' '}
            <span className="text-[#E8443A]">Unacceptable.</span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="prose prose-lg max-w-none">
          <p className="text-[#4A3728] text-xl leading-relaxed mb-6">
            When our founder started getting treatments at her dermatologist's office for early
            signs of aging, the math didn't add up. <strong>$95 per session. Two sessions per week
            recommended.</strong> That's nearly $10,000 a year — for access to a technology that
            costs a fraction of that to produce.
          </p>

          <p className="text-[#4A3728] text-lg leading-relaxed mb-6">
            The professional devices existed. They were just locked behind clinic walls and
            absurd price tags. The same wavelengths. The same LEDs. The same results — reserved
            for those who could afford the premium.
          </p>

          <p className="text-[#4A3728] text-lg leading-relaxed mb-6">
            So we sourced the same clinical-grade LED technology. We engineered it into something
            you can hold in your hand and use in your bathroom. We priced it at what it should
            cost — not what the industry decided your desperation was worth.
          </p>

          <blockquote className="border-l-4 border-[#E8443A] pl-6 my-10">
            <p className="text-2xl font-bold text-[#1A1A1A] italic leading-snug">
              "LUMÉ is our answer to an industry that profits from making skincare seem more
              complicated than it is."
            </p>
          </blockquote>

          <p className="text-[#4A3728] text-lg leading-relaxed">
            The science is real. The results are real. And now, they're accessible to everyone.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 border-y border-[#E8D5C8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1A1A1A] text-center mb-12">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-14 h-14 bg-[#E8443A]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  {v.icon}
                </div>
                <h3 className="font-bold text-[#1A1A1A] text-xl mb-3">{v.title}</h3>
                <p className="text-[#6B5B4E] leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { number: '2,847+', label: 'Happy Customers' },
            { number: '4.9/5', label: 'Average Rating' },
            { number: '4,000+', label: 'Studies on RLT' },
            { number: '100%', label: 'Satisfaction or Refund' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-5xl font-bold text-[#E8443A] mb-2">{s.number}</p>
              <p className="text-[#6B5B4E] font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#E8443A] py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Glow?</h2>
          <p className="text-white/80 mb-8">Join 2,847+ people who made the switch.</p>
          <Link
            href="/lume/products/glow-wand"
            className="bg-white text-[#E8443A] font-semibold px-8 py-4 rounded-full hover:bg-[#FAF6F1] transition-colors inline-block"
          >
            Shop the Glow Wand — $89
          </Link>
        </div>
      </section>
    </main>
  );
}
