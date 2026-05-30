'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Trophy, Users, Zap, Send, Star } from 'lucide-react';
import { useSocialStore, ActivityItem } from '@/store/useSocialStore';
import { formatDistanceToNow } from 'date-fns';

const TYPE_CONFIG = {
  contest_entry:    { icon: Trophy,         color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  lineup_submitted: { icon: Users,          color: 'text-blue-400',   bg: 'bg-blue-500/10'   },
  fight_result:     { icon: Star,           color: 'text-[#39FF14]',  bg: 'bg-[#39FF14]/10'  },
  shoutout:         { icon: MessageCircle,  color: 'text-purple-400', bg: 'bg-purple-500/10' },
  fighter_scored:   { icon: Zap,            color: 'text-orange-400', bg: 'bg-orange-500/10' },
};

function ActivityRow({ item }: { item: ActivityItem }) {
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.shoutout;
  const Icon = cfg.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      className="flex gap-3 p-3 border-b border-[#1e2a3a]/50 hover:bg-white/[0.02] transition-colors"
    >
      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${cfg.bg}`}>
        <Icon className={`w-4 h-4 ${cfg.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-300 leading-snug">{item.message}</p>
        <p className="text-xs text-gray-600 mt-0.5">
          {formatDistanceToNow(item.timestamp, { addSuffix: true })}
        </p>
      </div>
    </motion.div>
  );
}

export function ActivityFeed({ compact = false }: { compact?: boolean }) {
  const { feed, postShoutout } = useSocialStore();
  const [text, setText] = useState('');

  const handlePost = () => {
    const msg = text.trim();
    if (!msg || msg.length > 140) return;
    postShoutout('OctaFan', msg);
    setText('');
  };

  return (
    <div className="bg-[#0f1520] border border-[#1e2a3a] rounded-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e2a3a]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
          <h3 className="text-sm font-semibold text-white">Live Feed</h3>
        </div>
        <span className="text-xs text-gray-600">{feed.length} items</span>
      </div>

      {/* Shoutout input */}
      <div className="p-3 border-b border-[#1e2a3a]">
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 140))}
            onKeyDown={(e) => { if (e.key === 'Enter') handlePost(); }}
            placeholder="Post a shoutout… (140 chars)"
            className="flex-1 bg-[#080c12] border border-[#1e2a3a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 transition-colors"
          />
          <button
            onClick={handlePost}
            disabled={!text.trim()}
            className="w-9 h-9 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/30 flex items-center justify-center text-[#39FF14] hover:bg-[#39FF14]/20 disabled:opacity-40 transition-all flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        {text.length > 100 && (
          <p className={`text-xs mt-1 text-right ${text.length > 130 ? 'text-red-400' : 'text-gray-600'}`}>
            {140 - text.length} left
          </p>
        )}
      </div>

      {/* Feed list */}
      <div className={`overflow-y-auto ${compact ? 'max-h-56' : 'max-h-[420px]'}`}>
        <AnimatePresence initial={false}>
          {feed.map((item) => (
            <ActivityRow key={item.id} item={item} />
          ))}
        </AnimatePresence>
        {feed.length === 0 && (
          <p className="p-6 text-center text-gray-600 text-sm">No activity yet — be the first!</p>
        )}
      </div>
    </div>
  );
}
