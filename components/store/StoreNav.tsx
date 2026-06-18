'use client';

import Link from 'next/link';
import { ShoppingCart, Zap } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function StoreNav() {
  const { itemCount, openCart } = useCartStore();
  const count = itemCount();

  return (
    <nav className="sticky top-0 z-50 bg-[#080c12]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/store" className="flex items-center gap-2 font-bold text-xl">
          <Zap className="w-6 h-6 text-[#39FF14]" />
          <span className="text-white">APEX</span>
          <span className="text-[#39FF14]">Cold Plunge</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/store" className="text-gray-300 hover:text-white text-sm hidden md:block">
            Product
          </Link>
          <Link href="/store/waitlist" className="text-gray-300 hover:text-white text-sm hidden md:block">
            Get Early Access
          </Link>
          <button
            onClick={openCart}
            className="relative p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#39FF14] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
