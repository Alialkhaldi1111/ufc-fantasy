import type { Metadata } from 'next';
import StoreNav from '@/components/store/StoreNav';
import CartDrawer from '@/components/store/CartDrawer';

export const metadata: Metadata = {
  title: 'APEX Cold Plunge — Train & Recover Like a Champion',
  description: 'The #1 portable ice bath used by UFC fighters. Free shipping. 30-day returns.',
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080c12] text-white">
      <StoreNav />
      <CartDrawer />
      {children}
      <footer className="border-t border-white/10 mt-20 py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-400">
          <div>
            <div className="font-bold text-white text-lg mb-2">APEX Cold Plunge</div>
            <p>Professional recovery gear for serious athletes. Train hard, recover harder.</p>
          </div>
          <div>
            <div className="font-semibold text-white mb-2">Quick Links</div>
            <ul className="space-y-1">
              <li><a href="/store" className="hover:text-white transition-colors">Product</a></li>
              <li><a href="/store/waitlist" className="hover:text-white transition-colors">Early Access</a></li>
              <li><a href="/store/cart" className="hover:text-white transition-colors">Cart</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-2">Support</div>
            <ul className="space-y-1">
              <li><a href="mailto:support@apexcoldplunge.com" className="hover:text-white transition-colors">support@apexcoldplunge.com</a></li>
              <li>Ships within 3–5 business days</li>
              <li>30-day no-questions return policy</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-white/10 text-xs text-gray-600 text-center">
          © 2026 APEX Cold Plunge. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
