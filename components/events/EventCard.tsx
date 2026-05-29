'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Calendar, Tv, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCountdown } from '@/hooks/useCountdown';
import type { Event } from '@/types';

interface EventCardProps {
  event: Event;
  showCountdown?: boolean;
}

const STATUS_CONFIG = {
  UPCOMING: { label: 'Upcoming', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  LIVE: { label: 'LIVE', color: 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse' },
  COMPLETED: { label: 'Completed', color: 'bg-[#1e2a3a] text-[#4a5568] border-[#1e2a3a]' },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
};

export function EventCard({ event, showCountdown = true }: EventCardProps) {
  const eventDate = new Date(event.date);
  const { days, hours, minutes, isExpired } = useCountdown(eventDate);
  const config = STATUS_CONFIG[event.status] || STATUS_CONFIG.UPCOMING;
  const isLive = event.status === 'LIVE';

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-[#0f1520] border border-[#1e2a3a] rounded-2xl overflow-hidden hover:border-[#39FF14]/20 transition-all group"
    >
      {/* Top gradient */}
      <div className="h-2 bg-gradient-to-r from-[#39FF14] to-[#00d4ff]" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex-1">
            <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border mb-2", config.color)}>
              {isLive && <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1.5 animate-pulse" />}
              {config.label}
            </span>
            <h3 className="text-white font-black text-lg leading-tight group-hover:text-[#39FF14] transition-colors">
              {event.name}
            </h3>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-[#4a5568] text-sm">
            <MapPin size={14} />
            <span>{event.venue}, {event.city}</span>
          </div>
          <div className="flex items-center gap-2 text-[#4a5568] text-sm">
            <Calendar size={14} />
            <span>{eventDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          {event.broadcasters.length > 0 && (
            <div className="flex items-center gap-2 text-[#4a5568] text-sm">
              <Tv size={14} />
              <span>{event.broadcasters.join(' · ')}</span>
            </div>
          )}
        </div>

        {/* Countdown */}
        {showCountdown && event.status === 'UPCOMING' && !isExpired && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: 'Days', value: days },
              { label: 'Hours', value: hours },
              { label: 'Mins', value: minutes },
            ].map(unit => (
              <div key={unit.label} className="bg-[#080c12] rounded-xl p-2 text-center border border-[#1e2a3a]">
                <div className="text-[#39FF14] text-xl font-black">{String(unit.value).padStart(2, '0')}</div>
                <div className="text-[#4a5568] text-xs">{unit.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* CTAs */}
        <div className="flex gap-2">
          <Link href={`/events/${event.id}`} className="flex-1">
            <motion.button whileTap={{ scale: 0.97 }}
              className="w-full py-2.5 bg-[#1e2a3a] text-white rounded-xl text-sm font-medium hover:bg-[#2a3a4a] transition-colors flex items-center justify-center gap-1">
              View Card <ChevronRight size={14} />
            </motion.button>
          </Link>
          {event.status !== 'COMPLETED' && (
            <Link href="/lineup" className="flex-1">
              <motion.button whileTap={{ scale: 0.97 }}
                className="w-full py-2.5 bg-[#39FF14] text-[#080c12] rounded-xl text-sm font-bold hover:bg-[#2acc10] transition-all">
                Enter Contest
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
