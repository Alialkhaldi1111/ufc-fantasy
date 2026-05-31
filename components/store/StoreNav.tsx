'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { CartDrawer } from './CartDrawer';

const navLinks = [
  { label: 'Shop', href: '/lume/products/glow-wand' },
  { label: 'Science', href: '/lume/science' },
  { label: 'Results', href: '/lume/#results' },
  { label: 'About', href: '/lume/about' },
];

export function StoreNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCart, items } = useCartStore();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <CartDrawer />

      {/* Announcement bar */}
      <div className="bg-[#E8443A] text-white text-center py-2.5 px-4 text-sm font-medium">
        <span className="flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          Free US shipping on all orders · 30-day money-back guarantee
          <Sparkles className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Main nav */}
      <nav className="bg-[#FAF6F1] border-b border-[#E8D5C8] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/lume" className="flex items-center gap-1">
              <span className="text-2xl font-bold tracking-tight text-[#1A1A1A]">
                LUM<span className="text-[#E8443A]">É</span>
              </span>
              <span className="text-[10px] text-[#9B8B7E] tracking-[0.2em] uppercase font-medium self-end mb-0.5">
                ™
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[#4A3728] hover:text-[#E8443A] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link
                href="/lume/products/glow-wand"
                className="hidden sm:block bg-[#E8443A] text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-[#D63A30] transition-colors"
              >
                Shop Now
              </Link>

              {/* Cart icon */}
              <button
                onClick={openCart}
                className="relative p-2 hover:bg-[#F0E8E0] rounded-full transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-[#1A1A1A]" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#E8443A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu */}
              <button
                className="md:hidden p-2 hover:bg-[#F0E8E0] rounded-full transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? (
                  <X className="w-5 h-5 text-[#1A1A1A]" />
                ) : (
                  <Menu className="w-5 h-5 text-[#1A1A1A]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#E8D5C8] bg-[#FAF6F1] px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-[#4A3728] font-medium py-2 hover:text-[#E8443A] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/lume/products/glow-wand"
              onClick={() => setMobileOpen(false)}
              className="block bg-[#E8443A] text-white text-center font-medium px-5 py-3 rounded-full hover:bg-[#D63A30] transition-colors mt-2"
            >
              Shop Now — $89
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
