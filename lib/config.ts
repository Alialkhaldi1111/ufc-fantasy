export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "OctaFight Fantasy",
  tagline: "The Ultimate MMA Fantasy Experience",
  description: "Build your dream MMA roster, compete in contests, and win big with OctaFight Fantasy — the premier UFC fantasy sports platform.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://octafight.gg",
  twitter: "@OctaFight",
  salary: {
    cap: 50000,
    rosterSize: 6,
  },
  scoring: {
    win: 30,
    koTko: 100,
    submission: 90,
    significantStrike: 0.5,
    takedown: 5,
    knockdown: 10,
    controlTime: 0.05, // per second
    firstRoundBonus: 25,
    upsetBonus: 20,
  },
  xp: {
    contestEntry: 10,
    contestWin: 100,
    dailyLogin: 5,
    referral: 50,
  },
  levels: [
    { level: 1, name: "Rookie", minXp: 0 },
    { level: 2, name: "Amateur", minXp: 100 },
    { level: 3, name: "Fighter", minXp: 300 },
    { level: 4, name: "Contender", minXp: 700 },
    { level: 5, name: "Champion", minXp: 1500 },
    { level: 6, name: "Legend", minXp: 3000 },
    { level: 7, name: "GOAT", minXp: 6000 },
  ],
};

export type ScoringConfig = typeof APP_CONFIG.scoring;
