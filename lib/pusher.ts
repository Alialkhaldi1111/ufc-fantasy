import Pusher from 'pusher';
import PusherClient from 'pusher-js';

// Server-side Pusher instance
export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? 'us2',
  useTLS: true,
});

// Client-side Pusher instance (safe to use in browser)
export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY!,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? 'us2',
  }
);

export const PUSHER_CHANNELS = {
  contest: (contestId: string) => `contest-${contestId}`,
  event: (eventId: string) => `event-${eventId}`,
  user: (userId: string) => `private-user-${userId}`,
  leaderboard: 'leaderboard',
  liveScoring: 'live-scoring',
} as const;

export const PUSHER_EVENTS = {
  SCORE_UPDATE: 'score-update',
  FIGHT_RESULT: 'fight-result',
  CONTEST_LOCKED: 'contest-locked',
  LINEUP_RANKED: 'lineup-ranked',
  NOTIFICATION: 'notification',
  LEADERBOARD_UPDATE: 'leaderboard-update',
} as const;
