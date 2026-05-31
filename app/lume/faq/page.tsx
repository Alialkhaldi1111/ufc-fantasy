'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';

const faqCategories = [
  {
    category: 'Results & Effectiveness',
    faqs: [
      {
        q: 'When will I see results?',
        a: 'Skin texture and hydration typically improve within 10–14 days. Visible reduction in fine lines and hyperpigmentation usually appears by weeks 3–4. Significant toning and clarity by week 6. Results compound — most users report their best skin at 8–12 weeks of consistent use.',
      },
      {
        q: 'What skin concerns does LUMÉ address?',
        a: 'Red light therapy is clinically studied for: fine lines and wrinkles, hyperpigmentation and uneven tone, acne (active breakouts), post-acne marks and redness, skin laxity and texture, and general dullness. The 850nm near-infrared mode also addresses deeper inflammation and supports wound healing.',
      },
      {
        q: 'Does it work on all skin tones?',
        a: 'Yes. Red light therapy works on all Fitzpatrick skin types (I through VI). The mechanism is photobiomodulation — light absorbed by mitochondria regardless of melanin content. Skin tone does not affect efficacy.',
      },
      {
        q: 'Can it replace my skincare products?',
        a: 'No — and you wouldn\'t want it to. Red light therapy works synergistically with topical skincare. It actually enhances absorption of serums and moisturizers applied immediately after treatment. Use LUMÉ on clean skin, then apply your routine products right after.',
      },
    ],
  },
  {
    category: 'Using Your Lumé Wand',
    faqs: [
      {
        q: 'How often should I use it?',
        a: 'We recommend 4–6 sessions per week, 10 minutes each. Consistency drives results — think of it like exercise for your skin cells. Daily use is fine and will accelerate results. The auto-shutoff ensures you never over-treat.',
      },
      {
        q: 'How do I use it correctly?',
        a: 'Start with clean, dry skin (no makeup or SPF). Power on, select your mode (Red for surface concerns, NIR for deep repair). Hold the wand 1–2 inches from skin and move slowly in circular or sweeping motions. The device auto-shuts off at 10 minutes. Apply serum immediately after for maximum absorption.',
      },
      {
        q: 'Can I use it around my eyes?',
        a: 'Yes, with care. Keep the wand at least 1 inch from your eye. Close your eyes when treating the periorbital area (crow\'s feet, under-eye). Do not stare directly into the LEDs. The device is safe for use around the delicate eye area with these precautions.',
      },
      {
        q: "What's the difference between Red and NIR modes?",
        a: '630nm Red Light targets the epidermis — it\'s ideal for surface concerns like acne, pigmentation, fine lines, and overall radiance. 850nm Near-Infrared penetrates 2–3cm deeper into the dermis — it\'s better for structural aging (collagen production), deep inflammation, and cellular repair. Most users alternate or use both in the same session.',
      },
    ],
  },
  {
    category: 'Safety & Contraindications',
    faqs: [
      {
        q: 'Is red light therapy safe?',
        a: 'Yes — it\'s one of the safest known therapeutic modalities. Unlike UV light, red and near-infrared wavelengths don\'t cause DNA damage. They work by stimulating cellular energy production. The FDA recognizes red light devices for general wellness use, and thousands of clinical studies confirm the safety profile.',
      },
      {
        q: 'Can I use it while pregnant or nursing?',
        a: 'As a precaution, we recommend consulting your healthcare provider before use during pregnancy or nursing. While no adverse effects are documented, adequate studies in pregnant populations aren\'t available. We err on the side of caution.',
      },
      {
        q: 'I take photosensitizing medications. Can I use LUMÉ?',
        a: 'If you take medications that cause photosensitivity (certain antibiotics, retinoids, diuretics), consult your prescribing physician before use. Red and near-infrared light are generally less photosensitizing than UV, but individual response varies.',
      },
      {
        q: 'Can I use it on tattooed skin?',
        a: 'Generally yes — red light therapy is safe over tattoos. The wavelengths don\'t affect tattoo pigment. However, avoid use on very new tattoos (less than 4 weeks old) during active healing.',
      },
    ],
  },
  {
    category: 'Device & Technical',
    faqs: [
      {
        q: 'Is it FDA approved?',
        a: '"FDA approved" terminology applies to pharmaceuticals. Our device is FDA-registered as a Class II general wellness device, which means it meets all FDA requirements for safety and is registered in the official FDA database. This is the correct classification for LED therapy devices.',
      },
      {
        q: 'How long does the battery last?',
        a: 'One full charge via USB-C delivers approximately 30 ten-minute sessions (about 5 hours of use). Charge time is 90 minutes. The battery indicator light shows charging status.',
      },
      {
        q: "What's the difference between LUMÉ and cheap LED masks?",
        a: 'Three things: wavelength precision, power density, and LED count. Most cheap devices emit light at incorrect wavelengths (outside the therapeutic 630–660nm / 830–850nm window) or at power densities too low to penetrate skin. LUMÉ uses 150 LEDs calibrated to exact therapeutic wavelengths. We\'ve published our specs — most competitors haven\'t.',
      },
      {
        q: 'What is the warranty?',
        a: 'LUMÉ carries a 1-year manufacturer\'s warranty against defects in materials and workmanship. In addition to the warranty, all purchases include a 30-day money-back satisfaction guarantee — a separate, no-questions-asked return policy.',
      },
    ],
  },
  {
    category: 'Shipping & Returns',
    faqs: [
      {
        q: 'How long does shipping take?',
        a: 'Standard US shipping: 7–12 business days (free). Express US shipping: 3–5 business days ($7.99). International: 14–21 business days ($12.99). Orders are processed and shipped within 1–2 business days. You receive a tracking number via email when your order ships.',
      },
      {
        q: 'What is your return policy?',
        a: '30-day money-back guarantee from the date of delivery. If you\'re not satisfied — for any reason — contact support@lumeskin.com within 30 days. We\'ll issue a full refund within 3–5 business days of receiving your return. We provide a prepaid return label for US customers.',
      },
      {
        q: 'What if my device arrives damaged?',
        a: 'Contact us at support@lumeskin.com with a photo of the damage within 7 days of delivery. We\'ll ship a replacement immediately at no charge. You keep the damaged unit — no need to return it.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="bg-[#FAF6F1] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#9B8B7E] mb-8">
          <Link href="/lume" className="hover:text-[#E8443A] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A1A1A]">FAQ</span>
        </nav>

        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-3">Frequently Asked Questions</h1>
        <p className="text-[#6B5B4E] text-lg mb-12">
          Everything you need to know. Can't find your answer?{' '}
          <a href="mailto:support@lumeskin.com" className="text-[#E8443A] font-medium hover:underline">
            Email us
          </a>
          .
        </p>

        <div className="space-y-10">
          {faqCategories.map((cat) => (
            <div key={cat.category}>
              <h2 className="text-xs font-bold text-[#E8443A] uppercase tracking-widest mb-4">
                {cat.category}
              </h2>
              <div className="space-y-2">
                {cat.faqs.map((faq, i) => {
                  const key = `${cat.category}-${i}`;
                  return (
                    <div key={key} className="bg-white rounded-2xl border border-[#E8D5C8] overflow-hidden">
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-start justify-between p-6 text-left gap-4"
                      >
                        <span className="font-semibold text-[#1A1A1A] leading-snug">{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#E8443A] flex-shrink-0 mt-0.5 transition-transform ${
                            openItems[key] ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openItems[key] && (
                        <div className="px-6 pb-6 text-[#6B5B4E] leading-relaxed text-sm">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-white rounded-3xl border border-[#E8D5C8] p-8 text-center">
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Still have questions?</h3>
          <p className="text-[#6B5B4E] mb-5">Our team replies within 4 hours on business days.</p>
          <a
            href="mailto:support@lumeskin.com"
            className="bg-[#E8443A] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#D63A30] transition-colors inline-block"
          >
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
}
