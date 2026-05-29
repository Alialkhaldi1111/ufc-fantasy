'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Calendar, MapPin, Tv, ChevronRight, Radio } from 'lucide-react';
import { events } from '@/data/events';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

type Tab = 'all' | 'upcoming' | 'live' | 'completed';

function Countdown({ date }: { date: string }) {
  const target = new Date(date).getTime();
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return <span className="text-red-400 font-bold text-xs">LIVE NOW</span>;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return (
    <div className="flex items-center gap-1 text-xs font-bold text-[#39FF14]">
      {days}d {hours}h
    </div>
  );
}

export default function EventsPage() {
  const [tab, setTab] = useState<Tab>('all');
  const [search, setSearch] = useState('');

  const filtered = events.filter((e) => {
    const matchesTab = tab === 'all' || e.status.toLowerCase() === tab;
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.city.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const liveEvents = events.filter((e) => e.status === 'LIVE');
  const upcoming = events.filter((e) => e.status === 'UPCOMING');
  const completed = events.filter((e) => e.status === 'COMPLETED');

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: events.length },
    { key: 'upcoming', label: 'Upcoming', count: upcoming.length },
    { key: 'live', label: 'Live', count: liveEvents.length },
    { key: 'completed', label: 'Completed', count: completed.length },
  ];

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8">
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Events</h1>
          <p className="text-gray-400 mt-1">Browse UFC events and enter contests</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events or cities..."
            className="w-full rounded-xl border border-[#1e2a3a] bg-[#0a0f1a] pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#39FF14]/60 transition-all"
          />
        </div>
      </motion.div>

      {/* Filter tabs */}
      <motion.div variants={fadeInUp} className="flex gap-2 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              tab === t.key
                ? 'bg-[#39FF14] text-[#080c12]'
                : 'bg-[#0a0f1a] border border-[#1e2a3a] text-gray-400 hover:text-white'
            }`}
          >
            {t.key === 'live' && t.count > 0 && (
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            )}
            {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.key ? 'bg-[#080c12]/30' : 'bg-[#1e2a3a]'}`}>
              {t.count}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Live Now section */}
      {liveEvents.length > 0 && (tab === 'all' || tab === 'live') && (
        <motion.div variants={fadeInUp}>
          <div className="flex items-center gap-2 mb-4">
            <Radio className="h-4 w-4 text-red-500" />
            <h2 className="font-bold text-white">Live Now</h2>
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {liveEvents.map((evt) => (
              <Link
                key={evt.id}
                href={`/events/${evt.id}`}
                className="rounded-2xl border border-red-500/50 bg-red-500/5 p-5 hover:border-red-500 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-red-400 bg-red-500/20 px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
                    </div>
                    <h3 className="font-bold text-white">{evt.name}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" /> {evt.venue}, {evt.city}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-600 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Upcoming Events */}
      {(tab === 'all' || tab === 'upcoming') && (
        <motion.div variants={fadeInUp}>
          <h2 className="font-bold text-white mb-4">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.filter((e) => e.status === 'UPCOMING').map((evt) => (
              <Link key={evt.id} href={`/events/${evt.id}`} className="group rounded-2xl border border-[#1e2a3a] bg-[#0a0f1a] p-5 hover:border-[#39FF14]/40 transition-all flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white group-hover:text-[#39FF14] transition-colors truncate">{evt.name}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" /> {evt.venue}, {evt.city}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg bg-[#0f1520] border border-[#1e2a3a] p-2.5">
                    <p className="text-gray-500 mb-0.5">Date</p>
                    <p className="font-semibold text-white flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="rounded-lg bg-[#0f1520] border border-[#1e2a3a] p-2.5">
                    <p className="text-gray-500 mb-0.5">Countdown</p>
                    <Countdown date={evt.date} />
                  </div>
                  <div className="rounded-lg bg-[#0f1520] border border-[#1e2a3a] p-2.5">
                    <p className="text-gray-500 mb-0.5">Broadcasts</p>
                    <p className="font-semibold text-white flex items-center gap-1">
                      <Tv className="h-3 w-3" /> {evt.broadcasters.join(', ')}
                    </p>
                  </div>
                  <div className="rounded-lg bg-[#0f1520] border border-[#1e2a3a] p-2.5">
                    <p className="text-gray-500 mb-0.5">Fights</p>
                    <p className="font-semibold text-white">{evt.fights?.length || 0} bouts</p>
                  </div>
                </div>
                {evt.description && (
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{evt.description}</p>
                )}
                <div className="pt-2 border-t border-[#1e2a3a]">
                  <button className="w-full py-2.5 rounded-xl bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] text-sm font-semibold hover:bg-[#39FF14]/20 transition-all">
                    Enter Contest
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Past Events */}
      {(tab === 'all' || tab === 'completed') && completed.length > 0 && (
        <motion.div variants={fadeInUp}>
          <h2 className="font-bold text-white mb-4">Past Events</h2>
          <div className="space-y-3">
            {filtered.filter((e) => e.status === 'COMPLETED').map((evt) => (
              <Link key={evt.id} href={`/events/${evt.id}`} className="flex items-center gap-4 rounded-xl border border-[#1e2a3a] bg-[#0a0f1a] p-4 hover:border-[#39FF14]/30 transition-all">
                <div className="h-10 w-10 rounded-lg bg-[#0f1520] flex items-center justify-center text-gray-500 flex-shrink-0">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm truncate">{evt.name}</p>
                  <p className="text-xs text-gray-500">{evt.venue}, {evt.city} · {new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs font-semibold text-gray-500 bg-[#0f1520] border border-[#1e2a3a] px-2 py-1 rounded-full">COMPLETED</span>
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {filtered.length === 0 && (
        <motion.div variants={fadeInUp} className="text-center py-16 text-gray-500">
          <Calendar className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p className="font-semibold">No events found</p>
          <p className="text-sm mt-1">Try a different filter or search term</p>
        </motion.div>
      )}
    </motion.div>
  );
}
