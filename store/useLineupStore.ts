import { create } from 'zustand';
import { Fighter } from '@/types';

interface LineupStore {
  selectedFighters: Fighter[];
  totalSalary: number;
  salaryCap: number;
  rosterSize: number;
  remainingSalary: number;
  addFighter: (fighter: Fighter) => void;
  removeFighter: (fighterId: string) => void;
  clearLineup: () => void;
  canAddFighter: (fighter: Fighter) => boolean;
  isSelected: (fighterId: string) => boolean;
  setSalaryCap: (cap: number) => void;
  setRosterSize: (size: number) => void;
}

export const useLineupStore = create<LineupStore>((set, get) => ({
  selectedFighters: [],
  totalSalary: 0,
  salaryCap: 50000,
  rosterSize: 6,
  remainingSalary: 50000,

  addFighter: (fighter: Fighter) => {
    const { selectedFighters, salaryCap, rosterSize } = get();

    if (selectedFighters.length >= rosterSize) return;
    if (selectedFighters.some((f) => f.id === fighter.id)) return;

    const newTotal = get().totalSalary + fighter.salary;
    if (newTotal > salaryCap) return;

    set({
      selectedFighters: [...selectedFighters, fighter],
      totalSalary: newTotal,
      remainingSalary: salaryCap - newTotal,
    });
  },

  removeFighter: (fighterId: string) => {
    const { selectedFighters, salaryCap } = get();
    const fighter = selectedFighters.find((f) => f.id === fighterId);
    if (!fighter) return;

    const newFighters = selectedFighters.filter((f) => f.id !== fighterId);
    const newTotal = get().totalSalary - fighter.salary;

    set({
      selectedFighters: newFighters,
      totalSalary: newTotal,
      remainingSalary: salaryCap - newTotal,
    });
  },

  clearLineup: () => {
    const { salaryCap } = get();
    set({ selectedFighters: [], totalSalary: 0, remainingSalary: salaryCap });
  },

  canAddFighter: (fighter: Fighter) => {
    const { selectedFighters, rosterSize, totalSalary, salaryCap } = get();
    if (selectedFighters.length >= rosterSize) return false;
    if (selectedFighters.some((f) => f.id === fighter.id)) return false;
    if (totalSalary + fighter.salary > salaryCap) return false;
    return true;
  },

  isSelected: (fighterId: string) => {
    return get().selectedFighters.some((f) => f.id === fighterId);
  },

  setSalaryCap: (cap: number) => {
    const { totalSalary } = get();
    set({ salaryCap: cap, remainingSalary: cap - totalSalary });
  },

  setRosterSize: (size: number) => {
    set({ rosterSize: size });
  },
}));
