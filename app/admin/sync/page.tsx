'use client';

import { useState } from 'react';

interface Fighter {
  id: string;
  name: string;
  nickname: string;
  nationality: string;
  countryFlag: string;
  weightClass: string;
  record: string;
  wins: number;
  losses: number;
  draws: number;
  height: string;
  weight: string;
  reach: string;
  stance: string;
  age: number;
  imageUrl: string | undefined;
  salary: number;
  projectedPoints: number;
  avgFantasyPoints: number;
  ownership: number;
  knockoutPct: number;
  submissionPct: number;
  decisionPct: number;
  strikeAccuracy: number;
  strikeDefense: number;
  takedownAccuracy: number;
  takedownDefense: number;
  perFightStats: {
    sigStrikes: number;
    takedowns: number;
    knockdowns: number;
    submissionAttempts: number;
  };
}

const FLAG_MAP: Record<string, string> = {
  'United States': '🇺🇸', USA: '🇺🇸', Brazil: '🇧🇷', Russia: '🇷🇺',
  'United Kingdom': '🇬🇧', England: '🇬🇧', Australia: '🇦🇺', Georgia: '🇬🇪',
  Mexico: '🇲🇽', Canada: '🇨🇦', Ireland: '🇮🇪', Poland: '🇵🇱',
  Nigeria: '🇳🇬', 'New Zealand': '🇳🇿', China: '🇨🇳', Kazakhstan: '🇰🇿',
  Kyrgyzstan: '🇰🇬', France: '🇫🇷', Sweden: '🇸🇪', 'South Africa': '🇿🇦',
  Ecuador: '🇪🇨', Czechia: '🇨🇿', Armenia: '🇦🇲', Japan: '🇯🇵',
  Netherlands: '🇳🇱', Ukraine: '🇺🇦', Germany: '🇩🇪', Jamaica: '🇯🇲',
  Serbia: '🇷🇸', Cameroon: '🇨🇲', 'South Korea': '🇰🇷',
};

