import type { Metadata } from 'next';
import { StoreNav } from '@/components/store/StoreNav';
import { StoreFooter } from '@/components/store/StoreFooter';

export const metadata: Metadata = {
  title: {
    default: 'Lumé — Glow From Within',
    template: '%s | Lumé',
  },
  description:
    'Clinical red light therapy at home. The Lumé Glow Wand uses 150 medical-grade LEDs to reduce fine lines, clear acne, and restore radiance — in 10 minutes a day.',
  keywords: ['red light therapy', 'skin care', 'anti-aging', 'acne treatment', 'LED facial', 'skin rejuvenation'],
  openGraph: {
    type: 'website',
    siteName: 'Lumé Skin',
    title: 'Lumé — Glow From Within',
    description: 'Clinical red light therapy. Home-friendly price.',
  },
};

export default function LumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#1A1A1A] flex flex-col font-sans">
      <StoreNav />
      <div className="flex-1">{children}</div>
      <StoreFooter />
    </div>
  );
}
