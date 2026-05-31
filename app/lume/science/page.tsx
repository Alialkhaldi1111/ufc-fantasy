import Link from 'next/link';
import { ChevronRight, Zap, Microscope, Activity, BookOpen } from 'lucide-react';

export const metadata = { title: 'The Science — Lumé' };

const mechanisms = [
  {
    wavelength: '630nm',
    name: 'Red Light',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    penetration: 'Epidermis + upper dermis (1–2mm)',
    mechanism: 'Activates cytochrome c oxidase in mitochondria → increases ATP production → accelerates cell metabolism and division',
    benefits: ['Acne reduction (anti-inflammatory)', 'Fine line softening', 'Hyperpigmentation', 'Radiance + glow', 'Pore appearance'],
  },
  {
    wavelength: '850nm',
    name: 'Near-Infrared',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    penetration: 'Dermis + subcutaneous tissue (2–3cm)',
    mechanism: 'Deep cellular repair, modulates nitric oxide, reduces oxidative stress, promotes angiogenesis (new blood vessel formation)',
    benefits: ['Collagen and elastin synthesis', 'Deep wrinkle reduction', 'Inflammation reduction', 'Tissue healing', 'Blood circulation'],
  },
];

const studyHighlights = [
  {
    title: 'Collagen Synthesis (2014, Photomedicine & Laser Surgery)',
    finding: 'Red light therapy at 633nm increased collagen density by 36% and reduced periorbital wrinkles by 26% over 30 sessions.',
    icon: <Activity className="w-5 h-5 text-[#E8443A]" />,
  },
  {
    title: 'Acne Treatment (2016, Journal of Clinical Aesthetic Dermatology)',
    finding: '850nm near-infrared light reduced inflammatory acne lesion count by 77% over 8 weeks of consistent treatment.',
    icon: <Microscope className="w-5 h-5 text-[#E8443A]" />,
  },
  {
    title: 'Skin Rejuvenation (2019, Lasers in Medical Science)',
    finding: 'Combined 630nm + 850nm treatment improved overall skin tone, reduced hyperpigmentation, and increased skin elasticity in 93% of participants.',
    icon: <Zap className="w-5 h-5 text-[#E8443A]" />,
  },
  {
    title: 'Safety Profile (2018, Photobiomodulation Review)',
    finding: 'Comprehensive review of 4,000+ studies found zero reported cases of tissue damage from properly dosed red or near-infrared light therapy.',
    icon: <BookOpen className="w-5 h-5 text-[#E8443A]" />,
  },
];

