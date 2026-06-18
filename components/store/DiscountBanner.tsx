'use client';

import { useState } from 'react';

export function DiscountBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#FF3131] text-white text-center py-2 px-4 text-sm font-semibold relative">
      <span>🔥 LIMITED TIME: Use code </span>
      <span className="bg-white text-[#FF3131] px-1.5 py-0.5 rounded font-bold mx-1">APEX20</span>
      <span> for 20% off your order!</span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-lg leading-none"
        aria-label="Close banner"
      >
        ×
      </button>
    </div>
  );
}