function getFlag(country: string) {
  for (const [key, flag] of Object.entries(FLAG_MAP)) {
    if (country?.toLowerCase().includes(key.toLowerCase())) return flag;
  }
  return '🏳️';
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

function parseRecord(r: string) {
  const p = (r || '0-0-0').split('-').map(Number);
  return { wins: p[0] || 0, losses: p[1] || 0, draws: p[2] || 0 };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildFighter(a: any, idx: number, total: number): Fighter {
  const rec = parseRecord(a.record?.displayValue || a.displayRecord || '0-0-0');
  const wins = rec.wins;
  const losses = rec.losses;
  const draws = rec.draws;

  const weightClass = a.position?.displayName || a.weightClass?.text || 'Unknown';
  const nationality = a.citizenship || a.birthPlace?.country?.displayName || '';
  const salary = Math.round((7000 + (1 - idx / total) * 5500) / 500) * 500;
  const finishRate = wins > 0 ? 0.6 : 0;
  const proj = Math.round(50 + (wins / Math.max(wins + losses, 1)) * 25 + finishRate * 15);
  const imageUrl = a.headshot?.href || a.flag?.href || undefined;

  return {
    id: slugify(a.displayName || a.fullName || 'unknown'),
    name: a.displayName || a.fullName || 'Unknown',
    nickname: a.nickname || '',
    nationality: nationality || 'Unknown',
    countryFlag: getFlag(nationality),
    weightClass,
    record: `${wins}-${losses}-${draws}`,
    wins, losses, draws,
    height: a.displayHeight || '',
    weight: a.displayWeight || '',
    reach: a.reach ? `${a.reach}"` : '',
    stance: a.stance || '',
    age: a.age || 0,
    imageUrl,
    salary,
    projectedPoints: proj,
    avgFantasyPoints: Math.max(proj - 4, 40),
    ownership: Math.min(Math.round((proj - 40) * 1.2), 45),
    knockoutPct: 33, submissionPct: 33, decisionPct: 34,
    strikeAccuracy: 50, strikeDefense: 60,
    takedownAccuracy: 45, takedownDefense: 65,
    perFightStats: { sigStrikes: 60, takedowns: 2.0, knockdowns: 0.5, submissionAttempts: 1.0 },
  };
}

function generateTs(fighters: Fighter[]): string {
  return `import type { Fighter } from '@/types';

// Auto-synced from ESPN — ${new Date().toISOString().slice(0, 10)}
// Regenerate: visit /admin/sync in your browser

export const fighters: Fighter[] = ${JSON.stringify(fighters, null, 2)};

export function getFighterById(id: string): Fighter | undefined {
  return fighters.find((f) => f.id === id);
}

export function getFightersByWeightClass(weightClass: string): Fighter[] {
  return fighters.filter((f) => f.weightClass === weightClass);
}
`;
}

export default function SyncPage() {
  const [status, setStatus] = useState('');
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function runSync() {
    setLoading(true);
    setDone(false);
    setFighters([]);

    try {
      const all: Fighter[] = [];
      let page = 1;

      while (true) {
        setStatus(`Fetching page ${page}...`);
        const res = await fetch(
          `https://site.api.espn.com/apis/site/v2/sports/mma/ufc/athletes?limit=100&page=${page}&active=true`,
          { headers: { Accept: 'application/json' } }
        );

        if (!res.ok) throw new Error(`ESPN returned ${res.status}`);
        const data = await res.json();
        const athletes = data.athletes || [];
        if (athletes.length === 0) break;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        athletes.forEach((a: any, i: number) => {
          try {
            all.push(buildFighter(a, all.length + i, 600));
          } catch {}
        });

        setStatus(`Fetched ${all.length} fighters so far...`);
        if (athletes.length < 100) break;
        page++;
        await new Promise((r) => setTimeout(r, 200));
      }

      if (all.length === 0) throw new Error('No fighters returned');
      setFighters(all);
      setStatus(`✅ Got ${all.length} fighters! Click Download to save the file.`);
      setDone(true);
    } catch (err) {
      setStatus(`❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }

  function download() {
    const content = generateTs(fighters);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fighters.ts';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#080c12] text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg bg-[#0f1520] border border-[#1e2a3a] rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">🥊</div>
        <h1 className="text-2xl font-bold mb-2">Fighter Data Sync</h1>
        <p className="text-gray-400 mb-8 text-sm">
          Fetches all active UFC fighters from ESPN and generates an updated{' '}
          <code className="text-[#39FF14]">data/fighters.ts</code> file.
        </p>

        {!done && (
          <button
            onClick={runSync}
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-lg bg-[#39FF14] text-black disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all"
          >
            {loading ? 'Syncing...' : 'Sync Fighters from ESPN'}
          </button>
        )}

        {status && (
          <p className="mt-6 text-sm font-mono text-gray-300 bg-black/40 rounded-lg p-4 text-left whitespace-pre-wrap">
            {status}
          </p>
        )}

        {done && (
          <>
            <button
              onClick={download}
              className="w-full mt-6 py-4 rounded-xl font-bold text-lg bg-[#39FF14] text-black hover:brightness-110 transition-all"
            >
              ⬇ Download fighters.ts
            </button>
            <p className="mt-4 text-xs text-gray-500">
              After downloading, replace{' '}
              <code className="text-gray-300">C:\Users\alial\myufc\data\fighters.ts</code>{' '}
              with the downloaded file, then run:
              <br />
              <code className="text-[#39FF14]">
                git add data/fighters.ts &amp;&amp; git commit -m "Sync fighters" &amp;&amp; git push
              </code>
            </p>
          </>
        )}

        {fighters.length > 0 && (
          <div className="mt-6 text-left max-h-60 overflow-y-auto text-xs font-mono text-gray-400 bg-black/40 rounded-lg p-4">
            {fighters.map((f) => (
              <div key={f.id}>
                {f.countryFlag} {f.name} — {f.record} ({f.weightClass})
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
