import type { Fighter, Event } from '@/types';
import type { DataProvider } from './types';

/**
 * ───────────────────────────────────────────────────────────────────────────
 * LIVE MMA DATA API PROVIDER (scaffold)
 * ───────────────────────────────────────────────────────────────────────────
 *
 * This provider becomes active automatically once `MMA_API_KEY` is set in the
 * environment (see `lib/data/index.ts`). Until then the app uses the built-in
 * static data and none of this code runs.
 *
 * It is written against the **SportsData.io MMA API** shape as a sensible
 * default, since that is one of the more common MMA data providers. If you
 * sign up with a different provider (e.g. API-Sports), you only need to adjust:
 *
 *   1. The endpoint paths in `getFighters()` / `getEvents()`.
 *   2. The auth header in `apiFetch()` (some APIs use a query param or a
 *      different header name).
 *   3. The `mapApiFighter()` / `mapApiEvent()` functions, which translate the
 *      raw API JSON into our internal `Fighter` / `Event` types.
 *
 * Config is read from environment variables:
 *   - MMA_API_KEY      (required) — your API key/token.
 *   - MMA_API_URL      (optional) — base URL, defaults to the SportsData.io MMA base.
 *   - MMA_API_PROVIDER (optional) — 'sportsdata' | 'apisports'. Currently only
 *                                   informational; reserved for future per-provider
 *                                   branching of endpoints/mappers.
 */

// ─── Config ──────────────────────────────────────────────────────────────────

const DEFAULT_BASE_URL = 'https://api.sportsdata.io/v3/mma';

function getConfig() {
  const apiKey = process.env.MMA_API_KEY;
  if (!apiKey) {
    // Surfaced clearly so a misconfiguration is obvious rather than silently
    // returning empty data. `getDataProvider()` only selects this provider
    // when the key exists, so reaching here means the env changed at runtime.
    throw new Error(
      '[apiProvider] MMA_API_KEY is not set. Set it in your environment to use the live MMA data API, or leave it blank to use the built-in static data.'
    );
  }

  const baseUrl = (process.env.MMA_API_URL || DEFAULT_BASE_URL).replace(/\/$/, '');
  const provider = process.env.MMA_API_PROVIDER || 'sportsdata';

  return { apiKey, baseUrl, provider };
}

/**
 * Thin wrapper around native fetch that injects the API key header.
 *
 * SportsData.io expects the key in the `Ocp-Apim-Subscription-Key` header.
 * If your provider differs (e.g. API-Sports uses `x-apisports-key`, others use
 * `Authorization: Bearer <key>` or a `?api_key=` query param), change the
 * headers below accordingly.
 */
async function apiFetch<T>(path: string): Promise<T> {
  const { apiKey, baseUrl } = getConfig();
  const url = `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;

  const res = await fetch(url, {
    headers: {
      // CHANGE THIS HEADER if your provider uses a different auth scheme.
      'Ocp-Apim-Subscription-Key': apiKey,
      Accept: 'application/json',
    },
    // Cache live data for 5 minutes to avoid hammering the API. Tune as needed.
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(
      `[apiProvider] Request failed: ${res.status} ${res.statusText} for ${url}${
        body ? ` — ${body.slice(0, 200)}` : ''
      }`
    );
  }

  return (await res.json()) as T;
}

// ─── Raw API response shapes (SportsData.io MMA, partial) ─────────────────────
// These are intentionally loose/partial. Treat them as a starting point and
// extend with the fields you actually consume. See SportsData.io docs for the
// full schema. Unknown providers: replace these with your provider's shapes.

interface ApiFighter {
  FighterId: number;
  FirstName?: string;
  LastName?: string;
  Nickname?: string;
  WeightClass?: string;
  Wins?: number;
  Losses?: number;
  Draws?: number;
  NoContests?: number;
  Height?: number; // inches
  Weight?: number; // pounds
  Reach?: number; // inches
  Stance?: string;
  BirthDate?: string; // ISO date
  Nationality?: string;
  // ...many more stat fields exist on the real API.
}

interface ApiFight {
  FightId?: number;
  WeightClass?: string;
  Order?: number;
  Active?: boolean;
}

interface ApiEvent {
  EventId: number;
  Name?: string;
  ShortName?: string;
  Day?: string; // ISO date
  DateTime?: string; // ISO datetime
  Status?: string; // e.g. 'Scheduled', 'InProgress', 'Final', 'Canceled'
  Venue?: string;
  City?: string;
  Country?: string;
  Fights?: ApiFight[];
}

// ─── Mapping helpers ──────────────────────────────────────────────────────────
// EDIT THESE to match the real API payloads. They are the single place where
// "their shape" becomes "our shape". Fields the API doesn't provide are filled
// with reasonable defaults so the rest of the app keeps working.

/** Build a "W-L-D" record string from numeric components. */
function formatRecord(wins = 0, losses = 0, draws = 0): string {
  return `${wins}-${losses}-${draws}`;
}

/** Convert inches to a `5'11"` style string; returns '' if unknown. */
function inchesToHeight(inches?: number): string {
  if (!inches || inches <= 0) return '';
  const feet = Math.floor(inches / 12);
  const rem = inches % 12;
  return `${feet}'${rem}"`;
}

/** Rough age from an ISO birth date. */
function ageFromBirthDate(birthDate?: string): number | undefined {
  if (!birthDate) return undefined;
  const born = new Date(birthDate);
  if (Number.isNaN(born.getTime())) return undefined;
  const now = new Date();
  let age = now.getFullYear() - born.getFullYear();
  const m = now.getMonth() - born.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < born.getDate())) age -= 1;
  return age;
}

