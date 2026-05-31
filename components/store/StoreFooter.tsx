import Link from 'next/link';

const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon fill="#FAF6F1" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.77 1.52V6.74a4.85 4.85 0 01-1-.05z" />
  </svg>
);

export function StoreFooter() {
  return (
    <footer className="bg-[#1A1A1A] text-[#B0A090] mt-auto">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-bold tracking-tight text-white">
                LUM<span className="text-[#E8443A]">É</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6">
              Clinical light therapy made accessible. We believe everyone deserves professional-grade skin care — not just those who can afford a medi-spa.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-[#B0A090] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                className="text-[#B0A090] hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon />
              </a>
              <a
                href="#"
                className="text-[#B0A090] hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: 'Glow Wand', href: '/lume/products/glow-wand' },
                { label: 'Starter Bundle', href: '/lume/products/glow-wand' },
                { label: 'Pro Kit', href: '/lume/products/glow-wand' },
                { label: 'Gift Sets', href: '/lume/products/glow-wand' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Help</h4>
            <ul className="space-y-3">
              {[
                { label: 'FAQ', href: '/lume/faq' },
                { label: 'Shipping & Returns', href: '/lume/policies' },
                { label: 'About Lumé', href: '/lume/about' },
                { label: 'The Science', href: '/lume/science' },
                { label: 'Contact Us', href: 'mailto:support@lumeskin.com' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="border-t border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-[#6B5B4E]">
            <span className="flex items-center gap-2">🔒 SSL Secured</span>
            <span className="flex items-center gap-2">✅ FDA-Registered Device</span>
            <span className="flex items-center gap-2">🛡️ 30-Day Money-Back</span>
            <span className="flex items-center gap-2">🚚 Free US Shipping</span>
            <span className="flex items-center gap-2">⭐ 4.9/5 (2,847 reviews)</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B5B4E]">
            <p>© 2026 Lumé Skin Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/lume/policies" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/lume/policies" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/lume/policies" className="hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
