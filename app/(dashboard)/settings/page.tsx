'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, CreditCard, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

const TABS = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)}
      className={cn("relative w-11 h-6 rounded-full transition-colors flex-shrink-0",
        checked ? 'bg-[#39FF14]' : 'bg-[#1e2a3a]')}>
      <span className={cn("absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform",
        checked ? 'translate-x-5' : 'translate-x-0')} />
    </button>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState('account');
  const [form, setForm] = useState({ displayName: 'Alex Champion', username: 'alexchampion', bio: 'MMA enthusiast & fantasy sports addict.' });
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({
    contestStarts: true, fightResults: true, scoreUpdates: true,
    friendActivity: false, promos: false, pushNotifications: true,
  });
  const [privacy, setPrivacy] = useState({
    publicProfile: true, showLineups: false, showEarnings: false,
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen bg-[#080c12] pb-24 lg:pb-8">
      <div className="px-4 pt-6 pb-4 lg:px-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
      </div>

      <div className="px-4 lg:px-8 flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-48 flex-shrink-0">
          <div className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl overflow-hidden">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={cn("w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left",
                  tab === t.id ? 'bg-[#39FF14]/10 text-[#39FF14] border-l-2 border-[#39FF14]' : 'text-[#4a5568] hover:text-white hover:bg-[#141d2e]')}>
                <t.icon size={16} /> {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-xl">
          {tab === 'account' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl p-6 space-y-4">
              <h2 className="text-white font-bold text-lg">Account Settings</h2>
              {[
                { label: 'Display Name', key: 'displayName' },
                { label: 'Username', key: 'username' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-[#4a5568] text-sm mb-1">{field.label}</label>
                  <input value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    className="w-full bg-[#080c12] border border-[#1e2a3a] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#39FF14] transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-[#4a5568] text-sm mb-1">Bio</label>
                <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3}
                  className="w-full bg-[#080c12] border border-[#1e2a3a] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#39FF14] transition-colors resize-none" />
              </div>
              <div>
                <label className="block text-[#4a5568] text-sm mb-1">Email</label>
                <input value="alex@example.com" disabled className="w-full bg-[#080c12] border border-[#1e2a3a] rounded-lg px-4 py-2.5 text-[#4a5568] text-sm cursor-not-allowed" />
                <p className="text-xs text-[#4a5568] mt-1">Email is managed by your auth provider.</p>
              </div>
              <button onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#39FF14] text-[#080c12] font-bold rounded-lg hover:bg-[#2acc10] transition-all text-sm">
                <Save size={16} /> {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </motion.div>
          )}

          {tab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl p-6 space-y-4">
              <h2 className="text-white font-bold text-lg">Notification Preferences</h2>
              {[
                { key: 'contestStarts', label: 'Contest Starts', desc: 'When your entered contests go live' },
                { key: 'fightResults', label: 'Fight Results', desc: 'Instant fight outcome updates' },
                { key: 'scoreUpdates', label: 'Score Updates', desc: 'Live fantasy score changes' },
                { key: 'friendActivity', label: 'Friend Activity', desc: 'When friends enter contests' },
                { key: 'promos', label: 'Promotions', desc: 'New contests and special offers' },
                { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between py-2 border-b border-[#1e2a3a] last:border-0">
                  <div>
                    <div className="text-white text-sm font-medium">{item.label}</div>
                    <div className="text-[#4a5568] text-xs">{item.desc}</div>
                  </div>
                  <Toggle checked={notifs[item.key as keyof typeof notifs]} onChange={v => setNotifs(n => ({ ...n, [item.key]: v }))} />
                </div>
              ))}
            </motion.div>
          )}

          {tab === 'privacy' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl p-6 space-y-4">
              <h2 className="text-white font-bold text-lg">Privacy Settings</h2>
              {[
                { key: 'publicProfile', label: 'Public Profile', desc: 'Other users can view your profile' },
                { key: 'showLineups', label: 'Show Lineups', desc: 'Display your lineups publicly' },
                { key: 'showEarnings', label: 'Show Earnings', desc: 'Display total winnings on profile' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between py-2 border-b border-[#1e2a3a] last:border-0">
                  <div>
                    <div className="text-white text-sm font-medium">{item.label}</div>
                    <div className="text-[#4a5568] text-xs">{item.desc}</div>
                  </div>
                  <Toggle checked={privacy[item.key as keyof typeof privacy]} onChange={v => setPrivacy(p => ({ ...p, [item.key]: v }))} />
                </div>
              ))}
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <h3 className="text-red-400 font-bold text-sm mb-2">Danger Zone</h3>
                <p className="text-[#4a5568] text-xs mb-3">Permanently delete your account and all data. This cannot be undone.</p>
                <button className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors">
                  Delete Account
                </button>
              </div>
            </motion.div>
          )}

          {tab === 'billing' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl p-6">
                <h2 className="text-white font-bold text-lg mb-4">Current Plan</h2>
                <div className="flex items-center justify-between p-4 bg-[#080c12] rounded-xl border border-[#1e2a3a]">
                  <div>
                    <div className="text-white font-bold">Free Plan</div>
                    <div className="text-[#4a5568] text-sm">Basic features included</div>
                  </div>
                  <span className="px-3 py-1 bg-[#1e2a3a] text-[#4a5568] rounded-full text-sm">Free</span>
                </div>
                <a href="/subscribe">
                  <button className="w-full mt-4 py-3 bg-[#39FF14] text-[#080c12] font-bold rounded-xl hover:bg-[#2acc10] transition-all">
                    Upgrade to Pro — $9.99/mo
                  </button>
                </a>
              </div>
              <div className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl p-6">
                <h3 className="text-white font-bold mb-3">Payment History</h3>
                <div className="text-center py-8 text-[#4a5568] text-sm">
                  No payment history yet. Upgrade to Pro to get started.
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
