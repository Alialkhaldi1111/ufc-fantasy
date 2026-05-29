import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
}

export function formatSalary(salary: number): string {
  return `$${salary.toLocaleString()}`;
}

export function formatPoints(points: number): string {
  return points.toFixed(1);
}

export function formatRecord(wins: number, losses: number, draws: number): string {
  return draws > 0 ? `${wins}-${losses}-${draws}` : `${wins}-${losses}`;
}

export function getWeightClassShort(weightClass: string): string {
  const map: Record<string, string> = {
    "Heavyweight": "HW",
    "Light Heavyweight": "LHW",
    "Middleweight": "MW",
    "Welterweight": "WW",
    "Lightweight": "LW",
    "Featherweight": "FW",
    "Bantamweight": "BW",
    "Flyweight": "FLW",
    "Women's Strawweight": "W-SW",
    "Women's Flyweight": "W-FLW",
    "Women's Bantamweight": "W-BW",
    "Women's Featherweight": "W-FW",
  };
  return map[weightClass] || weightClass;
}

export function getTimeUntil(date: Date): { days: number; hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export function getRankLabel(rank: number): string {
  if (rank === 1) return "1st";
  if (rank === 2) return "2nd";
  if (rank === 3) return "3rd";
  return `${rank}th`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getSalaryColor(remaining: number, cap: number): string {
  const pct = remaining / cap;
  if (pct > 0.3) return "text-neon";
  if (pct > 0.1) return "text-yellow-400";
  return "text-red-400";
}
