import type { ReactNode } from 'react';
import { StoreNav } from '@/components/store/StoreNav';
import { CartDrawer } from '@/components/store/CartDrawer';
import { DiscountBanner } from '@/components/store/DiscountBanner';

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080c12] text-white flex flex-col">
      <DiscountBanner />
      <StoreNav />
      <main className="flex-1">{children}</main>
      <CartDrawer />
      <footer className="border-t border-white/10 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-3">
          <p className="text-[#39FF14] font-black text-lg">APEX Cold Plunge</p>
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} APEX Cold Plunge. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-white/40">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Shipping Policy</span>
            <span>Refund Policy</span>
          </div>
          <p className="text-white/30 text-xs">
            Questions? Email us at support@apexcoldplunge.com
          </p>
        </div>
      </footer>
    </div>
  );
}
