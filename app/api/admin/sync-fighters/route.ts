import { NextResponse } from 'next/server';

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  Referer: 'https://www.espn.com/',
  Origin: 'https://www.espn.com',
};

const FLAG_MAP: Record<string, string> = {
  'United States': '🇺🇸', USA: '🇺🇸', Brazil: '🇧🇷', Russia: '🇷🇺',
  'United Kingdom': '🇬🇧', England: '🇬🇧', Australia: '🇦🇺', Georgia: '🇬🇪',
  Mexico: '🇲🇽', Canada: '🇨🇦', Ireland: '🇮🇪', Poland: '🇵🇱',
  Nigeria: '🇳🇬', 'New Zealand': '🇳🇿', China: '🇨🇳', Kazakhstan: '🇰🇿',
  Kyrgyzstan: '🇰🇬', France: '🇫🇷', Sweden: '🇸🇪', 'South Africa': '🇿🇦',
  Ecuador: '🇪🇨', Czechia: '🇨🇿', Armenia: '🇦🇲', Japan: '🇯🇵',
  Netherlands: '🇳🇱', Ukraine: '🇺🇦', Germany: '🇩🇪', Jamaica: '🇯🇲',
};

function getFlag(country: string) {
  if (!country) return '🏳️';
  for (const [key, flag] of Object.entries(FLAG_MAP)) {
    if (country.toLowerCase().includes(key.toLowerCase())) return flag;
  }
  return '🏳️';
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildFighter(a: any, idx: number, total: number) {
  const recStr = a.record?.displayValue || a.displayRecord || '0-0-0';
  const parts = recStr.split('-').map(Number);
  const wins = parts[0] || 0;
  const losses = parts[1] || 0;
  const draws = parts[2] || 0;

  const nationality = a.citizenship || a.birthPlace?.country?.displayName || '';
  const salary = Math.round((7000 + (1 - idx / total) * 5500) / 500) * 500;
  const proj = Math.round(50 + (wins / Math.max(wins + losses, 1)) * 25 + 0.6 * 15);

  return {
    id: slugify(a.displayName || a.fullName || 'unknown'),
    name: a.displayName || a.fullName || 'Unknown',
    nickname: a.nickname || '',
    nationality: nationality || 'Unknown',
    countryFlag: getFlag(nationality),
    weightClass: a.position?.displayName || a.weightClass?.text || 'Unknown',
    record: `${wins}-${losses}-${draws}`,
    wins, losses, draws,
    height: a.displayHeight || '',
    weight: a.displayWeight || '',
    reach: a.reach ? `${a.reach}"` : '',
    stance: a.stance || '',
    age: a.age || 0,
    imageUrl: a.headshot?.href || undefined,
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

export async function GET() {
  try {
    const all = [];
    let page = 1;

    while (true) {
      const url = `https://site.api.espn.com/apis/site/v2/sports/mma/ufc/athletes?limit=100&page=${page}&active=true`;
      const res = await fetch(url, { headers: HEADERS });

      if (!res.ok) {
        return NextResponse.json({ error: `ESPN returned ${res.status} on page ${page}` }, { status: 502 });
      }

      const data = await res.json();
      const athletes = data.athletes || [];
      if (athletes.length === 0) break;

      for (let i = 0; i < athletes.length; i++) {
        try {
          all.push(buildFighter(athletes[i], all.length, 600));
        } catch {}
      }

      if (athletes.length < 100) break;
      page++;
    }

    if (all.length === 0) {
      return NextResponse.json({ error: 'ESPN returned no fighters' }, { status: 502 });
    }

    const fileContent = `import type { Fighter } from '@/types';

// Auto-synced from ESPN — ${new Date().toISOString().slice(0, 10)}
// Regenerate: visit /admin/sync in your browser

export const fighters: Fighter[] = ${JSON.stringify(all, null, 2)};

export function getFighterById(id: string): Fighter | undefined {
  return fighters.find((f) => f.id === id);
}

export function getFightersByWeightClass(weightClass: string): Fighter[] {
  return fighters.filter((f) => f.weightClass === weightClass);
}
`;

    return NextResponse.json({ count: all.length, fighters: all, fileContent });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
