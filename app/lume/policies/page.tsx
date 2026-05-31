import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata = { title: 'Policies — Lumé' };

const sections = [
  {
    id: 'shipping',
    title: 'Shipping Policy',
    content: [
      {
        heading: 'Processing Time',
        text: 'All orders are processed within 1–2 business days (Monday–Friday, excluding public holidays). You will receive an email confirmation and tracking number once your order ships.',
      },
      {
        heading: 'US Shipping',
        text: 'Standard shipping (7–12 business days): FREE on all orders. Express shipping (3–5 business days): $7.99. All US shipments include tracking.',
      },
      {
        heading: 'International Shipping',
        text: 'We ship to Canada, Australia, UK, and select European countries. International standard shipping (14–21 business days): $12.99 flat rate. International express options available at checkout.',
      },
      {
        heading: 'Lost or Delayed Packages',
        text: 'If your package is not delivered within the estimated timeframe, contact us at support@lumeskin.com. We will investigate with the carrier and, if necessary, reship your order at no additional charge.',
      },
    ],
  },
  {
    id: 'returns',
    title: 'Return & Refund Policy',
    content: [
      {
        heading: '30-Day Money-Back Guarantee',
        text: 'We stand behind LUMÉ completely. If you are not satisfied with your purchase for any reason, contact us within 30 days of delivery for a full refund. No questions asked.',
      },
      {
        heading: 'How to Return',
        text: 'Email support@lumeskin.com with your order number and reason (optional). We will email you a prepaid return shipping label (US customers). Ship the product back in its original packaging. Once received, your refund will be processed within 3–5 business days.',
      },
      {
        heading: 'Refund Method',
        text: 'Refunds are issued to your original payment method. Credit card refunds may take 3–7 business days to appear on your statement depending on your bank.',
      },
      {
        heading: 'Damaged or Defective Items',
        text: 'If your item arrives damaged or defective, email us at support@lumeskin.com with a photo within 7 days of delivery. We will send a replacement immediately at no charge. You keep the damaged unit.',
      },
      {
        heading: 'Exchanges',
        text: 'We do not process traditional exchanges. To exchange a product, return the original (per the return policy above) and place a new order for the desired item.',
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    content: [
      {
        heading: 'Information We Collect',
        text: 'When you make a purchase, we collect: name, email address, shipping address, billing address, and payment information (processed securely by Stripe — we never store card numbers). We also collect browsing data via cookies to improve your experience.',
      },
      {
        heading: 'How We Use Your Information',
        text: 'To process and fulfill your order. To send order confirmations and shipping updates. To send marketing emails (you can unsubscribe at any time). To improve our website and product offerings. We never sell your personal data to third parties.',
      },
      {
        heading: 'Cookies',
        text: 'We use essential cookies (required for checkout), analytics cookies (Google Analytics — anonymized), and marketing cookies (Meta Pixel, TikTok Pixel) to measure ad effectiveness. You can opt out of non-essential cookies in our cookie banner.',
      },
      {
        heading: 'Your Rights (GDPR / CCPA)',
        text: 'You have the right to: access your personal data, request deletion of your data, opt out of marketing communications, and request portability of your data. Contact privacy@lumeskin.com for any data requests.',
      },
      {
        heading: 'Data Retention',
        text: 'We retain order data for 7 years (tax compliance). Marketing data is deleted within 2 years of your last interaction. You can request earlier deletion at any time.',
      },
    ],
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    content: [
      {
        heading: 'Use of This Website',
        text: 'By using lumeskin.com, you agree to these Terms of Service. This site and its content are owned by Lumé Skin Inc. Unauthorized reproduction of content is prohibited.',
      },
      {
        heading: 'Product Disclaimer',
        text: 'The Lumé Glow Wand is an FDA-registered general wellness device. It is not intended to diagnose, treat, cure, or prevent any disease or medical condition. Consult your healthcare provider before use if you have a medical condition.',
      },
      {
        heading: 'Individual Results',
        text: 'Testimonials and before/after images reflect individual experiences and results. Results are not guaranteed and will vary based on skin type, age, consistency of use, and other factors.',
      },
      {
        heading: 'Intellectual Property',
        text: 'All content on this website — including text, images, graphics, logos, and copy — is the exclusive property of Lumé Skin Inc. and may not be used without express written permission.',
      },
      {
        heading: 'Limitation of Liability',
        text: 'Lumé Skin Inc. is not liable for any incidental, indirect, or consequential damages arising from use of our products or website. Our total liability to any customer shall not exceed the amount paid for the product in question.',
      },
    ],
  },
];

export default function PoliciesPage() {
  return (
    <main className="bg-[#FAF6F1] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#9B8B7E] mb-8">
          <Link href="/lume" className="hover:text-[#E8443A] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A1A1A]">Policies</span>
        </nav>

        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-3">Legal & Policies</h1>
        <p className="text-[#6B5B4E] text-lg mb-4">
          Questions? Email us at{' '}
          <a href="mailto:support@lumeskin.com" className="text-[#E8443A] hover:underline">
            support@lumeskin.com
          </a>
        </p>
        <p className="text-xs text-[#9B8B7E] mb-12">Last updated: January 1, 2026</p>

        {/* TOC */}
        <div className="bg-white rounded-2xl border border-[#E8D5C8] p-6 mb-12">
          <h2 className="font-semibold text-[#1A1A1A] mb-4">Contents</h2>
          <div className="grid md:grid-cols-2 gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2 text-[#E8443A] text-sm font-medium hover:underline"
              >
                <ChevronRight className="w-3 h-3" />
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {sections.map((section) => (
            <div key={section.id} id={section.id}>
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8 pb-4 border-b border-[#E8D5C8]">
                {section.title}
              </h2>
              <div className="space-y-7">
                {section.content.map((item) => (
                  <div key={item.heading}>
                    <h3 className="font-bold text-[#1A1A1A] mb-2">{item.heading}</h3>
                    <p className="text-[#4A3728] leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-3xl border border-[#E8D5C8] p-8 text-center">
          <p className="text-[#4A3728] mb-4">
            Questions about any of our policies? We're here to help.
          </p>
          <a
            href="mailto:support@lumeskin.com"
            className="bg-[#E8443A] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#D63A30] transition-colors inline-block"
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
}
