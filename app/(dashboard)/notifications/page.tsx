'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Trophy, Zap, Info, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const MOCK_NOTIFICATIONS = [
  { id: '1', type: 'contest', title: 'Contest Starting Soon!', body: 'UFC 315 Grand Slam begins in 2 hours. Your lineup is locked.', read: false, createdAt: new Date(Date.now() - 30 * 60 * 1000) },
  { id: '2', type: 'fight', title: 'Fight Result: Jon Jones W', body: 'Jon Jones defeated Ciryl Gane via Decision. +67.5 fantasy points!', read: false, createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: '3', type: 'success', title: '🏆 You Won $45!', body: 'Congrats! You finished 2nd in the Head-to-Head Showdown.', read: false, createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) },
  { id: '4', type: 'info', title: 'New Contest Available', body: 'UFC 316 early bird contest is now open. $5K prize pool!', read: true, createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  { id: '5', type: 'fight', title: 'LIVE: Ilia Topuria vs Max Holloway', body: 'R2 — Topuria landing heavy shots. Live scoring active.', read: true, createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000) },
  { id: '6', type: 'success', title: 'Achievement Unlocked: Grind', body: 'You\'ve maintained a 7-day login streak! +100 XP earned.', read: true, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { id: '7', type: 'info', title: 'Referral Bonus', body: 'Your friend Jake joined OctaFight! You earned $5 bonus.', read: true, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
  { id: '8', type: 'warning', title: 'Lineup Reminder', body: 'UFC 315 locks in 1 hour. Don\'t forget to submit your lineup!', read: true, createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
];

const TYPE_CONFIG: Record<string, { icon: React.ReactNode; borderColor: string; bgColor: string }> = {
  contest: { icon: <Trophy size={16} className="text-yellow-400" />, borderColor: 'border-yellow-500/30', bgColor: 'bg-yellow-500/5' },
  fight: { icon: <Zap size={16} className="text-red-400" />, borderColor: 'border-red-500/30', bgColor: 'bg-red-500/5' },
  success: { icon: <CheckCircle size={16} className="text-[#39FF14]" />, borderColor: 'border-[#39FF14]/30', bgColor: 'bg-[#39FF14]/5' },
  info: { icon: <Info size={16} className="text-blue-400" />, borderColor: 'border-blue-500/30', bgColor: 'bg-blue-500/5' },
  warning: { icon: <AlertTriangle size={16} className="text-orange-400" />, borderColor: 'border-orange-500/30', bgColor: 'bg-orange-500/5' },
};

const FILTERS = ['All', 'Unread', 'Fight Results', 'Contests', 'System'];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState('All');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filtered = notifications.filter(n => {
    if (filter === 'Unread') return !n.read;
    if (filter === 'Fight Results') return n.type === 'fight';
    if (filter === 'Contests') return n.type === 'contest';
    if (filter === 'System') return n.type === 'info' || n.type === 'warning';
    return true;
  });

  function markAllRead() {
    setNotifications(ns => ns.map(n => ({ ...n, read: true })));
  }

  function dismiss(id: string) {
    setNotifications(ns => ns.filter(n => n.id !== id));
  }

  function markRead(id: string) {
    setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
  }

  return (
    <div className="min-h-screen bg-[#080c12] pb-24 lg:pb-8">
      <div className="px-4 pt-6 pb-4 lg:px-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-[#39FF14] text-[#080c12] text-xs font-bold rounded-full">{unreadCount}</span>
            )}
          </h1>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-[#39FF14] text-sm hover:text-[#2acc10] transition-colors">
            Mark all read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="px-4 lg:px-8 mb-4 flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn("px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              filter === f ? 'bg-[#39FF14] text-[#080c12]' : 'bg-[#0f1520] border border-[#1e2a3a] text-[#4a5568] hover:border-[#39FF14]/30')}>
            {f}
          </button>
        ))}
      </div>

      <div className="px-4 lg:px-8 space-y-2">
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Bell size={40} className="mx-auto mb-3 text-[#1e2a3a]" />
            <p className="text-[#4a5568]">No notifications here.</p>
          </div>
        )}
        {filtered.map((notif, i) => {
          const config = TYPE_CONFIG[notif.type] || TYPE_CONFIG.info;
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => markRead(notif.id)}
              className={cn(
                "flex gap-3 p-4 rounded-xl border-l-4 cursor-pointer transition-all",
                config.borderColor, config.bgColor,
                notif.read ? 'opacity-60 bg-[#0f1520] border-[#1e2a3a]' : 'bg-[#0f1520]'
              )}
            >
              <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={cn("text-sm font-semibold", notif.read ? 'text-[#4a5568]' : 'text-white')}>{notif.title}</h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!notif.read && <span className="w-2 h-2 bg-[#39FF14] rounded-full" />}
                    <button onClick={e => { e.stopPropagation(); dismiss(notif.id); }}
                      className="text-[#4a5568] hover:text-white transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-[#4a5568] text-xs mt-0.5">{notif.body}</p>
                <p className="text-[#4a5568] text-xs mt-1">{formatDistanceToNow(notif.createdAt, { addSuffix: true })}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
