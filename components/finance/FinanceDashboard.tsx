'use client';

import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import {
  accounts,
  transactions,
  budgets,
  netWorthHistory,
  CATEGORIES,
  type Account,
  type Transaction,
  type BudgetCategory,
  formatCurrency,
  formatDate,
  getCurrentMonthStats,
} from './mockData';

type Section = 'overview' | 'accounts' | 'transactions' | 'budgets' | 'networth';

// ─── Top Nav ────────────────────────────────────────────────────────────────

function TopNav({ active, onChange }: { active: Section; onChange: (s: Section) => void }) {
  const tabs: { key: Section; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'accounts', label: 'Accounts' },
    { key: 'transactions', label: 'Transactions' },
    { key: 'budgets', label: 'Budgets' },
    { key: 'networth', label: 'Net Worth' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Brand + title row */}
        <div className="flex items-center gap-3 pt-4 pb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-slate-900 tracking-tight">FinanceFlow</span>
          <span className="hidden sm:block text-slate-300 text-sm ml-1">Personal Finance</span>
        </div>
        {/* Nav tabs */}
        <nav className="flex gap-1 overflow-x-auto pb-0 scrollbar-hide">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              className={`
                px-3 sm:px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                ${active === t.key
                  ? 'border-emerald-700 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}
              `}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

// ─── Shared UI atoms ─────────────────────────────────────────────────────────

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 ${className}`}>
      {children}
    </div>
  );
}

function StatBadge({ positive }: { positive: boolean }) {
  return (
    <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${positive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
      {positive ? '↑' : '↓'}
    </span>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  Groceries: 'bg-green-100 text-green-800',
  Dining: 'bg-orange-100 text-orange-800',
  Transport: 'bg-blue-100 text-blue-800',
  Entertainment: 'bg-purple-100 text-purple-800',
  Shopping: 'bg-pink-100 text-pink-800',
  Utilities: 'bg-amber-100 text-amber-800',
  Healthcare: 'bg-cyan-100 text-cyan-800',
  Travel: 'bg-indigo-100 text-indigo-800',
  Subscriptions: 'bg-violet-100 text-violet-800',
  Income: 'bg-emerald-100 text-emerald-800',
  Transfer: 'bg-slate-100 text-slate-700',
  Other: 'bg-gray-100 text-gray-700',
};

function CategoryTag({ category }: { category: string }) {
  const cls = CATEGORY_COLORS[category] ?? 'bg-gray-100 text-gray-700';
  return <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cls}`}>{category}</span>;
}

// ─── Overview ────────────────────────────────────────────────────────────────

const tooltipStyle = {
  backgroundColor: '#1e293b',
  border: 'none',
  borderRadius: '10px',
  color: '#f1f5f9',
  fontSize: '13px',
  padding: '8px 14px',
};

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={tooltipStyle}>
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-slate-300">
          {p.name}: <span className="text-white font-medium">{formatCurrency(p.value)}</span>
        </p>
      ))}
    </div>
  );
}

