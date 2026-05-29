import { fighters } from '@/data/fighters';
import { events } from '@/data/events';
import type { DataProvider } from './types';

/**
 * StaticProvider serves the accurate, hand-curated data shipped with the app
 * (`data/fighters.ts` and `data/events.ts`). This is the default provider when
 * no `MMA_API_KEY` is configured.
 *
 * Methods are async to satisfy the DataProvider contract and to keep call
 * sites identical regardless of whether the active provider hits the network.
 */
export const staticProvider: DataProvider = {
  name: 'static',

  async getFighters() {
    return fighters;
  },

  async getFighter(id: string) {
    return fighters.find((f) => f.id === id) ?? null;
  },

  async getEvents() {
    return events;
  },

  async getEvent(id: string) {
    return events.find((e) => e.id === id) ?? null;
  },
};
