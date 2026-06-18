'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-8">
      {/* Success animation */}
      <div className="relative">
        <div className="text-8xl animate-bounce">🎉</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-[#39FF14]/10 animate-ping" />
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl font-black text-white">Order Confirmed!</h1>
        <p className="text-[#39FF14] font-bold text-xl">
          Welcome to the APEX Cold Plunge family 🧊
        </p>
        <p className="text-white/60">
          Check your email for your order confirmation and tracking info. Your cold plunge ships
          within 24 hours.
        </p>
      </div>

      {/* What's next */}
      <div className="bg-[#0f1520] border border-white/10 rounded-2xl p-6 space-y-4 text-left">
        <h2 className="text-white font-bold text-lg text-center">What&apos;s Next</h2>
        {[
          {
            step: '1',
            title: 'Order Confirmation Email',
            desc: 'You\'ll receive an email with your order details within minutes.',
          },
          {
            step: '2',
            title: 'Processing (24 hours)',
            desc: 'We\'ll prep your APEX Cold Plunge for shipment.',
          },
          {
            step: '3',
            title: 'Ships via FedEx/UPS',
            desc: 'You\'ll get a tracking number via email once shipped (5-7 business days).',
          },
          {
            step: '4',
            title: 'Start Your Recovery Journey',
            desc: 'Follow @APEXColdPlunge for tips on getting the most from your plunge.',
          },
        ].map((s) => (
          <div key={s.step} className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[#39FF14]/20 border border-[#39FF14]/40 flex items-center justify-center flex-shrink-0 text-[#39FF14] font-bold text-sm">
              {s.step}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{s.title}</p>
              <p className="text-white/50 text-xs">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Viral loop */}
      <div className="bg-gradient-to-br from-[#39FF14]/10 to-blue-900/20 border border-[#39FF14]/20 rounded-2xl p-6 space-y-3">
        <p className="text-white font-bold">Share Your First Plunge!</p>
        <p className="text-white/60 text-sm">
          Tag <span className="text-[#39FF14]">@APEXColdPlunge</span> on Instagram and get a 15% off
          coupon for your next order.
        </p>
        <a
          href="https://instagram.com/APEXColdPlunge"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity"
        >
          Follow @APEXColdPlunge on Instagram
        </a>
      </div>

      <Link
        href="/store"
        className="inline-block text-white/60 text-sm hover:text-white transition-colors"
      >
        ← Back to Store
      </Link>
    </div>
  );
}
