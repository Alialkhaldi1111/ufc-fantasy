'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Wallet,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Trophy,
  Swords,
  Calendar,
  Users,
} from 'lucide-react';
import { clsx } from 'clsx';
import { Badge } from '@/components/ui/Badge';

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navLinks: NavLink[] = [
  { href: '/events', label: 'Events', icon: <Calendar className="h-4 w-4" /> },
  { href: '/fighters', label: 'Fighters', icon: <Users className="h-4 w-4" /> },
  { href: '/contests', label: 'Contests', icon: <Swords className="h-4 w-4" /> },
  { href: '/leaderboard', label: 'Leaderboard', icon: <Trophy className="h-4 w-4" /> },
];

const mockUser = {
  displayName: 'OctaFan',
  username: 'octafan',
  avatar: null as string | null,
  balance: 250.0,
  notifications: 3,
};

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#1e2a3a] bg-[#0a0f1a]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-black tracking-tight">
              <span
                className="text-[#39FF14]"
                style={{ textShadow: '0 0 12px rgba(57,255,20,0.6)' }}
              >
                ⬡
              </span>{' '}
              <span className="bg-gradient-to-r from-[#39FF14] to-[#00d4ff] bg-clip-text text-transparent">
                OctaFight
              </span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-[#39FF14] bg-[#39FF14]/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Wallet */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-md border border-[#1e2a3a] bg-[#0f1520] px-3 py-1.5 text-sm font-semibold text-[#39FF14]">
              <Wallet className="h-3.5 w-3.5" />
              <span>${mockUser.balance.toFixed(2)}</span>
            </div>

            {/* Notifications */}
            <button className="relative rounded-md p-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
              <Bell className="h-5 w-5" />
              {mockUser.notifications > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#39FF14] text-[9px] font-bold text-[#0a0f1a]">
                  {mockUser.notifications}
                </span>
              )}
            </button>

            {/* User avatar dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-gray-300 hover:bg-white/5 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#39FF14]/20 border border-[#39FF14]/40 text-[#39FF14] font-bold text-xs">
                  {mockUser.displayName.slice(0, 2).toUpperCase()}
                </div>
                <span className="hidden sm:block">{mockUser.displayName}</span>
                <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
              </button>

              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-xl border border-[#1e2a3a] bg-[#0f1520] shadow-xl shadow-black/40 py-1">
                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                    <div className="my-1 border-t border-[#1e2a3a]" />
                    <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden rounded-md p-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-[#0a0f1a] border-l border-[#1e2a3a] flex flex-col animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-[#1e2a3a] px-4 py-4">
              <span className="font-black text-lg bg-gradient-to-r from-[#39FF14] to-[#00d4ff] bg-clip-text text-transparent">
                ⬡ OctaFight
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-1.5 text-gray-400 hover:text-[#39FF14] hover:bg-[#39FF14]/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* User info */}
            <div className="border-b border-[#1e2a3a] px-4 py-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#39FF14]/20 border border-[#39FF14]/40 text-[#39FF14] font-bold text-sm">
                {mockUser.displayName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{mockUser.displayName}</p>
                <p className="text-xs text-gray-400">@{mockUser.username}</p>
              </div>
              <div className="ml-auto flex items-center gap-1 text-[#39FF14] text-sm font-semibold">
                <Wallet className="h-3.5 w-3.5" />
                ${mockUser.balance.toFixed(0)}
              </div>
            </div>

            <nav className="flex-1 px-2 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-[#1e2a3a] px-2 py-3 space-y-1">
              <Link
                href="/settings"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
