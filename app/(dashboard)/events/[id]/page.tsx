'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { use } from 'react';
import { MapPin, Calendar, Tv, Shield, ChevronRight, Zap, Star, ChevronDown, CheckCircle } from 'lucide-react';
import { getEventById } from '@/data/events';
import { useEventStore } from '@/store/useEventStore';
import { Fight } from '@/types';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

type CardTab = 'main' | 'prelim' | 'early';

const USER_ID = 'local-user';

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`w-6 h-6 ${(hover || value) >= s ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
          />
        </button>
      ))}
    </div>
  );
}

function RoundScorer({ fight, fightOfNight }: { fight: Fight; fightOfNight: boolean }) {
  const { addRoundScore, addRating, setPrediction, getAverageRating, getCurrentScore, getRoundScores, getPredictionStats } = useEventStore();
  const [open, setOpen] = useState(false);
  const [myRating, setMyRating] = useState(0);
  const [review, setReview] = useState('');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [myPred, setMyPred] = useState<string | null>(null);

  const isCompleted = fight.status === 'completed';
  const isUpcoming = fight.status === 'scheduled';
  const avgRating = getAverageRating(fight.id);
  const currentScore = getCurrentScore(fight.id);
  const roundScores = getRoundScores(fight.id);
  const predStats = getPredictionStats(fight.id, fight.fighterA.id, fight.fighterB.id);

  const handleRoundScore = (round: number, aScore: number, bScore: number) => {
    addRoundScore(fight.id, { round, fighterAScore: aScore, fighterBScore: bScore });
  };

  const handleRating = () => {
    if (!myRating) return;
    addRating({ fightId: fight.id, stars: myRating, review, userId: USER_ID, timestamp: Date.now() });
    setRatingSubmitted(true);
  };

  const handlePredict = (winnerId: string, method: 'KO' | 'SUB' | 'DEC') => {
    setMyPred(winnerId + method);
    setPrediction({ fightId: fight.id, predictedWinnerId: winnerId, method, userId: USER_ID });
  };

  return (
    <motion.div
      variants={fadeInUp}
      className={`rounded-2xl border bg-[#0a0f1a] overflow-hidden ${
        fight.isMainEvent ? 'border-[#39FF14]/40 shadow-[0_0_20px_rgba(57,255,20,0.07)]' : 'border-[#1e2a3a]'
      }`}
    >
      {/* Fight header */}
      <div className="p-5">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {fight.isMainEvent && <span className="text-xs font-bold bg-[#39FF14] text-[#080c12] px-2 py-0.5 rounded-full">MAIN EVENT</span>}
          {fight.isCoMain && <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30">CO-MAIN</span>}
          {fight.isTitleFight && <span className="text-xs font-bold bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/30 flex items-center gap-1"><Shield className="h-3 w-3" /> TITLE FIGHT</span>}
          {fightOfNight && <span className="text-xs font-bold bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/30">⭐ FIGHT OF THE NIGHT</span>}
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
            {fight.fighterA.nickname && <p className="text-xs text-gray-500 italic">&ldquo;{fight.fighterA.nickname}&rdquo;</p>}
            <p className="text-xs text-[#39FF14] font-semibold mt-1">{fight.fighterA.record}</p>
            <p className="text-xs text-gray-500">{fight.fighterA.countryFlag}</p>
            {!isCompleted && <div className="mt-2 inline-flex items-center gap-1 bg-[#39FF14]/10 border border-[#39FF14]/20 px-2 py-1 rounded-lg"><Zap className="h-3 w-3 text-[#39FF14]" /><span className="text-xs text-[#39FF14] font-semibold">{fight.fighterA.projectedPoints} pts</span></div>}
            {isCompleted && fight.winnerId === fight.fighterA.id && <div className="mt-2 inline-flex items-center gap-1 bg-green-500/10 border border-green-500/30 px-2 py-1 rounded-lg"><span className="text-xs text-green-400 font-semibold">WIN</span></div>}
          </div>

          {/* VS */}
          <div className="text-center">
            <div className="text-2xl font-black text-gray-600">VS</div>
            {isCompleted && fight.finishMethod && (
              <div className="mt-2">
                <p className="text-xs text-gray-400 font-semibold">{fight.finishMethod}</p>
                <p className="text-xs text-gray-600">Rd {fight.finishRound} @ {fight.finishTime}</p>
              </div>
            )}
            {/* Live score */}
            {!isCompleted && (currentScore.fighterA > 0 || currentScore.fighterB > 0) && (
              <div className="mt-2 text-center">
                <p className="text-sm font-black text-white">{currentScore.fighterA} – {currentScore.fighterB}</p>
                <p className="text-xs text-gray-500">your scorecard</p>
              </div>
            )}
          </div>

          {/* Fighter B */}
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-blue-500/10 border-2 border-blue-500/30 mx-auto mb-2 flex items-center justify-center text-lg font-black text-blue-400">
              {fight.fighterB.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <p className="font-bold text-sm text-white leading-tight">{fight.fighterB.name}</p>
            {fight.fighterB.nickname && <p className="text-xs text-gray-500 italic">&ldquo;{fight.fighterB.nickname}&rdquo;</p>}
            <p className="text-xs text-blue-400 font-semibold mt-1">{fight.fighterB.record}</p>
            <p className="text-xs text-gray-500">{fight.fighterB.countryFlag}</p>
            {!isCompleted && <div className="mt-2 inline-flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-lg"><Zap className="h-3 w-3 text-blue-400" /><span className="text-xs text-blue-400 font-semibold">{fight.fighterB.projectedPoints} pts</span></div>}
            {isCompleted && fight.winnerId === fight.fighterB.id && <div className="mt-2 inline-flex items-center gap-1 bg-green-500/10 border border-green-500/30 px-2 py-1 rounded-lg"><span className="text-xs text-green-400 font-semibold">WIN</span></div>}
          </div>
        </div>

        {/* Community prediction bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>{fight.fighterA.name.split(' ').slice(-1)[0]} {predStats.aPercent}%</span>
            <span className="text-gray-600">{predStats.total > 0 ? `${predStats.total} picks` : 'No picks yet'}</span>
            <span>{predStats.bPercent}% {fight.fighterB.name.split(' ').slice(-1)[0]}</span>
          </div>
          <div className="h-2 rounded-full bg-[#1e2a3a] overflow-hidden flex">
            <div className="bg-[#39FF14] transition-all duration-500" style={{ width: `${predStats.aPercent}%` }} />
            <div className="bg-blue-400 transition-all duration-500 flex-1" />
          </div>
        </div>

        {/* Avg rating for completed fights */}
        {isCompleted && avgRating > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className={`w-3.5 h-3.5 ${avgRating >= s ? 'text-yellow-400 fill-yellow-400' : avgRating >= s - 0.5 ? 'text-yellow-400' : 'text-gray-600'}`} />
              ))}
            </div>
            <span className="text-xs text-gray-400">{avgRating.toFixed(1)} community rating</span>
          </div>
        )}
      </div>

      {/* Expand button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full px-5 py-3 border-t border-[#1e2a3a] flex items-center justify-between text-xs text-gray-400 hover:text-white hover:bg-white/[0.02] transition-colors"
      >
        <span>{isCompleted ? 'Rate this fight / view scorecard' : isUpcoming ? 'Predict the winner' : 'Score this fight'}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#1e2a3a]"
          >
            <div className="p-5 space-y-5">
              {/* PREDICT — upcoming fights */}
              {isUpcoming && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Call It — Pick the Winner</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: fight.fighterA.id, label: fight.fighterA.name.split(' ').slice(-1)[0], color: 'border-[#39FF14]/40 text-[#39FF14]' },
                      { id: fight.fighterB.id, label: fight.fighterB.name.split(' ').slice(-1)[0], color: 'border-blue-400/40 text-blue-400' },
                    ].flatMap(({ id, label, color }) =>
                      (['KO', 'SUB', 'DEC'] as const).map((m) => {
                        const key = id + m;
                        const active = myPred === key;
                        return (
                          <button
                            key={key}
                            onClick={() => handlePredict(id, m)}
                            className={`p-2 rounded-xl border text-xs font-semibold transition-all ${active ? 'bg-white/10 ' + color : 'border-[#1e2a3a] text-gray-500 hover:border-gray-500'}`}
                          >
                            {label} by {m}
                            {active && <CheckCircle className="w-3 h-3 inline ml-1" />}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* ROUND SCORING — any non-completed fight */}
              {!isCompleted && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Score the Rounds</p>
                  <div className="space-y-2">
                    {Array.from({ length: fight.scheduledRounds }, (_, i) => i + 1).map((round) => {
                      const scored = roundScores.find((r) => r.round === round);
                      return (
                        <div key={round} className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-12 flex-shrink-0">Round {round}</span>
                          <button
                            onClick={() => handleRoundScore(round, 10, 9)}
                            className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-all ${scored?.fighterAScore === 10 ? 'bg-[#39FF14]/20 border-[#39FF14]/50 text-[#39FF14]' : 'border-[#1e2a3a] text-gray-500 hover:border-[#39FF14]/30'}`}
                          >
                            10-9 {fight.fighterA.name.split(' ').slice(-1)[0]}
                          </button>
                          <button
                            onClick={() => handleRoundScore(round, 9, 10)}
                            className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-all ${scored?.fighterBScore === 10 ? 'bg-blue-500/20 border-blue-400/50 text-blue-400' : 'border-[#1e2a3a] text-gray-500 hover:border-blue-400/30'}`}
                          >
                            10-9 {fight.fighterB.name.split(' ').slice(-1)[0]}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  {(currentScore.fighterA > 0 || currentScore.fighterB > 0) && (
                    <div className="mt-3 p-3 rounded-xl bg-[#080c12] border border-[#1e2a3a] text-center">
                      <p className="text-xs text-gray-500 mb-1">Your Scorecard</p>
                      <p className="text-lg font-black text-white">
                        <span className="text-[#39FF14]">{fight.fighterA.name.split(' ').slice(-1)[0]}</span>
                        {' '}{currentScore.fighterA} – {currentScore.fighterB}{' '}
                        <span className="text-blue-400">{fight.fighterB.name.split(' ').slice(-1)[0]}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {currentScore.fighterA > currentScore.fighterB
                          ? `${fight.fighterA.name.split(' ').slice(-1)[0]} leads`
                          : currentScore.fighterB > currentScore.fighterA
                          ? `${fight.fighterB.name.split(' ').slice(-1)[0]} leads`
                          : 'Even'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* RATING — completed fights */}
              {isCompleted && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Rate This Fight</p>
                  {ratingSubmitted ? (
                    <div className="flex items-center gap-2 text-[#39FF14] text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Thanks for rating! {myRating}/5 stars</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <StarRating value={myRating} onChange={setMyRating} />
                      <input
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Add a review (optional)…"
                        className="w-full bg-[#080c12] border border-[#1e2a3a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50"
                      />
                      <button
                        onClick={handleRating}
                        disabled={!myRating}
                        className="px-4 py-2 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] text-sm font-semibold hover:bg-[#39FF14]/20 disabled:opacity-40 transition-all"
                      >
                        Submit Rating
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Fighter stat links */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1e2a3a]">
                <Link href={`/fighters/${fight.fighterA.id}`} className="text-xs text-center text-gray-400 hover:text-[#39FF14] transition-colors py-1.5 rounded-lg border border-[#1e2a3a] hover:border-[#39FF14]/30">
                  {fight.fighterA.name.split(' ')[0]} Stats
                </Link>
                <Link href={`/fighters/${fight.fighterB.id}`} className="text-xs text-center text-gray-400 hover:text-[#39FF14] transition-colors py-1.5 rounded-lg border border-[#1e2a3a] hover:border-[#39FF14]/30">
                  {fight.fighterB.name.split(' ')[0]} Stats
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const event = getEventById(id);
  const [activeTab, setActiveTab] = useState<CardTab>('main');
  const { getFightOfNight } = useEventStore();

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
  const allFightIds = fights.map((f) => f.id);
  const fotNight = getFightOfNight(allFightIds);

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8">
      {/* Breadcrumb */}
      <motion.div variants={fadeInUp} className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/events" className="hover:text-gray-300">Events</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-300">{event.shortName || event.name}</span>
      </motion.div>

      {/* Event Header */}
      <motion.div variants={fadeInUp} className="rounded-2xl border border-[#39FF14]/30 bg-gradient-to-br from-[#39FF14]/5 to-[#00d4ff]/3 p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div>
            <div className="flex items-center gap-2 mb-3">
              {event.status === 'LIVE' && <span className="text-xs font-bold text-red-400 bg-red-500/20 px-2 py-0.5 rounded-full animate-pulse">LIVE</span>}
              {event.status === 'UPCOMING' && <span className="text-xs font-bold text-[#39FF14] bg-[#39FF14]/20 px-2 py-0.5 rounded-full">UPCOMING</span>}
              {event.status === 'COMPLETED' && <span className="text-xs font-bold text-gray-400 bg-[#1e2a3a] px-2 py-0.5 rounded-full">COMPLETED</span>}
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">{event.name}</h1>
            {event.description && <p className="text-gray-400 mt-3 leading-relaxed">{event.description}</p>}
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-400"><MapPin className="h-4 w-4 text-[#39FF14]" /><span>{event.venue}, {event.city}</span></div>
              <div className="flex items-center gap-2 text-gray-400"><Calendar className="h-4 w-4 text-[#39FF14]" /><span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span></div>
              <div className="flex items-center gap-2 text-gray-400"><Tv className="h-4 w-4 text-[#39FF14]" /><span>{event.broadcasters.join(' · ')}</span></div>
              <div className="flex items-center gap-2 text-gray-400"><Shield className="h-4 w-4 text-[#39FF14]" /><span>{fights.length} fights scheduled</span></div>
            </div>
            {event.mainCardTime && <p className="text-sm text-gray-500 mt-3">Main Card: {event.mainCardTime} · Prelims: {event.prelimTime}</p>}
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
                <div><p className="text-sm font-semibold text-white">{c.name}</p><p className="text-xs text-gray-500">{c.entries} entries</p></div>
                <div className="text-right"><p className="text-sm font-bold text-[#39FF14]">{c.prize}</p><p className="text-xs text-gray-400">{c.fee}</p></div>
              </div>
            ))}
            <Link href="/lineup" className="block w-full text-center py-3 rounded-xl bg-[#39FF14] text-[#080c12] font-bold text-sm hover:bg-[#39FF14]/90 transition-all" style={{ boxShadow: '0 0 20px rgba(57,255,20,0.4)' }}>
              Build Your Lineup
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Card Tabs */}
      <motion.div variants={fadeInUp}>
        <div className="flex gap-2 mb-6 flex-wrap">
          {([
            { key: 'main', label: 'Main Card', count: mainCard.length },
            { key: 'prelim', label: 'Prelims', count: prelims.length },
            { key: 'early', label: 'Early Prelims', count: earlyPrelims.length },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === t.key ? 'bg-[#39FF14] text-[#080c12]' : 'bg-[#0a0f1a] border border-[#1e2a3a] text-gray-400 hover:text-white'}`}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {cardMap[activeTab].length === 0 ? (
            <div className="text-center py-12 text-gray-500"><p>No fights announced for this card yet.</p></div>
          ) : (
            cardMap[activeTab].map((fight) => (
              <RoundScorer key={fight.id} fight={fight} fightOfNight={fotNight === fight.id} />
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
