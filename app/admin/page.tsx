'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Trophy, DollarSign, Zap, Plus, Bell, Activity, ChevronRight } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

const STATS = [
  { label: 'Total Users', value: '2,847', change: '+124 this week', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Active Contests', value: '12', change: '3 live now', icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { label: 'Total Revenue', value: '$48,320', change: '+$2,100 today', icon: DollarSign, color: 'text-[#39FF14]', bg: 'bg-[#39FF14]/10' },
  { label: 'Events Scheduled', value: '5', change: '1 live', icon: Zap, color: 'text-purple-400', bg: 'bg-purple-500/10' },
];

const RECENT_USERS = [
  { username: 'fightfan_2025', email: 'fan@example.com', joined: '2 mins ago', plan: 'Free', status: 'Active' },
  { username: 'mma_pro_99', email: 'pro@example.com', joined: '15 mins ago', plan: 'Pro', status: 'Active' },
  { username: 'knockout_king', email: 'ko@example.com', joined: '1 hr ago', plan: 'Elite', status: 'Active' },
  { username: 'submission_god', email: 'sub@example.com', joined: '3 hrs ago', plan: 'Free', status: 'Pending' },
  { username: 'cage_analyst', email: 'cage@example.com', joined: '6 hrs ago', plan: 'Pro', status: 'Active' },
];

const QUICK_ACTIONS = [
  { label: 'Add Event', href: '/admin/events/new', icon: Plus, color: 'text-[#39FF14]' },
  { label: 'Add Fighter', href: '/admin/fighters', icon: Users, color: 'text-blue-400' },
  { label: 'Create Contest', href: '/admin/contests/new', icon: Trophy, color: 'text-yellow-400' },
  { label: 'Send Notification', href: '/admin/notifications', icon: Bell, color: 'text-purple-400' },
];

const HEALTH = [
  { label: 'API Response', status: 'healthy', value: '42ms' },
  { label: 'Database', status: 'healthy', value: '12ms' },
  { label: 'Pusher Realtime', status: 'healthy', value: 'Connected' },
  { label: 'Stripe Payments', status: 'healthy', value: 'Operational' },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#080c12] pb-8">
      {/* Header */}
      <div className="bg-[#0f1520] border-b border-[#1e2a3a] px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white">Admin Panel</h1>
          <p className="text-[#4a5568] text-xs">admin@octafight.gg</p>
        </div>
        <span className="px-3 py-1 bg-[#39FF14]/10 text-[#39FF14] text-xs font-bold rounded-full border border-[#39FF14]/20">ADMIN</span>
      </div>

      <div className="px-6 pt-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl p-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.bg)}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-[#4a5568] text-xs mt-0.5">{stat.label}</div>
              <div className={cn("text-xs mt-1", stat.color)}>{stat.change}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Signups */}
          <div className="lg:col-span-2 bg-[#0f1520] border border-[#1e2a3a] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e2a3a]">
              <h2 className="text-white font-bold flex items-center gap-2"><Users size={16} className="text-[#39FF14]" /> Recent Signups</h2>
              <Link href="/admin/users" className="text-[#4a5568] hover:text-[#39FF14] text-xs transition-colors flex items-center gap-1">
                View all <ChevronRight size={12} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1e2a3a]">
                    {['Username', 'Email', 'Joined', 'Plan', 'Status'].map(h => (
                      <th key={h} className="text-left text-[#4a5568] text-xs px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RECENT_USERS.map((user, i) => (
                    <tr key={i} className="border-b border-[#1e2a3a]/50 hover:bg-[#141d2e] transition-colors">
                      <td className="px-5 py-3 text-white text-sm font-medium">{user.username}</td>
                      <td className="px-5 py-3 text-[#4a5568] text-sm">{user.email}</td>
                      <td className="px-5 py-3 text-[#4a5568] text-xs">{user.joined}</td>
                      <td className="px-5 py-3">
                        <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium",
                          user.plan === 'Elite' ? 'bg-yellow-500/10 text-yellow-400' :
                          user.plan === 'Pro' ? 'bg-[#39FF14]/10 text-[#39FF14]' :
                          'bg-[#1e2a3a] text-[#4a5568]')}>
                          {user.plan}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={cn("flex items-center gap-1 text-xs",
                          user.status === 'Active' ? 'text-[#39FF14]' : 'text-yellow-400')}>
                          <span className={cn("w-1.5 h-1.5 rounded-full", user.status === 'Active' ? 'bg-[#39FF14]' : 'bg-yellow-400')} />
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl p-5">
              <h2 className="text-white font-bold mb-3 flex items-center gap-2"><Zap size={16} className="text-[#39FF14]" /> Quick Actions</h2>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_ACTIONS.map(action => (
                  <Link key={action.label} href={action.href}>
                    <div className="flex flex-col items-center gap-2 p-3 bg-[#080c12] border border-[#1e2a3a] rounded-xl hover:border-[#39FF14]/30 transition-all cursor-pointer">
                      <action.icon size={20} className={action.color} />
                      <span className="text-white text-xs font-medium text-center">{action.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl p-5">
              <h2 className="text-white font-bold mb-3 flex items-center gap-2"><Activity size={16} className="text-[#39FF14]" /> System Health</h2>
              <div className="space-y-2">
                {HEALTH.map(item => (
                  <div key={item.label} className="flex items-center justify-between py-1">
                    <span className="text-[#4a5568] text-xs">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#4a5568] text-xs">{item.value}</span>
                      <span className="w-2 h-2 rounded-full bg-[#39FF14]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
