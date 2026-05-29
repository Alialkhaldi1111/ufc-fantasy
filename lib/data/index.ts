import { staticProvider } from './static-provider';
import { apiProvider } from './api-provider';
import type { DataProvider } from './types';

export type { DataProvider } from './types';

/**
 * Selects the active data provider at call time.
 *
 * If `MMA_API_KEY` is set we use the live MMA API provider; otherwise we serve
 * the accurate built-in static data. This is the ONLY place that decides the
 * data source — consumers always go through the convenience exports below.
 */
export function getDataProvider(): DataProvider {
  if (process.env.MMA_API_KEY) {
    return apiProvider;
  }
  return staticProvider;
}

// ─── Convenience exports ──────────────────────────────────────────────────────
// Use these from API routes / server code instead of touching providers or
// data files directly.

export async function getFighters() {
  return getDataProvider().getFighters();
}

export async function getFighter(id: string) {
  return getDataProvider().getFighter(id);
}

export async function getEvents() {
  return getDataProvider().getEvents();
}

export async function getEvent(id: string) {
  return getDataProvider().getEvent(id);
}