/**
 * Map a single raw API fighter into our Fighter type.
 *
 * NOTE: Fantasy-specific fields (salary, projectedPoints, ownership, etc.) are
 * NOT provided by most stats APIs. They are derived/business values. Here we
 * default them to 0 — replace this with your own pricing/projection model, or
 * merge with values stored in your database keyed by fighter id.
 */
export function mapApiFighter(api: ApiFighter): Fighter {
  const wins = api.Wins ?? 0;
  const losses = api.Losses ?? 0;
  const draws = api.Draws ?? 0;
  const name = [api.FirstName, api.LastName].filter(Boolean).join(' ').trim();

  return {
    id: String(api.FighterId),
    name: name || `Fighter ${api.FighterId}`,
    nickname: api.Nickname || undefined,
    nationality: api.Nationality ?? '',
    countryFlag: '', // API has no flag emoji — map from nationality if desired.
    weightClass: api.WeightClass ?? '',
    record: formatRecord(wins, losses, draws),
    wins,
    losses,
    draws,
    height: inchesToHeight(api.Height),
    weight: api.Weight ? `${api.Weight} lbs` : '',
    reach: api.Reach ? `${api.Reach}"` : undefined,
    stance: api.Stance ?? '',
    age: ageFromBirthDate(api.BirthDate),
    imageUrl: undefined, // Plug in a photo CDN/URL if your provider offers one.

    // ─── Fantasy / derived fields — supply from your own model or DB ───
    salary: 0,
    projectedPoints: 0,
    avgFantasyPoints: 0,
    ownership: 0,
    knockoutPct: 0,
    submissionPct: 0,
    decisionPct: 0,
    strikeAccuracy: 0,
    strikeDefense: 0,
    takedownAccuracy: 0,
    takedownDefense: 0,
    significantStrikes: 0,
    takedownsPerFight: 0,

    isActive: true,
    ranking: undefined,
  };
}

/** Translate the API's status string into our Event status union. */
function mapEventStatus(status?: string): Event['status'] {
  switch ((status ?? '').toLowerCase()) {
    case 'inprogress':
    case 'live':
      return 'LIVE';
    case 'final':
    case 'completed':
    case 'closed':
      return 'COMPLETED';
    case 'canceled':
    case 'cancelled':
      return 'CANCELLED';
    default:
      return 'UPCOMING';
  }
}

/**
 * Map a single raw API event into our Event type.
 *
 * The `fights` array is left undefined here because fleshing out full Fight
 * objects requires resolving both fighters (another API call / join). Populate
 * it once you wire up fight-level endpoints; the app treats `fights` as optional.
 */
export function mapApiEvent(api: ApiEvent): Event {
  return {
    id: String(api.EventId),
    name: api.Name ?? `Event ${api.EventId}`,
    shortName: api.ShortName || undefined,
    venue: api.Venue ?? '',
    city: api.City ?? '',
    country: api.Country ?? '',
    date: api.DateTime ?? api.Day ?? '',
    status: mapEventStatus(api.Status),
    imageUrl: undefined,
    broadcasters: [], // Most stats APIs don't include broadcaster info.
    mainCardTime: undefined,
    prelimTime: undefined,
    description: undefined,
    fights: undefined, // See note above — populate from fight endpoints if needed.
  };
}

// ─── Provider implementation ──────────────────────────────────────────────────

/**
 * The current "season" for schedule endpoints. SportsData.io's MMA Schedule
 * endpoint is `/scores/json/Schedule/{season}`. Adjust if your provider keys
 * schedules differently (e.g. by league or date range).
 */
function currentSeason(): string {
  return String(new Date().getFullYear());
}

export const apiProvider: DataProvider = {
  name: 'api',

  async getFighters() {
    // SportsData.io: GET /scores/json/Fighters
    const raw = await apiFetch<ApiFighter[]>('/scores/json/Fighters');
    return raw.map(mapApiFighter);
  },

  async getFighter(id: string) {
    // Many APIs expose a per-fighter endpoint (e.g. /scores/json/Fighter/{id}).
    // If yours does, fetch it directly here. As a portable fallback we fetch
    // the full list and find by id, which always works regardless of provider.
    const all = await this.getFighters();
    return all.find((f) => f.id === id) ?? null;
  },

  async getEvents() {
    // SportsData.io: GET /scores/json/Schedule/{season}
    const raw = await apiFetch<ApiEvent[]>(`/scores/json/Schedule/${currentSeason()}`);
    return raw.map(mapApiEvent);
  },

  async getEvent(id: string) {
    // Portable fallback (see getFighter). Swap for a per-event endpoint such as
    // /scores/json/Event/{id} if your provider supports it.
    const all = await this.getEvents();
    return all.find((e) => e.id === id) ?? null;
  },
};
