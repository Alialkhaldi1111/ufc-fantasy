import { create } from 'zustand';
import { Contest } from '@/types';

interface ContestStore {
  contests: Contest[];
  activeContest: Contest | null;
  loading: boolean;
  error: string | null;
  setContests: (contests: Contest[]) => void;
  setActiveContest: (contest: Contest | null) => void;
  enterContest: (contestId: string, lineupId: string) => Promise<void>;
  fetchContests: (filters?: { type?: string; status?: string; eventId?: string }) => Promise<void>;
}

export const useContestStore = create<ContestStore>((set, get) => ({
  contests: [],
  activeContest: null,
  loading: false,
  error: null,

  setContests: (contests: Contest[]) => set({ contests }),

  setActiveContest: (contest: Contest | null) => set({ activeContest: contest }),

  enterContest: async (contestId: string, lineupId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/contests/${contestId}/enter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lineupId }),
      });

      if (!response.ok) {
        const data = await response.json() as { error?: string };
        throw new Error(data.error ?? 'Failed to enter contest');
      }

      // Optimistically update entry count
      const { contests } = get();
      const updated = contests.map((c) =>
        c.id === contestId
          ? { ...c, currentEntries: c.currentEntries + 1 }
          : c
      );
      set({ contests: updated });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      set({ error: message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  fetchContests: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const params = new URLSearchParams();
      if (filters.type) params.set('type', filters.type);
      if (filters.status) params.set('status', filters.status);
      if (filters.eventId) params.set('eventId', filters.eventId);

      const response = await fetch(`/api/contests?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch contests');

      const data = await response.json() as { contests: Contest[] };
      set({ contests: data.contests });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },
}));
