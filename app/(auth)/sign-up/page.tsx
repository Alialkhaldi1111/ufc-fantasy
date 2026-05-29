'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

const neonGlow = '0 0 20px rgba(57,255,20,0.5), 0 0 40px rgba(57,255,20,0.2)';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ email: '', username: '', displayName: '', password: '' });

  return (
    <div className="min-h-screen bg-[#080c12] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 17.3v17.4L30 52 0 34.7V17.3z' fill='none' stroke='%2339FF14' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 52px',
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#39FF14]/3 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-black">
              <span className="text-[#39FF14]" style={{ textShadow: neonGlow }}>⬡</span>{' '}
              <span className="bg-gradient-to-r from-[#39FF14] to-[#00d4ff] bg-clip-text text-transparent">
                OctaFight
              </span>
            </span>
          </Link>
          <p className="text-gray-400 mt-2 text-sm">Join 2.4M fighters competing for real prizes</p>
        </div>

        <div className="rounded-2xl border border-[#1e2a3a] bg-[#0a0f1a] p-8 space-y-6 shadow-xl shadow-black/40">
          <div>
            <h1 className="text-2xl font-black text-white">Create your account</h1>
            <p className="text-gray-500 text-sm mt-1">Free to join. No credit card required.</p>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-3 gap-2">
            {['Free Contests', 'Real Prizes', 'Live Scores'].map((p) => (
              <div key={p} className="rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/20 px-2 py-2 text-center">
                <CheckCircle className="h-3.5 w-3.5 text-[#39FF14] mx-auto mb-1" />
                <span className="text-[10px] font-semibold text-[#39FF14]">{p}</span>
              </div>
            ))}
          </div>

          {/* Google Button */}
          <button
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-[#39FF14]/40 bg-[#39FF14]/10 text-[#39FF14] font-semibold text-sm hover:bg-[#39FF14]/20 transition-all"
            style={{ boxShadow: '0 0 15px rgba(57,255,20,0.1)' }}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#1e2a3a]" />
            <span className="text-xs text-gray-600">or sign up with email</span>
            <div className="flex-1 h-px bg-[#1e2a3a]" />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Display Name</label>
                <input
                  value={form.displayName}
                  onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                  placeholder="Alex Champion"
                  className="w-full rounded-xl border border-[#1e2a3a] bg-[#0f1520] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#39FF14]/60 focus:ring-1 focus:ring-[#39FF14]/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Username</label>
                <input
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="alexchamp"
                  className="w-full rounded-xl border border-[#1e2a3a] bg-[#0f1520] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#39FF14]/60 focus:ring-1 focus:ring-[#39FF14]/30 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#1e2a3a] bg-[#0f1520] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#39FF14]/60 focus:ring-1 focus:ring-[#39FF14]/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 8 characters"
                  className="w-full rounded-xl border border-[#1e2a3a] bg-[#0f1520] px-4 py-3 pr-10 text-sm text-white placeholder-gray-600 outline-none focus:border-[#39FF14]/60 focus:ring-1 focus:ring-[#39FF14]/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <div
              onClick={() => setAgreed((v) => !v)}
              className={`mt-0.5 flex-shrink-0 h-5 w-5 rounded border transition-all ${
                agreed ? 'border-[#39FF14] bg-[#39FF14]/20' : 'border-[#1e2a3a] bg-[#0f1520]'
              } flex items-center justify-center`}
            >
              {agreed && <CheckCircle className="h-3 w-3 text-[#39FF14]" />}
            </div>
            <span className="text-xs text-gray-500 leading-relaxed">
              I agree to OctaFight&apos;s{' '}
              <a href="#" className="text-[#39FF14] hover:underline">Terms of Service</a>,{' '}
              <a href="#" className="text-[#39FF14] hover:underline">Privacy Policy</a>, and confirm I am 18 years or older.
            </span>
          </label>

          <button
            disabled={!agreed}
            className="w-full py-3 rounded-xl font-bold text-[#080c12] bg-[#39FF14] hover:bg-[#39FF14]/90 transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ boxShadow: agreed ? '0 0 20px rgba(57,255,20,0.4)' : 'none' }}
          >
            Create Free Account
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-[#39FF14] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
