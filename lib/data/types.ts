import type { Fighter, Event } from '@/types';

/**
 * DataProvider is the contract every data source must implement.
 *
 * The app talks to this interface only — it never imports the raw `data/`
 * files or hits an API directly. Swapping the underlying source (built-in
 * static data vs. a live MMA API) is therefore a one-line change in
 * `getDataProvider()` and requires no changes to consumers.
 */
export interface DataProvider {
  /** Human-readable identifier, useful for logging/debugging which source is active. */
  name: string;
  getFighters(): Promise<Fighter[]>;
  getFighter(id: string): Promise<Fighter | null>;
  getEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | null>;
}
