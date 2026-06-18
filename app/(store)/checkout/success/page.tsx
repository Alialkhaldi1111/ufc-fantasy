'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Instagram, Share2, Package } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-[#39FF14]/20 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-[#39FF14]" />
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl font-black text-white">Order Confirmed! 🧊</h1>
        <p className="text-gray-300 text-lg">
          You&apos;re officially part of the cold plunge movement. Your APEX Cold Plunge is being prepared for shipment.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4">
        <h2 className="font-bold text-white text-lg">What Happens Next</h2>
        <div className="space-y-3">
          {[
            { icon: '📧', title: 'Confirmation Email', desc: 'Check your inbox for order details and tracking info.' },
            { icon: '📦', title: 'Processing (1–2 days)', desc: 'We carefully inspect and pack your order before shipping.' },
            { icon: Package, title: 'Delivery (3–5 days)', desc: 'Your APEX Cold Plunge arrives at your door. Time to plunge!' },
          ].map(({ icon, title, desc }, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#39FF14]/10 rounded-full flex items-center justify-center shrink-0">
                {typeof icon === 'string' ? (
                  <span className="text-sm">{icon}</span>
                ) : (
                  <Package className="w-4 h-4 text-[#39FF14]" />
                )}
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{title}</div>
                <div className="text-gray-400 text-xs">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Viral Loop */}
      <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border border-pink-500/30 rounded-2xl p-6 space-y-4">
        <Instagram className="w-8 h-8 text-pink-400 mx-auto" />
        <h3 className="font-bold text-white text-lg">Show Us Your First Plunge!</h3>
        <p className="text-gray-300 text-sm">
          Tag <strong className="text-pink-400">@APEXColdPlunge</strong> on Instagram when your order arrives. Best posts get featured and win free gear! 🏆
        </p>
        <a
          href="https://instagram.com/APEXColdPlunge"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          <Instagram className="w-4 h-4" />
          Follow @APEXColdPlunge
        </a>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/store"
          className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Continue Shopping
        </Link>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Just ordered the APEX Cold Plunge!',
                text: 'Just ordered the #1 portable ice bath for athletes. Use code APEX20 for 20% off!',
                url: window.location.origin + '/store',
              });
            }
          }}
          className="flex items-center justify-center gap-2 bg-[#39FF14] hover:bg-[#2acc10] text-black font-bold px-6 py-3 rounded-xl transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share & Give 20% Off
        </button>
      </div>
    </div>
  );
}
