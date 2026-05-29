'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Swords, Trophy, User } from 'lucide-react';
import { clsx } from 'clsx';

interface TabItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabItem[] = [
  { href: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
  { href: '/events', label: 'Events', icon: <Calendar className="h-5 w-5" /> },
  { href: '/lineup', label: 'Lineup', icon: <Swords className="h-5 w-5" /> },
  { href: '/leaderboard', label: 'Rankings', icon: <Trophy className="h-5 w-5" /> },
  { href: '/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-[#1e2a3a] bg-[#0a0f1a]/90 backdrop-blur-md"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch">
        {tabs.map((tab) => {
          const isActive =
            tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={clsx(
                'flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium tracking-wide transition-colors',
                isActive ? 'text-[#39FF14]' : 'text-gray-500 hover:text-gray-300'
              )}
            >
              <span
                className={clsx(
                  'transition-all duration-200',
                  isActive && 'drop-shadow-[0_0_6px_rgba(57,255,20,0.8)]'
                )}
              >
                {tab.icon}
              </span>
              <span
                className={clsx(
                  isActive && 'text-[#39FF14]',
                  'uppercase tracking-widest text-[9px]'
                )}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute top-0 h-[2px] w-10 rounded-full bg-[#39FF14] shadow-[0_0_6px_rgba(57,255,20,0.8)]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
