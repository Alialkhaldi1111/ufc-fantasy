'use client';

import { useEffect } from 'react';
import { initNative } from '@/lib/native';

/**
 * Initializes native (Capacitor) chrome on mount — status bar styling,
 * hiding the splash screen, etc. No-ops on web. Also registers the PWA
 * service worker in the browser for offline support + installability.
 */
export function NativeInit() {
  useEffect(() => {
    initNative();

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          /* registration failures are non-fatal */
        });
      });
    }
  }, []);

  return null;
}