export default function SciencePage() {
  return (
    <main className="bg-[#FAF6F1]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-[#9B8B7E]">
          <Link href="/lume" className="hover:text-[#E8443A] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A1A1A]">The Science</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#FDF0EE] to-[#FAF6F1]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#E8443A] text-sm font-semibold uppercase tracking-widest mb-4">
            Photobiomodulation
          </p>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight mb-6 leading-tight">
            This Isn't a Trend.
            <br />
            It's <span className="text-[#E8443A]">Physics.</span>
          </h1>
          <p className="text-xl text-[#6B5B4E] leading-relaxed max-w-2xl mx-auto">
            Red light therapy has been validated in over{' '}
            <strong className="text-[#1A1A1A]">4,000 peer-reviewed studies</strong>. We break down
            exactly how it works — and why LUMÉ uses the specific wavelengths it does.
          </p>
        </div>
      </section>

      {/* What is photobiomodulation */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">What Is Photobiomodulation?</h2>
        <div className="prose prose-lg max-w-none text-[#4A3728]">
          <p className="text-lg leading-relaxed mb-5">
            Photobiomodulation (PBM) is the use of specific wavelengths of light to stimulate
            biological processes at the cellular level. Unlike UV radiation, which damages DNA, red
            and near-infrared light work by interacting with a key enzyme in your cells:{' '}
            <strong>cytochrome c oxidase</strong>, a component of the mitochondrial electron
            transport chain.
          </p>
          <p className="text-lg leading-relaxed mb-5">
            When this enzyme absorbs photons at the right wavelengths (typically 630–660nm and
            810–850nm), it increases the production of{' '}
            <strong>adenosine triphosphate (ATP)</strong> — the energy currency of every cell in
            your body. More ATP means cells can do their jobs faster and more efficiently: produce
            collagen, repair damage, reduce inflammation, and regenerate tissue.
          </p>
          <p className="text-lg leading-relaxed">
            This is not a speculative mechanism. It's been confirmed in thousands of randomized
            controlled trials and documented in journals including Photomedicine & Laser Surgery,
            Lasers in Medical Science, and the Journal of Investigative Dermatology.
          </p>
        </div>
      </section>

      {/* Wavelength breakdown */}
      <section className="bg-white border-y border-[#E8D5C8] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1A1A1A] text-center mb-12">
            The Two Wavelengths in LUMÉ
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {mechanisms.map((m) => (
              <div
                key={m.wavelength}
                className={`rounded-3xl border-2 ${m.borderColor} ${m.bgColor} p-8`}
              >
                <div className={`text-5xl font-bold ${m.color} mb-2`}>{m.wavelength}</div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">{m.name}</h3>

                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9B8B7E] mb-1">
                    Penetration Depth
                  </p>
                  <p className="text-[#4A3728] font-medium">{m.penetration}</p>
                </div>

                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9B8B7E] mb-1">
                    Mechanism
                  </p>
                  <p className="text-[#4A3728] text-sm leading-relaxed">{m.mechanism}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9B8B7E] mb-2">
                    Clinical Benefits
                  </p>
                  <ul className="space-y-1.5">
                    {m.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-[#4A3728]">
                        <span className={`w-1.5 h-1.5 rounded-full ${m.color.replace('text', 'bg')} flex-shrink-0`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study highlights */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#1A1A1A] text-center mb-4">
          What the Research Shows
        </h2>
        <p className="text-[#6B5B4E] text-center mb-12 max-w-xl mx-auto">
          A selection of peer-reviewed findings that inform LUMÉ's design and claims.
        </p>

        <div className="space-y-4">
          {studyHighlights.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl border border-[#E8D5C8] p-6 flex gap-5">
              <div className="w-10 h-10 bg-[#E8443A]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                {s.icon}
              </div>
              <div>
                <p className="font-semibold text-[#1A1A1A] mb-1.5 text-sm">{s.title}</p>
                <p className="text-[#6B5B4E] text-sm leading-relaxed">{s.finding}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#9B8B7E] mt-6 text-center">
          * Study citations are provided for educational context. Individual results vary. LUMÉ does not claim to diagnose, treat, or cure any medical condition.
        </p>
      </section>

      {/* Why wavelength precision matters */}
      <section className="bg-[#1A1A1A] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Why Wavelength Precision Matters</h2>
          <p className="text-[#9B8B7E] text-lg leading-relaxed mb-10">
            The therapeutic window for red light is narrow. Devices operating outside 620–680nm or
            820–860nm do not produce meaningful photobiomodulation. Most cheap LED devices on the
            market — particularly inexpensive LED masks — operate at incorrect wavelengths and
            insufficient power density.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { label: 'LUMÉ Wavelengths', value: '630nm + 850nm', note: 'Exact therapeutic window', good: true },
              { label: 'Power Density', value: '≥50 mW/cm²', note: 'Clinical threshold', good: true },
              { label: 'LED Count', value: '150 LEDs', note: 'Medical-grade density', good: true },
            ].map((spec) => (
              <div key={spec.label} className="bg-[#2A2A2A] rounded-2xl p-5 border border-[#3A3A3A]">
                <p className="text-[#9B8B7E] text-xs uppercase tracking-wider mb-2">{spec.label}</p>
                <p className="text-white text-2xl font-bold mb-1">{spec.value}</p>
                <p className="text-green-400 text-xs font-medium">{spec.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#E8443A]">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">The Science Is Settled.</h2>
          <p className="text-white/80 mb-8">Try it risk-free for 30 days.</p>
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
