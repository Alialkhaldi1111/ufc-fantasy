export interface Fighter {
  id: string;
  name: string;
  nickname?: string;
  nationality: string;
  countryFlag: string;
  weightClass: string;
  record: string;
  wins: number;
  losses: number;
  draws: number;
  height: string;
  weight: string;
  reach?: string;
  stance: string;
  age?: number;
  imageUrl?: string;
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
  significantStrikes: number;
  takedownsPerFight: number;
  isActive: boolean;
  ranking?: number;
}

export interface Event {
  id: string;
  name: string;
  shortName?: string;
  venue: string;
  city: string;
  country: string;
  date: string;
  status: 'UPCOMING' | 'LIVE' | 'COMPLETED' | 'CANCELLED';
  imageUrl?: string;
  broadcasters: string[];
  mainCardTime?: string;
  prelimTime?: string;
  description?: string;
  fights?: Fight[];
}

export interface Fight {
  id: string;
  eventId: string;
  fighterA: Fighter;
  fighterB: Fighter;
  weightClass: string;
  isMainEvent: boolean;
  isCoMain: boolean;
  isTitleFight: boolean;
  scheduledRounds: number;
  cardPosition: number;
  cardType: 'main' | 'prelim' | 'early';
  status: 'scheduled' | 'live' | 'completed';
  result?: 'WIN' | 'LOSS' | 'DRAW' | 'NO_CONTEST';
  winnerId?: string;
  finishMethod?: string;
  finishRound?: number;
  finishTime?: string;
  fighterAStrikes?: number;
  fighterBStrikes?: number;
  fighterATakedowns?: number;
  fighterBTakedowns?: number;
  fighterAKnockdowns?: number;
  fighterBKnockdowns?: number;
}

export interface Contest {
  id: string;
  eventId: string;
  name: string;
  type: 'PUBLIC' | 'PRIVATE' | 'TOURNAMENT' | 'HEAD_TO_HEAD';
  status: 'UPCOMING' | 'OPEN' | 'LOCKED' | 'LIVE' | 'COMPLETED' | 'CANCELLED';
  entryFee: number;
  prizePool: number;
  maxEntries: number;
  currentEntries: number;
  salaryCap: number;
  rosterSize: number;
  inviteCode?: string;
  isGuaranteed: boolean;
  event?: Event;
}

export interface Lineup {
  id: string;
  userId: string;
  contestId?: string;
  name: string;
  totalSalary: number;
  totalPoints: number;
  isSubmitted: boolean;
  slots: LineupSlot[];
}

export interface LineupSlot {
  id: string;
  lineupId: string;
  fighterId: string;
  slot: number;
  fighter?: Fighter;
}

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  role: 'USER' | 'PREMIUM' | 'ADMIN';
  xp: number;
  level: number;
  rank: string;
  streakDays: number;
  balance: number;
  totalWinnings: number;
  totalContests: number;
  contestWins: number;
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  user: User;
  contestId?: string;
  season: string;
  points: number;
  rank: number;
  wins: number;
  roi: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: string;
  earnedAt?: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'fight' | 'contest';
  read: boolean;
  link?: string;
  createdAt: string;
}
