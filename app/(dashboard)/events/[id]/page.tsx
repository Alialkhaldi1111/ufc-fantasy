'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { use } from 'react';
import { MapPin, Calendar, Tv, Shield, ChevronRight, Zap } from 'lucide-react';
import { getEventById } from '@/data/events';
import { Fight } from '@/types';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

type CardTab = 'main' | 'prelim' | 'early';

function FightCard({ fight }: { fight: Fight }) {
  const isFinished = fight.status === 'completed';
  return (
    <motion.div
      variants={fadeInUp}
      className={`rounded-2xl border bg-[#0a0f1a] p-5 ${
        fight.isMainEvent
          ? 'border-[#39FF14]/40 shadow-[0_0_20px_rgba(57,255,20,0.07)]'
          : 'border-[#1e2a3a]'
      }`}
    >
      {/* Badges */}
      <div className="flex items-center gap-2 mb-4">
        {fight.isMainEvent && (
          <span className="text-xs font-bold bg-[#39FF14] text-[#080c12] px-2 py-0.5 rounded-full">MAIN EVENT</span>
        )}
        {fight.isCoMain && (
          <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30">CO-MAIN</span>
        )}
        {fight.isTitleFight && (
          <span className="text-xs font-bold bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/30 flex items-center gap-1">
            <Shield className="h-3 w-3" /> TITLE FIGHT
          </span>
        )}
        <span className="ml-auto text-xs text-gray-500">{fight.weightClass} · {fight.scheduledRounds} Rds</span>
      </div>

      {/* Matchup */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* Fighter A */}
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-[#39FF14]/10 border-2 border-[#39FF14]/30 mx-auto mb-2 flex items-center justify-center text-lg font-black text-[#39FF14]">
            {fight.fighterA.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <p className="font-bold text-sm text-white leading-tight">{fight.fighterA.name}</p>
          {fight.fighterA.nickname && (
            <p className="text-xs text-gray-500 italic">&ldquo;{fight.fighterA.nickname}&rdquo;</p>
          )}
          <p className="text-xs text-[#39FF14] font-semibold mt-1">{fight.fighterA.record}</p>
          <p className="text-xs text-gray-500">{fight.fighterA.countryFlag}</p>
          {!isFinished && (
            <div className="mt-2 inline-flex items-center gap-1 bg-[#39FF14]/10 border border-[#39FF14]/20 px-2 py-1 rounded-lg">
              <Zap className="h-3 w-3 text-[#39FF14]" />
              <span className="text-xs text-[#39FF14] font-semibold">{fight.fighterA.projectedPoints} pts</span>
            </div>
          )}
          {isFinished && fight.winnerId === fight.fighterA.id && (
            <div className="mt-2 inline-flex items-center gap-1 bg-green-500/10 border border-green-500/30 px-2 py-1 rounded-lg">
              <span className="text-xs text-green-400 font-semibold">WIN</span>
            </div>
          )}
        </div>

        {/* VS */}
        <div className="text-center">
          <div className="text-2xl font-black text-gray-600">VS</div>
          {isFinished && fight.finishMethod && (
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-400 font-semibold">{fight.finishMethod}</p>
              <p className="text-xs text-gray-600">Rd {fight.finishRound} @ {fight.finishTime}</p>
            </div>
          )}
        </div>

        {/* Fighter B */}
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-blue-500/10 border-2 border-blue-500/30 mx-auto mb-2 flex items-center justify-center text-lg font-black text-blue-400">
            {fight.fighterB.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <p className="font-bold text-sm text-white leading-tight">{fight.fighterB.name}</p>
          {fight.fighterB.nickname && (
            <p className="text-xs text-gray-500 italic">&ldquo;{fight.fighterB.nickname}&rdquo;</p>
          )}
          <p className="text-xs text-blue-400 font-semibold mt-1">{fight.fighterB.record}</p>
          <p className="text-xs text-gray-500">{fight.fighterB.countryFlag}</p>
          {!isFinished && (
            <div className="mt-2 inline-flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-lg">
              <Zap className="h-3 w-3 text-blue-400" />
              <span className="text-xs text-blue-400 font-semibold">{fight.fighterB.projectedPoints} pts</span>
            </div>
          )}
          {isFinished && fight.winnerId === fight.fighterB.id && (
            <div className="mt-2 inline-flex items-center gap-1 bg-green-500/10 border border-green-500/30 px-2 py-1 rounded-lg">
              <span className="text-xs text-green-400 font-semibold">WIN</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#1e2a3a] grid grid-cols-2 gap-2">
        <Link href={`/fighters/${fight.fighterA.id}`} className="text-xs text-center text-gray-400 hover:text-[#39FF14] transition-colors py-1.5 rounded-lg border border-[#1e2a3a] hover:border-[#39FF14]/30">
          {fight.fighterA.name.split(' ')[0]} Stats
        </Link>
        <Link href={`/fighters/${fight.fighterB.id}`} className="text-xs text-center text-gray-400 hover:text-[#39FF14] transition-colors py-1.5 rounded-lg border border-[#1e2a3a] hover:border-[#39FF14]/30">
          {fight.fighterB.name.split(' ')[0]} Stats
        </Link>
      </div>
    </motion.div>
  );
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const event = getEventById(id);
  const [activeTab, setActiveTab] = useState<CardTab>('main');

  if (!event) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg font-semibold">Event not found</p>
        <Link href="/events" className="text-[#39FF14] text-sm mt-2 hover:underline">Back to Events</Link>
      </div>
    );
  }

  const fights = event.fights || [];
  const mainCard = fights.filter((f) => f.cardType === 'main');
  const prelims = fights.filter((f) => f.cardType === 'prelim');
  const earlyPrelims = fights.filter((f) => f.cardType === 'early');

  const cardMap: Record<CardTab, Fight[]> = { main: mainCard, prelim: prelims, early: earlyPrelims };

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8">
      {/* Breadcrumb */}
      <motion.div variants={fadeInUp} className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/events" className="hover:text-gray-300">Events</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-300">{event.shortName || event.name}</span>
      </motion.div>

      {/* Event Header */}
      <motion.div
        variants={fadeInUp}
        className="rounded-2xl border border-[#39FF14]/30 bg-gradient-to-br from-[#39FF14]/5 to-[#00d4ff]/3 p-6 md:p-8"
      >
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div>
            <div className="flex items-center gap-2 mb-3">
              {event.status === 'LIVE' && (
                <span className="text-xs font-bold text-red-400 bg-red-500/20 px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
              )}
              {event.status === 'UPCOMING' && (
                <span className="text-xs font-bold text-[#39FF14] bg-[#39FF14]/20 px-2 py-0.5 rounded-full">UPCOMING</span>
              )}
              {event.status === 'COMPLETED' && (
                <span className="text-xs font-bold text-gray-400 bg-[#1e2a3a] px-2 py-0.5 rounded-full">COMPLETED</span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">{event.name}</h1>
            {event.description && (
              <p className="text-gray-400 mt-3 leading-relaxed">{event.description}</p>
            )}
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-4 w-4 text-[#39FF14]" />
                <span>{event.venue}, {event.city}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="h-4 w-4 text-[#39FF14]" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Tv className="h-4 w-4 text-[#39FF14]" />
                <span>{event.broadcasters.join(' · ')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="h-4 w-4 text-[#39FF14]" />
                <span>{fights.length} fights scheduled</span>
              </div>
            </div>
            {event.mainCardTime && (
              <p className="text-sm text-gray-500 mt-3">Main Card: {event.mainCardTime} · Prelims: {event.prelimTime}</p>
            )}
          </div>

          {/* CTA Sidebar */}
          <div className="rounded-2xl border border-[#1e2a3a] bg-[#0a0f1a] p-6 space-y-4">
            <h3 className="font-bold text-white">Enter a Contest</h3>
            {[
              { name: 'Mega GPP', prize: '$500,000', fee: '$25', entries: '18,420/20,000' },
              { name: 'Freeroll', prize: '$1,000', fee: 'FREE', entries: '4,210/5,000' },
              { name: 'Head-to-Head', prize: '$50', fee: '$25', entries: '1/2' },
            ].map((c) => (
              <div key={c.name} className="flex items-center justify-between rounded-xl bg-[#0f1520] border border-[#1e2a3a] p-3 hover:border-[#39FF14]/30 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-white">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.entries} entries</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#39FF14]">{c.prize}</p>
                  <p className="text-xs text-gray-400">{c.fee}</p>
                </div>
              </div>
            ))}
            <Link
              href="/lineup"
              className="block w-full text-center py-3 rounded-xl bg-[#39FF14] text-[#080c12] font-bold text-sm hover:bg-[#39FF14]/90 transition-all"
              style={{ boxShadow: '0 0 20px rgba(57,255,20,0.4)' }}
            >
              Build Your Lineup
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Card Tabs */}
      <motion.div variants={fadeInUp}>
        <div className="flex gap-2 mb-6">
          {([
            { key: 'main', label: 'Main Card', count: mainCard.length },
            { key: 'prelim', label: 'Prelims', count: prelims.length },
            { key: 'early', label: 'Early Prelims', count: earlyPrelims.length },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === t.key
                  ? 'bg-[#39FF14] text-[#080c12]'
                  : 'bg-[#0a0f1a] border border-[#1e2a3a] text-gray-400 hover:text-white'
              }`}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {cardMap[activeTab].length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No fights announced for this card yet.</p>
            </div>
          ) : (
            cardMap[activeTab].map((fight) => (
              <FightCard key={fight.id} fight={fight} />
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
