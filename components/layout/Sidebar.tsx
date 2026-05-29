'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Swords,
  Trophy,
  User,
  Settings,
} from 'lucide-react';
import { clsx } from 'clsx';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: '/events', label: 'Events', icon: <Calendar className="h-4 w-4" /> },
  { href: '/fighters', label: 'Fighters', icon: <Users className="h-4 w-4" /> },
  { href: '/contests', label: 'Contests', icon: <Swords className="h-4 w-4" /> },
  { href: '/leaderboard', label: 'Leaderboard', icon: <Trophy className="h-4 w-4" /> },
  { href: '/profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
  { href: '/settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
];

const mockUser = {
  displayName: 'OctaFan',
  username: 'octafan',
  level: 12,
  xp: 3400,
  xpToNext: 5000,
  rank: 'Elite',
};

export function Sidebar() {
  const pathname = usePathname();
  const xpPct = Math.round((mockUser.xp / mockUser.xpToNext) * 100);

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 h-screen sticky top-0 border-r border-[#1e2a3a] bg-[#0a0f1a]">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-[#1e2a3a]">
        <Link href="/" className="font-black text-lg">
          <span
            className="text-[#39FF14]"
            style={{ textShadow: '0 0 10px rgba(57,255,20,0.6)' }}
          >
            ⬡
          </span>{' '}
          <span className="bg-gradient-to-r from-[#39FF14] to-[#00d4ff] bg-clip-text text-transparent">
            OctaFight
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                isActive
                  ? 'text-[#39FF14] bg-[#39FF14]/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-[#39FF14] shadow-[0_0_8px_rgba(57,255,20,0.7)]" />
              )}
              <span
                className={clsx(
                  isActive && 'drop-shadow-[0_0_4px_rgba(57,255,20,0.8)]'
                )}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User info at bottom */}
      <div className="border-t border-[#1e2a3a] px-4 py-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#39FF14]/20 border border-[#39FF14]/40 text-[#39FF14] font-bold text-xs">
            {mockUser.displayName.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {mockUser.displayName}
            </p>
            <p className="text-xs text-gray-500">
              Lv.{mockUser.level} · {mockUser.rank}
            </p>
          </div>
        </div>
        {/* XP bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-gray-500">
            <span>XP</span>
            <span>
              {mockUser.xp.toLocaleString()} / {mockUser.xpToNext.toLocaleString()}
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#1e2a3a] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#39FF14] transition-all duration-500"
              style={{
                width: `${xpPct}%`,
                boxShadow: '0 0 6px rgba(57,255,20,0.6)',
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
