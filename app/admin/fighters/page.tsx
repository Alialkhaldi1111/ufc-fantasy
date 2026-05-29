'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { fighters } from '@/data/fighters';
import { formatSalary, cn } from '@/lib/utils';

export default function AdminFightersPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const PER_PAGE = 15;

  const filtered = fighters.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    (f.nickname?.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen bg-[#080c12] pb-8">
      <div className="bg-[#0f1520] border-b border-[#1e2a3a] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-[#4a5568] hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-black text-white">Fighters Management</h1>
            <p className="text-[#4a5568] text-xs">{fighters.length} fighters in database</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#39FF14] text-[#080c12] font-bold rounded-lg text-sm hover:bg-[#2acc10] transition-all">
          <Plus size={16} /> Add Fighter
        </button>
      </div>

      <div className="px-6 pt-4">
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568]" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search fighters..."
            className="w-full max-w-md bg-[#0f1520] border border-[#1e2a3a] rounded-lg pl-9 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#39FF14]"
          />
        </div>

        <div className="bg-[#0f1520] border border-[#1e2a3a] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e2a3a]">
                  {['Fighter', 'Weight Class', 'Record', 'Salary', 'Proj Pts', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-[#4a5568] text-xs font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((fighter, i) => (
                  <motion.tr key={fighter.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b border-[#1e2a3a]/50 hover:bg-[#141d2e] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1e2a3a] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                          {fighter.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{fighter.name}</div>
                          {fighter.nickname && <div className="text-[#4a5568] text-xs">"{fighter.nickname}"</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[#4a5568] text-sm">{fighter.weightClass}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-white text-sm font-mono">{fighter.record}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[#39FF14] text-sm font-medium">{formatSalary(fighter.salary)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-yellow-400 text-sm">{fighter.projectedPoints}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("flex items-center gap-1 text-xs",
                        fighter.isActive ? 'text-[#39FF14]' : 'text-[#4a5568]')}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", fighter.isActive ? 'bg-[#39FF14]' : 'bg-[#4a5568]')} />
                        {fighter.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-[#4a5568] hover:text-[#39FF14] hover:bg-[#39FF14]/10 rounded-lg transition-colors">
                          <Edit size={14} />
                        </button>
                        <button className="p-1.5 text-[#4a5568] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#1e2a3a]">
            <span className="text-[#4a5568] text-xs">
              Showing {(page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
                className="p-1.5 text-[#4a5568] hover:text-white disabled:opacity-30 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <span className="text-white text-xs">{page} / {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}
                className="p-1.5 text-[#4a5568] hover:text-white disabled:opacity-30 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
