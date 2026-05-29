'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Trophy,
  Users,
  Zap,
  Star,
  CheckCircle,
  ChevronDown,
  Target,
  Shield,
  ArrowRight,
  X,
  Mail,
  Globe,
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const neonGlow = '0 0 20px rgba(57,255,20,0.5), 0 0 40px rgba(57,255,20,0.2)';

export default function LandingPage() {
  return (
    <div className="bg-[#080c12] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e2a3a]/60 bg-[#080c12]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <span className="text-xl font-black tracking-tight">
            <span className="text-[#39FF14]" style={{ textShadow: neonGlow }}>⬡</span>{' '}
            <span className="bg-gradient-to-r from-[#39FF14] to-[#00d4ff] bg-clip-text text-transparent">
              OctaFight
            </span>
          </span>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
            <Link href="#contests" className="hover:text-white transition-colors">Contests</Link>
            <Link href="#scoring" className="hover:text-white transition-colors">Scoring</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="text-sm text-gray-300 hover:text-white transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="text-sm font-semibold bg-[#39FF14] text-[#080c12] px-4 py-2 rounded-lg hover:bg-[#39FF14]/90 transition-all"
              style={{ boxShadow: '0 0 15px rgba(57,255,20,0.4)' }}
            >
              Play Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Hex grid background */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 17.3v17.4L30 52 0 34.7V17.3z' fill='none' stroke='%2339FF14' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 52px',
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#39FF14]/3 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 px-4 py-1.5 text-xs font-semibold text-[#39FF14] mb-6">
              <Zap className="h-3 w-3" /> 847 CONTESTS LIVE NOW
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              The Ultimate{' '}
              <span className="text-[#39FF14]" style={{ textShadow: neonGlow }}>
                MMA Fantasy
              </span>{' '}
              Experience
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 mb-8">
              Draft UFC fighters, build championship lineups, and compete for real cash prizes in the world&apos;s most immersive MMA fantasy platform.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[#080c12] bg-[#39FF14] hover:bg-[#39FF14]/90 transition-all text-base"
                style={{ boxShadow: '0 0 30px rgba(57,255,20,0.5)' }}
              >
                Play For Free <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white border border-[#1e2a3a] bg-white/5 hover:bg-white/10 transition-all text-base">
                Watch Demo
              </button>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-[#39FF14]" /> No credit card</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-[#39FF14]" /> Free contests daily</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-[#39FF14]" /> Real cash prizes</span>
            </motion.div>
          </motion.div>

          {/* Lineup preview card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[440px] rounded-2xl bg-gradient-to-br from-[#39FF14]/10 to-[#00d4ff]/5 border border-[#39FF14]/20 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-gray-400 uppercase tracking-widest">My Lineup — UFC 310</h3>
                <span className="text-xs text-[#39FF14] font-semibold">Projected: 214.3 pts</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Islam Makhachev', pts: '52.4', salary: '$9,800', wc: 'LW' },
                  { name: 'Jon Jones', pts: '55.1', salary: '$10,000', wc: 'HW' },
                  { name: 'Sean O\'Malley', pts: '41.6', salary: '$8,500', wc: 'BW' },
                  { name: 'Shavkat Rakhmonov', pts: '46.2', salary: '$8,000', wc: 'WW' },
                  { name: 'Dustin Poirier', pts: '36.8', salary: '$7,400', wc: 'LW' },
                  { name: 'Ciryl Gane', pts: '39.4', salary: '$7,900', wc: 'HW' },
                ].map((f) => (
                  <div key={f.name} className="flex items-center gap-3 rounded-lg bg-[#0f1520] border border-[#1e2a3a] px-3 py-2">
                    <div className="h-8 w-8 rounded-full bg-[#39FF14]/20 border border-[#39FF14]/30 flex items-center justify-center text-[10px] font-bold text-[#39FF14]">
                      {f.wc}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{f.name}</p>
                      <p className="text-[10px] text-gray-500">{f.salary}</p>
                    </div>
                    <span className="text-[#39FF14] text-xs font-bold">{f.pts} pts</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-[#0a0f1a] border border-[#1e2a3a] p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Salary Used</p>
                  <p className="font-bold text-[#39FF14]">$51,600 / $50,000</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Prize Pool</p>
                  <p className="font-bold text-white">$500,000</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-[#1e2a3a] bg-[#0a0f1a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '2.4M', label: 'Active Players', icon: <Users className="h-5 w-5" /> },
              { value: '$10M+', label: 'Total Prizes Paid', icon: <Trophy className="h-5 w-5" /> },
              { value: '847', label: 'Contests Live', icon: <Zap className="h-5 w-5" /> },
              { value: '99.9%', label: 'Platform Uptime', icon: <Shield className="h-5 w-5" /> },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} className="flex items-center gap-4">
                <div className="text-[#39FF14]">{stat.icon}</div>
                <div>
                  <p className="text-2xl font-black text-white" style={{ textShadow: '0 0 12px rgba(57,255,20,0.3)' }}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <p className="text-[#39FF14] text-sm font-semibold tracking-widest uppercase mb-3">Simple &amp; Fast</p>
              <h2 className="text-4xl sm:text-5xl font-black">How It Works</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  icon: <Users className="h-8 w-8" />,
                  title: 'Pick Your Fighters',
                  desc: 'Browse 500+ UFC fighters with real stats, projections, and salary values. Build a roster within your $50,000 salary cap.',
                },
                {
                  step: '02',
                  icon: <Target className="h-8 w-8" />,
                  title: 'Set Your Lineup',
                  desc: 'Select 6 fighters across weight classes. Use AI-powered projections and ownership data to gain an edge.',
                },
                {
                  step: '03',
                  icon: <Trophy className="h-8 w-8" />,
                  title: 'Win Real Prizes',
                  desc: 'Earn fantasy points based on real fight performance. Top lineups win cash prizes from pools up to $1,000,000.',
                },
              ].map((step) => (
                <motion.div
                  key={step.step}
                  variants={fadeInUp}
                  className="relative rounded-2xl border border-[#1e2a3a] bg-[#0a0f1a] p-8 hover:border-[#39FF14]/40 transition-all group"
                >
                  <div className="absolute top-6 right-6 text-5xl font-black text-[#39FF14]/10 group-hover:text-[#39FF14]/20 transition-colors">
                    {step.step}
                  </div>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#39FF14]/10 text-[#39FF14]">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED CONTESTS ── */}
      <section id="contests" className="py-24 px-4 sm:px-6 bg-[#0a0f1a]">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeInUp} className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[#39FF14] text-sm font-semibold tracking-widest uppercase mb-2">Live Now</p>
                <h2 className="text-4xl sm:text-5xl font-black">Featured Contests</h2>
              </div>
              <Link href="/contests" className="text-sm text-[#39FF14] hover:underline flex items-center gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'UFC 310 Mega Contest',
                  event: 'UFC 310: Makhachev vs. Moicano',
                  prize: '$500,000',
                  entry: '$25',
                  entriesNum: 18420,
                  maxNum: 20000,
                  type: 'GPP',
                  featured: true,
                },
                {
                  name: 'Saturday Showdown H2H',
                  event: 'UFC 310: Makhachev vs. Moicano',
                  prize: '$50',
                  entry: '$25',
                  entriesNum: 1,
                  maxNum: 2,
                  type: 'H2H',
                  featured: false,
                },
                {
                  name: 'Free Roll Sunday',
                  event: 'UFC Fight Night 248',
                  prize: '$1,000',
                  entry: 'FREE',
                  entriesNum: 4210,
                  maxNum: 5000,
                  type: 'FREE',
                  featured: false,
                },
              ].map((contest) => (
                <motion.div
                  key={contest.name}
                  variants={fadeInUp}
                  className={`relative rounded-2xl border bg-[#0f1520] p-6 flex flex-col gap-4 hover:scale-[1.01] transition-transform ${
                    contest.featured
                      ? 'border-[#39FF14]/50 shadow-[0_0_30px_rgba(57,255,20,0.1)]'
                      : 'border-[#1e2a3a]'
                  }`}
                >
                  {contest.featured && (
                    <div className="absolute top-4 right-4 text-xs font-bold bg-[#39FF14] text-[#080c12] px-2 py-0.5 rounded-full">
                      FEATURED
                    </div>
                  )}
                  <div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      contest.type === 'FREE' ? 'bg-blue-500/20 text-blue-400'
                      : contest.type === 'H2H' ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-[#39FF14]/20 text-[#39FF14]'
                    }`}>
                      {contest.type}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{contest.name}</h3>
                    <p className="text-sm text-gray-500">{contest.event}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-[#0a0f1a] p-3">
                      <p className="text-xs text-gray-500 mb-0.5">Prize Pool</p>
                      <p className="text-[#39FF14] font-bold text-lg">{contest.prize}</p>
                    </div>
                    <div className="rounded-lg bg-[#0a0f1a] p-3">
                      <p className="text-xs text-gray-500 mb-0.5">Entry Fee</p>
                      <p className="text-white font-bold text-lg">{contest.entry}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{contest.entriesNum.toLocaleString()} / {contest.maxNum.toLocaleString()} entries</span>
                      <span>{Math.round((contest.entriesNum / contest.maxNum) * 100)}% full</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#1e2a3a]">
                      <div
                        className="h-full rounded-full bg-[#39FF14]"
                        style={{
                          width: `${Math.round((contest.entriesNum / contest.maxNum) * 100)}%`,
                          boxShadow: '0 0 6px rgba(57,255,20,0.5)',
                        }}
                      />
                    </div>
                  </div>
                  <Link
                    href="/sign-up"
                    className="mt-auto text-center py-3 rounded-xl font-bold text-sm transition-all bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30 hover:bg-[#39FF14]/20"
                  >
                    Enter Contest
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SCORING ── */}
      <section id="scoring" className="py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <p className="text-[#39FF14] text-sm font-semibold tracking-widest uppercase mb-2">Transparent Scoring</p>
              <h2 className="text-4xl sm:text-5xl font-black">How Points Work</h2>
              <p className="text-gray-400 mt-4 max-w-lg mx-auto">Every punch, takedown, and submission earns your team fantasy points in real time.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="rounded-2xl border border-[#1e2a3a] bg-[#0a0f1a] overflow-hidden">
              <div className="grid grid-cols-2 text-xs font-semibold text-gray-500 uppercase tracking-widest border-b border-[#1e2a3a] px-6 py-3">
                <span>Action</span><span className="text-right">Points</span>
              </div>
              {[
                { action: 'Win by Decision', pts: '+30', highlight: false },
                { action: 'Win by KO / TKO', pts: '+100', highlight: true },
                { action: 'Win by Submission', pts: '+100', highlight: true },
                { action: 'Significant Strike Landed', pts: '+0.2', highlight: false },
                { action: 'Takedown Landed', pts: '+5', highlight: false },
                { action: 'Takedown Defended', pts: '+3', highlight: false },
                { action: 'Knockdown Scored', pts: '+15', highlight: false },
                { action: 'Submission Attempt', pts: '+5', highlight: false },
                { action: 'Title Fight Bonus', pts: '×1.5', highlight: true },
              ].map((row) => (
                <motion.div
                  key={row.action}
                  variants={fadeInUp}
                  className={`grid grid-cols-2 px-6 py-4 border-b border-[#1e2a3a] last:border-0 ${row.highlight ? 'bg-[#39FF14]/5' : ''}`}
                >
                  <span className="text-gray-300 text-sm">{row.action}</span>
                  <span
                    className={`text-right font-bold text-lg ${row.highlight ? 'text-[#39FF14]' : 'text-white'}`}
                    style={row.highlight ? { textShadow: '0 0 8px rgba(57,255,20,0.5)' } : {}}
                  >
                    {row.pts}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-24 px-4 sm:px-6 bg-[#0a0f1a]">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <p className="text-[#39FF14] text-sm font-semibold tracking-widest uppercase mb-2">Community Love</p>
              <h2 className="text-4xl font-black">What Players Say</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Mike Torres',
                  username: '@miketheoctagon',
                  avatar: 'MT',
                  quote: 'Won $2,400 on UFC 305 with a perfect main card. The AI projections were spot on. This platform changed how I watch fights.',
                },
                {
                  name: 'Sarah Kim',
                  username: '@sarahfightfan',
                  avatar: 'SK',
                  quote: 'The salary cap system makes lineup building addictive. I spend hours optimizing before every event. Best MMA app ever.',
                },
                {
                  name: 'Jake Williams',
                  username: '@jakewins',
                  avatar: 'JW',
                  quote: '26% win rate in my first month. The ownership data is a cheat code. Already cashed out $800 in my first 3 months.',
                },
              ].map((t) => (
                <motion.div key={t.name} variants={fadeInUp} className="rounded-2xl border border-[#1e2a3a] bg-[#0f1520] p-6">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map((i) => <Star key={i} className="h-4 w-4 text-[#39FF14] fill-[#39FF14]" />)}
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#39FF14]/20 border border-[#39FF14]/40 flex items-center justify-center text-[#39FF14] font-bold text-sm">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-gray-500 text-xs">{t.username}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── APP DOWNLOAD ── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl border border-[#39FF14]/30 bg-gradient-to-br from-[#39FF14]/10 to-[#00d4ff]/5 p-12"
              style={{ boxShadow: '0 0 60px rgba(57,255,20,0.08)' }}
            >
              <div className="text-5xl mb-4">📱</div>
              <h2 className="text-4xl font-black mb-4">Take It Anywhere</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Manage your lineups, track live scores, and collect winnings from your phone. Available on iOS and Android.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white text-[#080c12] font-semibold hover:bg-gray-100 transition-colors">
                  <span className="text-2xl">🍎</span>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-600">Download on the</p>
                    <p className="font-bold">App Store</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white text-[#080c12] font-semibold hover:bg-gray-100 transition-colors">
                  <span className="text-2xl">▶</span>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-600">Get it on</p>
                    <p className="font-bold">Google Play</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#1e2a3a] bg-[#0a0f1a] py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-xl font-black mb-4">
                <span className="text-[#39FF14]" style={{ textShadow: neonGlow }}>⬡</span>{' '}
                <span className="bg-gradient-to-r from-[#39FF14] to-[#00d4ff] bg-clip-text text-transparent">OctaFight</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                The ultimate MMA fantasy sports platform. Build lineups, compete, win.
              </p>
              <div className="flex gap-3">
                {[X, Mail, Globe].map((Icon, i) => (
                  <button key={i} className="h-9 w-9 rounded-lg bg-[#0f1520] border border-[#1e2a3a] flex items-center justify-center text-gray-400 hover:text-[#39FF14] hover:border-[#39FF14]/40 transition-colors">
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
            {[
              { title: 'Product', links: ['How It Works', 'Scoring', 'Contests', 'Leaderboard'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Responsible Gaming', 'Cookie Policy'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-white mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-[#1e2a3a] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <p>© 2026 OctaFight Fantasy, LLC. All rights reserved.</p>
            <p>Fantasy sports are legal in 48 states. Must be 18+ to play for real money.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
