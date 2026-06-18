'use client';

import { useState } from 'react';

const PLACEHOLDER_GRADIENTS = [
  'from-blue-900 via-[#080c12] to-[#39FF14]/20',
  'from-[#39FF14]/10 via-[#080c12] to-blue-900',
  'from-purple-900 via-[#080c12] to-[#39FF14]/10',
  'from-[#080c12] via-blue-950 to-[#39FF14]/20',
];

interface ProductGalleryProps {
  images?: string[];
  name: string;
}

export function ProductGallery({ images = [], name }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const items = images.length > 0 ? images : PLACEHOLDER_GRADIENTS.map((_, i) => `__gradient_${i}`);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
        {items[selected].startsWith('__gradient_') ? (
          <div
            className={`w-full h-full bg-gradient-to-br ${PLACEHOLDER_GRADIENTS[selected % PLACEHOLDER_GRADIENTS.length]} flex items-center justify-center`}
          >
            <div className="text-center space-y-2">
              <div className="text-6xl">🧊</div>
              <p className="text-white/50 text-sm font-medium">{name}</p>
            </div>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={items[selected]} alt={name} className="w-full h-full object-cover" />
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {items.slice(0, 4).map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              selected === i ? 'border-[#39FF14]' : 'border-white/10 hover:border-white/30'
            }`}
          >
            {img.startsWith('__gradient_') ? (
              <div
                className={`w-full h-full bg-gradient-to-br ${PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length]} flex items-center justify-center`}
              >
                <span className="text-xl">🧊</span>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
