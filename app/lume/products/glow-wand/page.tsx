'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star, Shield, Truck, ChevronRight, Plus, Minus, Check, ChevronDown } from 'lucide-react';
import { AddToCartButton } from '@/components/store/AddToCartButton';
import { products, bundles, testimonials } from '@/data/storeProducts';

const product = products['glow-wand'];

export default function GlowWandPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'When will I see results?',
      a: 'Skin texture and hydration typically improve within 10–14 days. Visible reduction in fine lines and hyperpigmentation usually appears by weeks 3–4. Results compound — most users report their best skin at 8–12 weeks.',
    },
    {
      q: 'How often should I use it?',
      a: 'Use 4–6 times per week, 10 minutes per session. Consistency is everything — treat it like exercise for your skin cells.',
    },
    {
      q: 'Does it work on all skin tones?',
      a: 'Yes. Red light therapy works on all Fitzpatrick skin types (I–VI). The mechanism is cellular, not pigment-dependent.',
    },
    {
      q: "Is it safe to use near my eyes?",
      a: 'Keep the wand at least 1 inch from your eyes. You can treat the periorbital area (crow\'s feet, under-eyes) with eyes closed. Do not stare directly at the LEDs.',
    },
    {
      q: "What's your return policy?",
      a: '30-day money-back guarantee. Contact us within 30 days of delivery for a full refund. We cover return shipping for US customers.',
    },
  ];

  return (
    <main className="bg-[#FAF6F1]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-[#9B8B7E]">
          <Link href="/lume" className="hover:text-[#E8443A] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/lume" className="hover:text-[#E8443A] transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A1A1A] font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Product hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            {/* Main image */}
            <div
              className={`relative rounded-3xl overflow-hidden aspect-square bg-gradient-to-br ${product.images[selectedImage].gradient} flex items-center justify-center mb-4`}
            >
              <div className="text-center">
                <div className="text-8xl mb-4">✨</div>
                <p className="text-[#4A3728] font-medium text-sm px-8">
                  {product.images[selectedImage].alt}
                </p>
              </div>
              {product.badge && (
                <div className="absolute top-4 left-4 bg-[#E8443A] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {product.badge}
                </div>
              )}
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-xl bg-gradient-to-br ${img.gradient} flex items-center justify-center transition-all ${
                    selectedImage === i
                      ? 'ring-2 ring-[#E8443A] ring-offset-2 ring-offset-[#FAF6F1]'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <span className="text-2xl">✨</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A96E] text-[#C9A96E]" />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#4A3728]">{product.rating}</span>
              <span className="text-sm text-[#9B8B7E]">({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] tracking-tight mb-1">
              {product.name}
            </h1>
            <p className="text-[#6B5B4E] text-lg mb-6">{product.tagline}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-[#E8443A]">${product.price}</span>
              <span className="text-[#9B8B7E] line-through text-lg">${product.originalPrice}</span>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                Save ${product.originalPrice - product.price}
              </span>
            </div>

            <p className="text-[#4A3728] leading-relaxed mb-7">{product.shortDescription}</p>

            {/* Bullets */}
            <ul className="space-y-2.5 mb-8">
              {product.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-[#4A3728]">
                  <Check className="w-4 h-4 text-[#E8443A] flex-shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>

            {/* Quantity + ATC */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-[#E8D5C8] rounded-full overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-[#F0E8E0] transition-colors"
                >
                  <Minus className="w-4 h-4 text-[#1A1A1A]" />
                </button>
                <span className="px-5 font-semibold text-[#1A1A1A] min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-[#F0E8E0] transition-colors"
                >
                  <Plus className="w-4 h-4 text-[#1A1A1A]" />
                </button>
              </div>
              <div className="flex-1">
                <AddToCartButton
                  productId="glow-wand"
                  productName={product.name}
                  productTagline={product.tagline}
                  price={product.price * quantity}
                  label={`Add to Cart — $${product.price * quantity}`}
                />
              </div>
            </div>

            <p className="text-xs text-center text-[#9B8B7E] mb-6">
              Free US shipping · Ships within 24 hours
            </p>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: <Shield className="w-4 h-4" />, text: '30-Day Guarantee' },
                { icon: <Truck className="w-4 h-4" />, text: 'Free Shipping' },
                { icon: <Check className="w-4 h-4" />, text: 'FDA-Registered' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex flex-col items-center gap-1.5 bg-white rounded-xl p-3 border border-[#E8D5C8] text-center"
                >
                  <span className="text-[#E8443A]">{item.icon}</span>
                  <span className="text-xs text-[#4A3728] font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* What's in the box */}
            <div className="bg-white rounded-2xl border border-[#E8D5C8] p-5">
              <h3 className="font-semibold text-[#1A1A1A] text-sm mb-3">What's in the Box</h3>
              <ul className="space-y-2">
                {product.whatsInBox.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#6B5B4E]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8443A] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bundles / Upsell */}
      <section className="bg-white border-y border-[#E8D5C8] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1A1A1A]">Complete Your Ritual</h2>
            <p className="text-[#6B5B4E] mt-2">Most customers see 3× faster results with a bundle</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {bundles.map((bundle) => (
              <div
                key={bundle.id}
                className={`relative rounded-3xl p-7 border-2 transition-all ${
                  bundle.badge === 'Most Popular'
                    ? 'border-[#E8443A] bg-[#FDF0EE]'
                    : 'border-[#E8D5C8] bg-[#FAF6F1] hover:border-[#E8443A]/40'
                }`}
              >
                {bundle.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E8443A] text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    {bundle.badge}
                  </div>
                )}

                <h3 className="font-bold text-[#1A1A1A] text-xl mb-1">{bundle.name}</h3>
                <p className="text-[#6B5B4E] text-sm mb-4">{bundle.description}</p>

                <ul className="space-y-2 mb-5">
                  {bundle.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#4A3728]">
                      <Check className="w-3.5 h-3.5 text-[#E8443A] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-[#E8443A]">${bundle.price}</span>
                  <span className="text-[#9B8B7E] line-through">${bundle.originalPrice}</span>
                  <span className="text-green-600 text-xs font-semibold">Save ${bundle.savings}</span>
                </div>

                <AddToCartButton
                  productId={`bundle-${bundle.id}`}
                  productName={bundle.name}
                  productTagline={bundle.description}
                  price={bundle.price}
                  size="md"
                  variant={bundle.badge === 'Most Popular' ? 'primary' : 'outline'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features deep-dive */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1A1A1A]">Built Different</h2>
          <p className="text-[#6B5B4E] mt-3 max-w-xl mx-auto">
            Every spec was chosen for clinical relevance — not to check a marketing checkbox.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {product.features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 border border-[#E8D5C8]">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-[#1A1A1A] mb-2">{f.title}</h3>
              <p className="text-[#6B5B4E] text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white">Customer Reviews</h2>
              <div className="flex items-center gap-2 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C9A96E] text-[#C9A96E]" />
                ))}
                <span className="text-white font-semibold ml-1">{product.rating}</span>
                <span className="text-[#9B8B7E]">({product.reviewCount.toLocaleString()} reviews)</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {testimonials.slice(0, 4).map((t) => (
              <div key={t.id} className="bg-[#2A2A2A] rounded-2xl p-6 border border-[#3A3A3A]">
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A96E] text-[#C9A96E]" />
                  ))}
                </div>
                <blockquote className="text-white leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-[#9B8B7E] text-xs">{t.location}</p>
                  </div>
                  <span className="bg-[#E8443A]/20 text-[#F4B8B2] text-xs px-2.5 py-1 rounded-full">
                    ✓ Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-[#1A1A1A] text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#E8D5C8] overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-[#1A1A1A] pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#E8443A] flex-shrink-0 transition-transform ${
                    openFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6 text-[#6B5B4E] leading-relaxed text-sm">{faq.a}</div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/lume/faq" className="text-[#E8443A] font-semibold hover:underline">
            View all FAQs →
          </Link>
        </div>
      </section>

      {/* Sticky bottom bar (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8D5C8] p-4 md:hidden z-20">
        <div className="flex items-center gap-3">
          <div>
            <p className="font-bold text-[#1A1A1A] text-lg">${product.price}</p>
            <p className="text-[#9B8B7E] text-xs line-through">${product.originalPrice}</p>
          </div>
          <div className="flex-1">
            <AddToCartButton
              productId="glow-wand"
              productName={product.name}
              productTagline={product.tagline}
              price={product.price}
              size="md"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