function OverviewPage() {
  const totalAssets = accounts.filter((a) => a.balance > 0).reduce((s, a) => s + a.balance, 0);
  const totalLiabilities = accounts.filter((a) => a.balance < 0).reduce((s, a) => s + Math.abs(a.balance), 0);
  const netWorth = totalAssets - totalLiabilities;
  const { income, spending } = getCurrentMonthStats(transactions);

  const prevNetWorth = netWorthHistory[netWorthHistory.length - 2].netWorth;
  const nwChange = netWorth - prevNetWorth;

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Net Worth */}
        <Card className="sm:col-span-1 p-6 bg-gradient-to-br from-emerald-700 to-emerald-900 border-0 text-white">
          <p className="text-emerald-200 text-sm font-medium mb-1">Total Net Worth</p>
          <p className="text-3xl font-bold tracking-tight">{formatCurrency(netWorth)}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs bg-white/20 rounded-full px-2 py-0.5 text-emerald-100">
              {nwChange >= 0 ? '+' : ''}{formatCurrency(nwChange)} this month
            </span>
          </div>
        </Card>

        {/* Spending */}
        <Card className="p-6">
          <p className="text-slate-500 text-sm font-medium mb-1">Spent This Month</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(spending)}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <StatBadge positive={false} />
            <span className="text-xs text-slate-500">vs. last month</span>
          </div>
        </Card>

        {/* Income */}
        <Card className="p-6">
          <p className="text-slate-500 text-sm font-medium mb-1">Income This Month</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(income)}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <StatBadge positive={true} />
            <span className="text-xs text-slate-500">on track</span>
          </div>
        </Card>
      </div>

      {/* Net worth chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Net Worth Trend</h2>
            <p className="text-xs text-slate-500 mt-0.5">Last 6 months</p>
          </div>
          <span className="text-sm font-semibold text-emerald-700">
            +{(((netWorth - netWorthHistory[0].netWorth) / netWorthHistory[0].netWorth) * 100).toFixed(1)}% YTD
          </span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={netWorthHistory} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="nwGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              width={48}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="netWorth"
              name="Net Worth"
              stroke="#059669"
              strokeWidth={2.5}
              fill="url(#nwGradient)"
              dot={{ r: 4, fill: '#059669', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#059669' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Quick account snapshot */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-slate-900">Account Snapshot</h2>
          <div className="flex gap-4 text-xs text-slate-500">
            <span>Assets <span className="text-emerald-700 font-semibold">{formatCurrency(totalAssets)}</span></span>
            <span>Liabilities <span className="text-red-500 font-semibold">-{formatCurrency(totalLiabilities)}</span></span>
          </div>
        </div>
        <div className="space-y-2">
          {accounts.slice(0, 4).map((acct) => (
            <div key={acct.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${acct.type === 'investment' ? 'bg-indigo-100 text-indigo-700' :
                    acct.type === 'credit' ? 'bg-red-100 text-red-600' :
                    acct.type === 'savings' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-blue-100 text-blue-700'}`}
                >
                  {acct.institution[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{acct.name}</p>
                  <p className="text-xs text-slate-400">{acct.accountNumber}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${acct.balance < 0 ? 'text-red-500' : 'text-slate-900'}`}>
                {acct.balance < 0 ? `-${formatCurrency(Math.abs(acct.balance))}` : formatCurrency(acct.balance)}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Accounts ────────────────────────────────────────────────────────────────

const ACCOUNT_TYPE_LABELS: Record<string, string> = {
  checking: 'Checking',
  savings: 'Savings',
  credit: 'Credit Cards',
  investment: 'Investments',
};

const ACCOUNT_ICONS: Record<string, { bg: string; text: string; symbol: string }> = {
  checking: { bg: 'bg-blue-100', text: 'text-blue-700', symbol: '🏦' },
  savings: { bg: 'bg-emerald-100', text: 'text-emerald-700', symbol: '💰' },
  credit: { bg: 'bg-red-100', text: 'text-red-600', symbol: '💳' },
  investment: { bg: 'bg-indigo-100', text: 'text-indigo-700', symbol: '📈' },
};

function AccountsPage() {
  const grouped = useMemo(() => {
    const g: Record<string, Account[]> = {};
    for (const acct of accounts) {
      if (!g[acct.type]) g[acct.type] = [];
      g[acct.type].push(acct);
    }
    return g;
  }, []);

  const totalAssets = accounts.filter((a) => a.balance > 0).reduce((s, a) => s + a.balance, 0);
  const totalLiabilities = Math.abs(accounts.filter((a) => a.balance < 0).reduce((s, a) => s + a.balance, 0));

  return (
    <div className="space-y-6">
      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <p className="text-xs text-slate-500 mb-1">Total Assets</p>
          <p className="text-lg font-bold text-emerald-700">{formatCurrency(totalAssets)}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-xs text-slate-500 mb-1">Total Liabilities</p>
          <p className="text-lg font-bold text-red-500">-{formatCurrency(totalLiabilities)}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-xs text-slate-500 mb-1">Net Worth</p>
          <p className="text-lg font-bold text-slate-900">{formatCurrency(totalAssets - totalLiabilities)}</p>
        </Card>
      </div>

      {/* Account groups */}
      {(['checking', 'savings', 'credit', 'investment'] as const).map((type) => {
        const group = grouped[type];
        if (!group?.length) return null;
        const icon = ACCOUNT_ICONS[type];
        const subtotal = group.reduce((s, a) => s + a.balance, 0);
        return (
          <Card key={type} className="overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-center gap-2">
                <span>{icon.symbol}</span>
                <span className="text-sm font-semibold text-slate-700">{ACCOUNT_TYPE_LABELS[type]}</span>
              </div>
              <span className={`text-sm font-bold ${subtotal < 0 ? 'text-red-500' : 'text-slate-900'}`}>
                {subtotal < 0 ? `-${formatCurrency(Math.abs(subtotal))}` : formatCurrency(subtotal)}
              </span>
            </div>
            <div className="divide-y divide-slate-50">
              {group.map((acct) => (
                <div key={acct.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${icon.bg} ${icon.text} flex items-center justify-center text-base font-bold`}>
                      {acct.institution[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{acct.name}</p>
                      <p className="text-xs text-slate-400">{acct.institution} · {acct.accountNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${acct.balance < 0 ? 'text-red-500' : 'text-slate-900'}`}>
                      {acct.balance < 0 ? `-${formatCurrency(Math.abs(acct.balance))}` : formatCurrency(acct.balance)}
                    </p>
                    <p className="text-xs text-slate-400">Updated {formatDate(acct.lastUpdated)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

// ─── Transactions ─────────────────────────────────────────────────────────────

function RecategorizeModal({
  transaction,
  onClose,
  onSave,
}: {
  transaction: Transaction;
  onClose: () => void;
  onSave: (id: string, category: string) => void;
}) {
  const [selected, setSelected] = useState(transaction.category);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Recategorize</h3>
            <p className="text-sm text-slate-500 mt-0.5">{transaction.merchant}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all
                ${selected === cat
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={() => { onSave(transaction.id, selected); onClose(); }}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-emerald-700 rounded-xl hover:bg-emerald-800 transition-colors"
          >
            Save Category
          </button>
        </div>
      </div>
    </div>
  );
}

function TransactionsPage() {
  const [txns, setTxns] = useState<Transaction[]>(transactions);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editing, setEditing] = useState<Transaction | null>(null);

  const filtered = useMemo(() => {
    return txns.filter((t) => {
      const matchSearch =
        !search ||
        t.merchant.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === 'All' || t.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [txns, search, categoryFilter]);

  function handleRecategorize(id: string, category: string) {
    setTxns((prev) => prev.map((t) => (t.id === id ? { ...t, category } : t)));
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-50 text-slate-900 placeholder:text-slate-400"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Card>

      {/* Transaction list */}
      <Card className="overflow-hidden">
        <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{filtered.length} transactions</span>
          {(search || categoryFilter !== 'All') && (
            <button onClick={() => { setSearch(''); setCategoryFilter('All'); }} className="text-xs text-emerald-600 hover:underline">
              Clear filters
            </button>
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 uppercase tracking-wide border-b border-slate-100">
                <th className="text-left px-6 py-3 font-medium">Date</th>
                <th className="text-left px-6 py-3 font-medium">Merchant</th>
                <th className="text-left px-6 py-3 font-medium">Category</th>
                <th className="text-right px-6 py-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => setEditing(t)}
                  className="hover:bg-emerald-50/40 cursor-pointer transition-colors group"
                >
                  <td className="px-6 py-3.5 text-slate-500 whitespace-nowrap">{formatDate(t.date)}</td>
                  <td className="px-6 py-3.5 font-medium text-slate-900">{t.merchant}</td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2">
                      <CategoryTag category={t.category} />
                      <span className="text-slate-300 group-hover:text-slate-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">edit</span>
                    </div>
                  </td>
                  <td className={`px-6 py-3.5 text-right font-semibold tabular-nums ${t.amount < 0 ? 'text-slate-900' : 'text-emerald-600'}`}>
                    {t.amount < 0 ? `-${formatCurrency(Math.abs(t.amount))}` : `+${formatCurrency(t.amount)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className="sm:hidden divide-y divide-slate-100">
          {filtered.map((t) => (
            <div key={t.id} onClick={() => setEditing(t)} className="px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
              <div className="flex-1 min-w-0 pr-3">
                <p className="text-sm font-medium text-slate-900 truncate">{t.merchant}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-400">{formatDate(t.date)}</span>
                  <CategoryTag category={t.category} />
                </div>
              </div>
              <span className={`text-sm font-bold tabular-nums ${t.amount < 0 ? 'text-slate-900' : 'text-emerald-600'}`}>
                {t.amount < 0 ? `-${formatCurrency(Math.abs(t.amount))}` : `+${formatCurrency(t.amount)}`}
              </span>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-slate-400">
            <p className="text-sm">No transactions match your search.</p>
          </div>
        )}
      </Card>

      {editing && (
        <RecategorizeModal
          transaction={editing}
          onClose={() => setEditing(null)}
          onSave={handleRecategorize}
        />
      )}
    </div>
  );
}

// ─── Budgets ──────────────────────────────────────────────────────────────────

function BudgetBar({ budget }: { budget: BudgetCategory }) {
  const pct = Math.min((budget.spent / budget.budgeted) * 100, 100);
  const overBudget = budget.spent > budget.budgeted;
  const remaining = budget.budgeted - budget.spent;

  return (
    <div className="p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{budget.icon}</span>
          <span className="text-sm font-medium text-slate-800">{budget.name}</span>
          {overBudget && (
            <span className="text-xs font-medium bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">Over</span>
          )}
        </div>
        <div className="text-right">
          <span className={`text-sm font-bold ${overBudget ? 'text-red-500' : 'text-slate-900'}`}>
            {formatCurrency(budget.spent)}
          </span>
          <span className="text-xs text-slate-400"> / {formatCurrency(budget.budgeted)}</span>
        </div>
      </div>
      {/* Progress bar */}
      <div className="relative h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            backgroundColor: overBudget ? '#ef4444' : budget.color,
          }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-xs text-slate-400">{pct.toFixed(0)}% used</span>
        <span className={`text-xs font-medium ${overBudget ? 'text-red-500' : 'text-slate-500'}`}>
          {overBudget ? `${formatCurrency(Math.abs(remaining))} over` : `${formatCurrency(remaining)} left`}
        </span>
      </div>
    </div>
  );
}

function BudgetsPage() {
  const totalBudgeted = budgets.reduce((s, b) => s + b.budgeted, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const overallPct = (totalSpent / totalBudgeted) * 100;

  const chartData = budgets.map((b) => ({
    name: b.name,
    spent: b.spent,
    budgeted: b.budgeted,
  }));

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <p className="text-xs text-slate-500 mb-1">Total Budgeted</p>
          <p className="text-lg font-bold text-slate-900">{formatCurrency(totalBudgeted)}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-xs text-slate-500 mb-1">Total Spent</p>
          <p className="text-lg font-bold text-slate-900">{formatCurrency(totalSpent)}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-xs text-slate-500 mb-1">Remaining</p>
          <p className="text-lg font-bold text-emerald-700">{formatCurrency(totalBudgeted - totalSpent)}</p>
        </Card>
      </div>

      {/* Overall progress */}
      <Card className="p-5">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-semibold text-slate-800">Overall Budget Usage</p>
          <span className="text-sm font-bold text-slate-900">{overallPct.toFixed(0)}%</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-700"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-1.5">
          {formatCurrency(totalBudgeted - totalSpent)} remaining across all categories
        </p>
      </Card>

      {/* Category budgets */}
      <Card className="divide-y divide-slate-100">
        {budgets.map((b) => (
          <BudgetBar key={b.id} budget={b} />
        ))}
      </Card>

      {/* Mini bar chart */}
      <Card className="p-6">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Spent vs. Budget by Category</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} width={44} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="budgeted" name="Budgeted" stroke="#cbd5e1" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="4 3" />
            <Line type="monotone" dataKey="spent" name="Spent" stroke="#059669" strokeWidth={2.5} dot={{ r: 4, fill: '#059669' }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

// ─── Net Worth ────────────────────────────────────────────────────────────────

function NetWorthPage() {
  const totalAssets = accounts.filter((a) => a.balance > 0).reduce((s, a) => s + a.balance, 0);
  const totalLiabilities = Math.abs(accounts.filter((a) => a.balance < 0).reduce((s, a) => s + a.balance, 0));
  const netWorth = totalAssets - totalLiabilities;

  const startNW = netWorthHistory[0].netWorth;
  const growth = ((netWorth - startNW) / startNW) * 100;

  return (
    <div className="space-y-6">
      {/* Hero card */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-slate-800 to-slate-900 border-0 text-white">
        <p className="text-slate-400 text-sm mb-1">Total Net Worth</p>
        <p className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">{formatCurrency(netWorth)}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-400">Assets</span>
            <span className="font-semibold text-white">{formatCurrency(totalAssets)}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-slate-400">Liabilities</span>
            <span className="font-semibold text-white">-{formatCurrency(totalLiabilities)}</span>
          </span>
          <span className="text-emerald-400 font-semibold">+{growth.toFixed(1)}% YTD</span>
        </div>
      </Card>

      {/* History chart */}
      <Card className="p-6">
        <h2 className="text-base font-semibold text-slate-900 mb-5">Net Worth History</h2>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={netWorthHistory} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="assetsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="nwGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="assets" name="Assets" stroke="#6366f1" strokeWidth={2} fill="url(#assetsGrad)" dot={false} />
            <Area type="monotone" dataKey="netWorth" name="Net Worth" stroke="#059669" strokeWidth={2.5} fill="url(#nwGrad2)" dot={{ r: 4, fill: '#059669', strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-3 justify-center">
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-3 h-0.5 bg-indigo-500 rounded inline-block" />
            Assets
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-3 h-0.5 bg-emerald-600 rounded inline-block" />
            Net Worth
          </span>
        </div>
      </Card>

      {/* Asset breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <span className="text-emerald-600">↑</span> Assets
          </h3>
          <div className="space-y-3">
            {accounts.filter((a) => a.balance > 0).map((acct) => {
              const pct = (acct.balance / totalAssets) * 100;
              return (
                <div key={acct.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 truncate pr-2">{acct.name}</span>
                    <span className="font-semibold text-slate-900 whitespace-nowrap">{formatCurrency(acct.balance)}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <span className="text-red-500">↓</span> Liabilities
          </h3>
          <div className="space-y-3">
            {accounts.filter((a) => a.balance < 0).map((acct) => {
              const pct = (Math.abs(acct.balance) / totalLiabilities) * 100;
              return (
                <div key={acct.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 truncate pr-2">{acct.name}</span>
                    <span className="font-semibold text-red-500">-{formatCurrency(Math.abs(acct.balance))}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Dashboard shell ──────────────────────────────────────────────────────────

export default function FinanceDashboard() {
  const [section, setSection] = useState<Section>('overview');

  return (
    <div className="min-h-screen bg-[#f7f8fc]" style={{ colorScheme: 'light' }}>
      <TopNav active={section} onChange={setSection} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-12">
        {section === 'overview' && <OverviewPage />}
        {section === 'accounts' && <AccountsPage />}
        {section === 'transactions' && <TransactionsPage />}
        {section === 'budgets' && <BudgetsPage />}
        {section === 'networth' && <NetWorthPage />}
      </main>
    </div>
  );
}
