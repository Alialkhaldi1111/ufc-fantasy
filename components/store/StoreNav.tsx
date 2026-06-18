'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export function StoreNav() {
  const itemCount = useCartStore((s) => s.itemCount());
  const openCart = useCartStore((s) => s.openCart);

  return (
    <nav className="sticky top-0 z-50 bg-[#080c12]/90 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/store" className="flex items-center gap-2">
          <span className="text-[#39FF14] font-black text-xl tracking-tight">APEX</span>
          <span className="text-white/60 text-xs uppercase tracking-widest">Cold Plunge</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
          <Link href="/store#product" className="hover:text-white transition-colors">Product</Link>
          <Link href="/store#reviews" className="hover:text-white transition-colors">Reviews</Link>
          <Link href="/store#faq" className="hover:text-white transition-colors">FAQ</Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative p-2 text-white hover:text-[#39FF14] transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#39FF14] text-black text-xs font-bold rounded-full w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center leading-none px-0.5">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
