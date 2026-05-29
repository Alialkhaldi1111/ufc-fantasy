'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FighterAvatarProps {
  name: string;
  imageUrl?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-9 h-9 text-xs',
  md: 'w-11 h-11 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-28 h-28 text-3xl sm:w-36 sm:h-36 sm:text-5xl',
};

/**
 * Shows a real fighter photo when `imageUrl` is provided (e.g. from the live API),
 * and gracefully falls back to a styled initials avatar when there's no image
 * or the image fails to load. This keeps the UI clean whether or not live data
 * (with photos) is connected.
 */
export function FighterAvatar({ name, imageUrl, size = 'md', className }: FighterAvatarProps) {
  const [errored, setErrored] = useState(false);
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  const showImage = imageUrl && !errored;

  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden flex items-center justify-center font-bold flex-shrink-0',
        'bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20',
        SIZE_MAP[size],
        className
      )}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setErrored(true)}
          loading="lazy"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
