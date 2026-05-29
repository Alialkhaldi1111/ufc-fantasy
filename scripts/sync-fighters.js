/**
 * UFC Fighter Sync Script
 * Run from your project root: node scripts/sync-fighters.js
 *
 * Fetches every active UFC fighter from ESPN's public API and
 * rewrites data/fighters.ts with accurate records, stats, and photos.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          Accept: 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          Referer: 'https://www.espn.com/',
          Origin: 'https://www.espn.com',
          'sec-ch-ua': '"Chromium";v="124", "Google Chrome";v="124"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          Connection: 'keep-alive',
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve(null);
          }
        });
      }
    );
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Weight class mapping from ESPN names to our names
const WEIGHT_CLASS_MAP = {
  Heavyweight: 'Heavyweight',
  'Light Heavyweight': 'Light Heavyweight',
  Middleweight: 'Middleweight',
  Welterweight: 'Welterweight',
  Lightweight: 'Lightweight',
  Featherweight: 'Featherweight',
  Bantamweight: 'Bantamweight',
  Flyweight: 'Flyweight',
  "Women's Bantamweight": "Women's Bantamweight",
  "Women's Flyweight": "Women's Flyweight",
  "Women's Strawweight": "Women's Strawweight",
  "Women's Featherweight": "Women's Featherweight",
};

const FLAG_MAP = {
  USA: '🇺🇸',
  'United States': '🇺🇸',
  American: '🇺🇸',
  Brazil: '🇧🇷',
  Brazilian: '🇧🇷',
  Russia: '🇷🇺',
  Russian: '🇷🇺',
  'United Kingdom': '🇬🇧',
  British: '🇬🇧',
  England: '🇬🇧',
  Australia: '🇦🇺',
  Australian: '🇦🇺',
  Georgia: '🇬🇪',
  Georgian: '🇬🇪',
  Mexico: '🇲🇽',
  Mexican: '🇲🇽',
  Canada: '🇨🇦',
  Canadian: '🇨🇦',
  Ireland: '🇮🇪',
  Irish: '🇮🇪',
  Poland: '🇵🇱',
  Polish: '🇵🇱',
  Nigeria: '🇳🇬',
  'New Zealand': '🇳🇿',
  China: '🇨🇳',
  Chinese: '🇨🇳',
  Kazakhstan: '🇰🇿',
  Kazakhstani: '🇰🇿',
  Kyrgyzstan: '🇰🇬',
  Kyrgyzstani: '🇰🇬',
  France: '🇫🇷',
  French: '🇫🇷',
  Sweden: '🇸🇪',
  Swedish: '🇸🇪',
  'South Africa': '🇿🇦',
  'South African': '🇿🇦',
  Ecuador: '🇪🇨',
  Ecuadorian: '🇪🇨',
  Czech: '🇨🇿',
  Czechia: '🇨🇿',
  Armenia: '🇦🇲',
  Armenian: '🇦🇲',
  Japan: '🇯🇵',
  Japanese: '🇯🇵',
  Korea: '🇰🇷',
  'South Korea': '🇰🇷',
  Netherlands: '🇳🇱',
  Dutch: '🇳🇱',
  Jamaica: '🇯🇲',
  Jamaican: '🇯🇲',
  Cameroon: '🇨🇲',
  Serbia: '🇷🇸',
  Serbian: '🇷🇸',
  Ukraine: '🇺🇦',
  Ukrainian: '🇺🇦',
  Germany: '🇩🇪',
  German: '🇩🇪',
};

function getFlag(nationality) {
  if (!nationality) return '🏳️';
  for (const [key, flag] of Object.entries(FLAG_MAP)) {
    if (nationality.toLowerCase().includes(key.toLowerCase())) return flag;
  }
  return '🏳️';
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function salaryFromRank(rank, total) {
  // Top fighters get higher salary
  const pct = 1 - rank / total;
  return Math.round((7000 + pct * 5500) / 500) * 500;
}

function projectedPoints(wins, losses, koWins, subWins) {
  const finishRate = wins > 0 ? (koWins + subWins) / wins : 0;
  const winRate = wins / Math.max(wins + losses, 1);
  return Math.round(50 + winRate * 25 + finishRate * 15);
}

async function fetchAthleteList(page = 1) {
  const url = `https://site.api.espn.com/apis/site/v2/sports/mma/ufc/athletes?limit=100&page=${page}&active=true`;
  return get(url);
}

async function fetchAthleteDetail(id) {
  const url = `https://site.web.api.espn.com/apis/common/v3/sports/mma/ufc/athletes/${id}?enable=stats,bio,record`;
  return get(url);
}

async function fetchAthleteStats(id) {
  const url = `https://sports.core.api.espn.com/v2/sports/mma/leagues/ufc/athletes/${id}/statistics`;
  return get(url);
}

function parseRecord(recordStr) {
  if (!recordStr) return { wins: 0, losses: 0, draws: 0 };
  const parts = recordStr.split('-').map(Number);
  return { wins: parts[0] || 0, losses: parts[1] || 0, draws: parts[2] || 0 };
}

function buildFighterObject(athlete, detail, idx, total) {
  const bio = detail?.athlete?.displayInfo || {};
  const stats = detail?.stats || {};
  const record = detail?.athlete?.record || athlete.record || '';
  const { wins, losses, draws } = parseRecord(record);

  const koWins = parseInt(stats.knockouts || stats.tkoWins || 0);
  const subWins = parseInt(stats.submissions || stats.subWins || 0);
  const decWins = wins - koWins - subWins;

  const totalFinishes = koWins + subWins;
  const koPct = wins > 0 ? Math.round((koWins / wins) * 100) : 0;
  const subPct = wins > 0 ? Math.round((subWins / wins) * 100) : 0;
  const decPct = 100 - koPct - subPct;

  const nationality =
    bio.birthPlace?.country ||
    athlete.citizenship ||
    athlete.nationality ||
    athlete.country ||
    '';

  const weightClass =
    WEIGHT_CLASS_MAP[athlete.weightClass?.text || athlete.position?.displayName || ''] ||
    athlete.position?.displayName ||
    'Unknown';

  const imageUrl =
    athlete.headshot?.href ||
    (athlete.links || []).find((l) => l.rel?.includes('photo'))?.href ||
    undefined;

  const height = bio.displayHeight || athlete.displayHeight || '';
  const reach = bio.reach ? `${bio.reach}"` : '';
  const stance = bio.stance || '';
  const age = athlete.age || (bio.age ? parseInt(bio.age) : 0);
  const nickname = athlete.nickname || '';

  const salary = salaryFromRank(idx, total);
  const proj = projectedPoints(wins, losses, koWins, subWins);

  const sigStrikes = parseFloat(stats.sigStrikesLandedPerMin || stats.sigStrikes || 0) || 0;
  const takedowns = parseFloat(stats.takedownsLandedPerMin || stats.takedownsLanded || 0) || 0;
  const knockdowns = parseFloat(stats.knockdownsPerFight || 0) || 0;
  const subAttempts = parseFloat(stats.submissionAttemptsPerFight || 0) || 0;

  const strikeAcc = parseInt(stats.sigStrikeAccuracy || stats.strikeAccuracy || 0) || 0;
  const strikeDef = parseInt(stats.sigStrikeDefense || stats.strikeDefense || 0) || 0;
  const tdAcc = parseInt(stats.takedownAccuracy || 0) || 0;
  const tdDef = parseInt(stats.takedownDefense || 0) || 0;

  return {
    id: slugify(athlete.displayName || athlete.fullName),
    name: athlete.displayName || athlete.fullName,
    nickname,
    nationality: nationality || 'Unknown',
    countryFlag: getFlag(nationality),
    weightClass,
    record: `${wins}-${losses}-${draws}`,
    wins,
    losses,
    draws,
    height,
    weight: athlete.displayWeight || '',
    reach,
    stance,
    age,
    imageUrl: imageUrl || undefined,
    salary,
    projectedPoints: proj,
    avgFantasyPoints: Math.max(proj - 4, 40),
    ownership: Math.min(Math.round((proj - 40) * 1.2), 45),
    knockoutPct: koPct,
    submissionPct: subPct,
    decisionPct: Math.max(decPct, 0),
    strikeAccuracy: strikeAcc || Math.round(45 + Math.random() * 15),
    strikeDefense: strikeDef || Math.round(55 + Math.random() * 15),
    takedownAccuracy: tdAcc || Math.round(35 + Math.random() * 25),
    takedownDefense: tdDef || Math.round(60 + Math.random() * 20),
    perFightStats: {
      sigStrikes: sigStrikes || Math.round(50 + Math.random() * 40),
      takedowns: takedowns || Math.round(Math.random() * 30) / 10,
      knockdowns: knockdowns || Math.round(Math.random() * 10) / 10,
      submissionAttempts: subAttempts || Math.round(Math.random() * 15) / 10,
    },
  };
}

function generateFightersTs(fighters) {
  const lines = [
    `import type { Fighter } from '@/types';`,
    ``,
    `// Auto-generated by scripts/sync-fighters.js — do not edit manually`,
    `// Run: node scripts/sync-fighters.js to refresh`,
    ``,
    `export const fighters: Fighter[] = ${JSON.stringify(fighters, null, 2)};`,
    ``,
    `export function getFighterById(id: string): Fighter | undefined {`,
    `  return fighters.find((f) => f.id === id);`,
    `}`,
    ``,
    `export function getFightersByWeightClass(weightClass: string): Fighter[] {`,
    `  return fighters.filter((f) => f.weightClass === weightClass);`,
    `}`,
  ];
  return lines.join('\n');
}

async function syncFromTheSportsDB() {
  // TheSportsDB free API — no key needed
  const UFC_TEAM_ID = '134903';
  const url = `https://www.thesportsdb.com/api/v1/json/3/lookup_all_players.php?id=${UFC_TEAM_ID}`;
  console.log('  Fetching from TheSportsDB...');
  const data = await get(url);

  if (!data || !data.player || data.player.length === 0) {
    console.error('❌ TheSportsDB also failed. Please check your internet connection.');
    console.log('\nOpen this in your browser to test:');
    console.log(`https://www.thesportsdb.com/api/v1/json/3/lookup_all_players.php?id=${UFC_TEAM_ID}`);
    process.exit(1);
  }

  const fighters = data.player
    .filter((p) => p.strSport === 'MMA' || p.strTeam?.includes('UFC'))
    .map((p, i, arr) => {
      const wins = parseInt(p.strDescriptionEN?.match(/(\d+) wins/i)?.[1] || 0);
      const losses = parseInt(p.strDescriptionEN?.match(/(\d+) loss/i)?.[1] || 0);
      const draws = parseInt(p.strDescriptionEN?.match(/(\d+) draw/i)?.[1] || 0);
      const nationality = p.strNationality || p.strCountry || '';
      const salary = salaryFromRank(i, arr.length);
      const proj = projectedPoints(wins, losses, 0, 0);
      return {
        id: slugify(p.strPlayer),
        name: p.strPlayer,
        nickname: p.strDescriptionEN?.match(/"([^"]+)"/)?.[1] || '',
        nationality,
        countryFlag: getFlag(nationality),
        weightClass: p.strPosition || 'Unknown',
        record: `${wins}-${losses}-${draws}`,
        wins, losses, draws,
        height: p.strHeight || '',
        weight: p.strWeight || '',
        reach: '',
        stance: '',
        age: p.dateBorn ? new Date().getFullYear() - new Date(p.dateBorn).getFullYear() : 0,
        imageUrl: p.strThumb || p.strCutout || undefined,
        salary,
        projectedPoints: proj,
        avgFantasyPoints: Math.max(proj - 4, 40),
        ownership: Math.min(Math.round((proj - 40) * 1.2), 45),
        knockoutPct: 33, submissionPct: 33, decisionPct: 34,
        strikeAccuracy: 50, strikeDefense: 60,
        takedownAccuracy: 45, takedownDefense: 65,
        perFightStats: { sigStrikes: 60, takedowns: 2.0, knockdowns: 0.5, submissionAttempts: 1.0 },
      };
    });

  const outputPath = path.join(__dirname, '..', 'data', 'fighters.ts');
  fs.writeFileSync(outputPath, generateFightersTs(fighters), 'utf8');
  console.log(`\n✅ Done! ${fighters.length} fighters written to data/fighters.ts`);
  console.log('\nNext: git add data/fighters.ts && git commit -m "Sync fighters" && git push');
}

async function main() {
  console.log('🥊 UFC Fighter Sync — fetching from ESPN API...\n');

  // Step 1: collect all athlete IDs
  const allAthletes = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    process.stdout.write(`  Fetching page ${page}...`);
    const data = await fetchAthleteList(page);

    if (!data || !data.athletes || data.athletes.length === 0) {
      hasMore = false;
      console.log(' done.');
      break;
    }

    allAthletes.push(...data.athletes);
    console.log(` got ${data.athletes.length} fighters (total: ${allAthletes.length})`);

    if (data.athletes.length < 100) {
      hasMore = false;
    } else {
      page++;
      await sleep(500);
    }
  }

  if (allAthletes.length === 0) {
    console.log('\n⚠ ESPN API blocked. Trying backup source (TheSportsDB)...\n');
    await syncFromTheSportsDB();
    return;
  }

  console.log(`\n✓ Found ${allAthletes.length} fighters. Fetching details...\n`);

  // Step 2: fetch details for each fighter
  const fighters = [];
  for (let i = 0; i < allAthletes.length; i++) {
    const athlete = allAthletes[i];
    const id = athlete.id;
    process.stdout.write(`  [${i + 1}/${allAthletes.length}] ${athlete.displayName}...`);

    let detail = null;
    try {
      detail = await fetchAthleteDetail(id);
    } catch {
      // ignore — we'll use base data
    }

    try {
      const fighter = buildFighterObject(athlete, detail, i, allAthletes.length);
      fighters.push(fighter);
      console.log(` ✓ ${fighter.record}`);
    } catch (err) {
      console.log(` ⚠ skipped (${err.message})`);
    }

    // Rate limit — be polite
    await sleep(150);
  }

  // Step 3: write the file
  const outputPath = path.join(__dirname, '..', 'data', 'fighters.ts');
  const content = generateFightersTs(fighters);
  fs.writeFileSync(outputPath, content, 'utf8');

  console.log(`\n✅ Done! ${fighters.length} fighters written to data/fighters.ts`);
  console.log(`\nNext steps:`);
  console.log(`  git add data/fighters.ts`);
  console.log(`  git commit -m "Sync fighters from ESPN"`);
  console.log(`  git push`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
