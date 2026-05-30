'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RoundScore {
  round: number;
  fighterAScore: number;
  fighterBScore: number;
}

interface FightRating {
  fightId: string;
  stars: number;
  review?: string;
  userId: string;
  timestamp: number;
}

interface FightPrediction {
  fightId: string;
  predictedWinnerId: string;
  method: 'KO' | 'SUB' | 'DEC';
  userId: string;
}

interface EventStore {
  roundScores: Record<string, RoundScore[]>;
  ratings: Record<string, FightRating[]>;
  predictions: Record<string, FightPrediction>;
  addRoundScore: (fightId: string, score: RoundScore) => void;
  addRating: (rating: FightRating) => void;
  setPrediction: (prediction: FightPrediction) => void;
  getAverageRating: (fightId: string) => number;
  getFightOfNight: (fightIds: string[]) => string | null;
  getCurrentScore: (fightId: string) => { fighterA: number; fighterB: number };
  getPredictionStats: (fightId: string, aId: string, bId: string) => { aPercent: number; bPercent: number; total: number };
}

export const useEventStore = create<EventStore>()(
  persist(
    (set, get) => ({
      roundScores: {},
      ratings: {},
      predictions: {},

      addRoundScore: (fightId, score) =>
        set((s) => ({
          roundScores: {
            ...s.roundScores,
            [fightId]: [
              ...(s.roundScores[fightId] || []).filter((r) => r.round !== score.round),
              score,
            ].sort((a, b) => a.round - b.round),
          },
        })),

      addRating: (rating) =>
        set((s) => ({
          ratings: {
            ...s.ratings,
            [rating.fightId]: [
              ...(s.ratings[rating.fightId] || []).filter((r) => r.userId !== rating.userId),
              rating,
            ],
          },
        })),

      setPrediction: (prediction) =>
        set((s) => ({ predictions: { ...s.predictions, [prediction.fightId]: prediction } })),

      getAverageRating: (fightId) => {
        const r = get().ratings[fightId] || [];
        return r.length === 0 ? 0 : r.reduce((s, x) => s + x.stars, 0) / r.length;
      },

      getFightOfNight: (fightIds) => {
        let best: string | null = null;
        let bestRating = 0;
        for (const id of fightIds) {
          const avg = get().getAverageRating(id);
          if (avg > bestRating) { bestRating = avg; best = id; }
        }
        return bestRating > 0 ? best : null;
      },

      getCurrentScore: (fightId) => {
        const scores = get().roundScores[fightId] || [];
        return scores.reduce(
          (acc, s) => ({ fighterA: acc.fighterA + s.fighterAScore, fighterB: acc.fighterB + s.fighterBScore }),
          { fighterA: 0, fighterB: 0 }
        );
      },

      getPredictionStats: (fightId, aId, _bId) => {
        const all = Object.values(get().predictions).filter((p) => p.fightId === fightId);
        const total = all.length;
        if (total === 0) return { aPercent: 50, bPercent: 50, total: 0 };
        const aCount = all.filter((p) => p.predictedWinnerId === aId).length;
        return {
          aPercent: Math.round((aCount / total) * 100),
          bPercent: Math.round(((total - aCount) / total) * 100),
          total,
        };
      },
    }),
    { name: 'octafight-event-store' }
  )
);
