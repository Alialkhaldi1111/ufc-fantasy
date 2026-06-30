export type AccountType = 'checking' | 'savings' | 'credit' | 'investment';

export interface Account {
  id: string;
  name: string;
  institution: string;
  type: AccountType;
  balance: number;
  lastUpdated: string;
  accountNumber: string;
}

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: string;
  accountId: string;
  pending: boolean;
  notes: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  budgeted: number;
  spent: number;
  color: string;
}

export interface NetWorthPoint {
  month: string;
  assets: number;
  liabilities: number;
  netWorth: number;
}

export const CATEGORIES = [
  'Groceries',
  'Dining',
  'Transport',
  'Entertainment',
  'Shopping',
  'Utilities',
  'Healthcare',
  'Travel',
  'Subscriptions',
  'Income',
  'Transfer',
  'Other',
];

export const accounts: Account[] = [
  {
    id: 'chk-001',
    name: 'Chase Total Checking',
    institution: 'Chase',
    type: 'checking',
    balance: 5234.12,
    lastUpdated: '2026-06-30',
    accountNumber: '••••4821',
  },
  {
    id: 'sav-001',
    name: 'Chase Savings',
    institution: 'Chase',
    type: 'savings',
    balance: 18750.44,
    lastUpdated: '2026-06-30',
    accountNumber: '••••9302',
  },
  {
    id: 'sav-002',
    name: 'Marcus High-Yield Savings',
    institution: 'Goldman Sachs',
    type: 'savings',
    balance: 42000.00,
    lastUpdated: '2026-06-30',
    accountNumber: '••••7715',
  },
  {
    id: 'cc-001',
    name: 'Amex Gold Card',
    institution: 'American Express',
    type: 'credit',
    balance: -1847.33,
    lastUpdated: '2026-06-30',
    accountNumber: '••••5590',
  },
  {
    id: 'cc-002',
    name: 'Chase Sapphire Reserve',
    institution: 'Chase',
    type: 'credit',
    balance: -2412.67,
    lastUpdated: '2026-06-30',
    accountNumber: '••••3344',
  },
  {
    id: 'inv-001',
    name: 'Vanguard 401(k)',
    institution: 'Vanguard',
    type: 'investment',
    balance: 124500.00,
    lastUpdated: '2026-06-30',
    accountNumber: '••••8821',
  },
  {
    id: 'inv-002',
    name: 'Fidelity Roth IRA',
    institution: 'Fidelity',
    type: 'investment',
    balance: 38200.00,
    lastUpdated: '2026-06-30',
    accountNumber: '••••6612',
  },
];

export const transactions: Transaction[] = [
  { id: 't01', date: '2026-06-30', merchant: 'Whole Foods Market', amount: -87.42, category: 'Groceries', accountId: 'cc-001', pending: false, notes: '' },
  { id: 't02', date: '2026-06-29', merchant: 'Spotify', amount: -11.99, category: 'Subscriptions', accountId: 'cc-002', pending: false, notes: '' },
  { id: 't03', date: '2026-06-29', merchant: 'Sweetgreen', amount: -18.75, category: 'Dining', accountId: 'cc-001', pending: false, notes: '' },
  { id: 't04', date: '2026-06-28', merchant: 'Uber', amount: -24.30, category: 'Transport', accountId: 'cc-002', pending: false, notes: '' },
  { id: 't05', date: '2026-06-28', merchant: 'Amazon', amount: -134.99, category: 'Shopping', accountId: 'cc-001', pending: false, notes: '' },
  { id: 't06', date: '2026-06-27', merchant: 'Payroll Deposit', amount: 4200.00, category: 'Income', accountId: 'chk-001', pending: false, notes: '' },
  { id: 't07', date: '2026-06-27', merchant: 'CVS Pharmacy', amount: -23.17, category: 'Healthcare', accountId: 'cc-002', pending: false, notes: '' },
  { id: 't08', date: '2026-06-26', merchant: 'Chipotle', amount: -16.45, category: 'Dining', accountId: 'cc-001', pending: false, notes: '' },
  { id: 't09', date: '2026-06-26', merchant: 'Con Edison', amount: -142.80, category: 'Utilities', accountId: 'chk-001', pending: false, notes: '' },
  { id: 't10', date: '2026-06-25', merchant: 'Netflix', amount: -22.99, category: 'Subscriptions', accountId: 'cc-002', pending: false, notes: '' },
  { id: 't11', date: '2026-06-25', merchant: 'Trader Joe\'s', amount: -64.33, category: 'Groceries', accountId: 'cc-001', pending: false, notes: '' },
  { id: 't12', date: '2026-06-24', merchant: 'AMC Theatres', amount: -34.00, category: 'Entertainment', accountId: 'cc-002', pending: false, notes: '' },
  { id: 't13', date: '2026-06-24', merchant: 'Shell Gas Station', amount: -52.40, category: 'Transport', accountId: 'cc-002', pending: false, notes: '' },
  { id: 't14', date: '2026-06-23', merchant: 'Target', amount: -89.67, category: 'Shopping', accountId: 'cc-001', pending: false, notes: '' },
  { id: 't15', date: '2026-06-23', merchant: 'Starbucks', amount: -7.45, category: 'Dining', accountId: 'cc-002', pending: false, notes: '' },
  { id: 't16', date: '2026-06-22', merchant: 'Apple iCloud', amount: -2.99, category: 'Subscriptions', accountId: 'cc-001', pending: false, notes: '' },
  { id: 't17', date: '2026-06-22', merchant: 'Lyft', amount: -18.90, category: 'Transport', accountId: 'cc-002', pending: false, notes: '' },
  { id: 't18', date: '2026-06-21', merchant: 'Freelance Payment', amount: 1500.00, category: 'Income', accountId: 'chk-001', pending: false, notes: '' },
  { id: 't19', date: '2026-06-21', merchant: 'Peloton', amount: -44.00, category: 'Subscriptions', accountId: 'cc-001', pending: false, notes: '' },
  { id: 't20', date: '2026-06-20', merchant: 'The Cheesecake Factory', amount: -78.22, category: 'Dining', accountId: 'cc-002', pending: false, notes: '' },
  { id: 't21', date: '2026-06-20', merchant: 'H&M', amount: -112.50, category: 'Shopping', accountId: 'cc-001', pending: false, notes: '' },
  { id: 't22', date: '2026-06-19', merchant: 'Duane Reade', amount: -31.88, category: 'Healthcare', accountId: 'cc-002', pending: false, notes: '' },
  { id: 't23', date: '2026-06-19', merchant: 'MetroCard Auto-Refill', amount: -33.00, category: 'Transport', accountId: 'chk-001', pending: false, notes: '' },
  { id: 't24', date: '2026-06-18', merchant: 'Costco', amount: -203.17, category: 'Groceries', accountId: 'cc-001', pending: false, notes: '' },
  { id: 't25', date: '2026-06-18', merchant: 'Savings Transfer', amount: -2000.00, category: 'Transfer', accountId: 'chk-001', pending: false, notes: '' },
  { id: 't26', date: '2026-06-17', merchant: 'Hulu', amount: -17.99, category: 'Subscriptions', accountId: 'cc-002', pending: false, notes: '' },
  { id: 't27', date: '2026-06-17', merchant: 'Sweetgreen', amount: -22.50, category: 'Dining', accountId: 'cc-001', pending: false, notes: '' },
  { id: 't28', date: '2026-06-16', merchant: 'Verizon Wireless', amount: -85.00, category: 'Utilities', accountId: 'chk-001', pending: false, notes: '' },
  { id: 't29', date: '2026-06-15', merchant: 'Airbnb', amount: -420.00, category: 'Travel', accountId: 'cc-002', pending: false, notes: '' },
  { id: 't30', date: '2026-06-14', merchant: 'Payroll Deposit', amount: 4200.00, category: 'Income', accountId: 'chk-001', pending: false, notes: '' },
];

export const budgets: BudgetCategory[] = [
  { id: 'b01', name: 'Groceries', icon: '🛒', budgeted: 600, spent: 354.92, color: '#16a34a' },
  { id: 'b02', name: 'Dining', icon: '🍽️', budgeted: 300, spent: 243.37, color: '#ea580c' },
  { id: 'b03', name: 'Transport', icon: '🚗', budgeted: 200, spent: 128.60, color: '#2563eb' },
  { id: 'b04', name: 'Entertainment', icon: '🎬', budgeted: 150, spent: 34.00, color: '#7c3aed' },
  { id: 'b05', name: 'Shopping', icon: '🛍️', budgeted: 400, spent: 337.16, color: '#db2777' },
  { id: 'b06', name: 'Utilities', icon: '⚡', budgeted: 250, spent: 227.80, color: '#d97706' },
  { id: 'b07', name: 'Healthcare', icon: '💊', budgeted: 100, spent: 55.05, color: '#0891b2' },
  { id: 'b08', name: 'Subscriptions', icon: '📱', budgeted: 120, spent: 99.96, color: '#4f46e5' },
];

export const netWorthHistory: NetWorthPoint[] = [
  { month: 'Jan', assets: 216000, liabilities: 5800, netWorth: 210200 },
  { month: 'Feb', assets: 218500, liabilities: 4900, netWorth: 213600 },
  { month: 'Mar', assets: 221000, liabilities: 5200, netWorth: 215800 },
  { month: 'Apr', assets: 219500, liabilities: 4700, netWorth: 214800 },
  { month: 'May', assets: 224000, liabilities: 4400, netWorth: 219600 },
  { month: 'Jun', assets: 228684, liabilities: 4260, netWorth: 224424 },
];

export function formatCurrency(amount: number): string {
  const abs = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(abs);
  return amount < 0 ? `-${formatted}` : formatted;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getCurrentMonthStats(txns: Transaction[]) {
  const now = new Date('2026-06-30');
  const year = now.getFullYear();
  const month = now.getMonth();

  const monthTxns = txns.filter((t) => {
    const d = new Date(t.date + 'T00:00:00');
    return d.getFullYear() === year && d.getMonth() === month;
  });

  const income = monthTxns.filter((t) => t.amount > 0 && t.category !== 'Transfer').reduce((s, t) => s + t.amount, 0);
  const spending = monthTxns.filter((t) => t.amount < 0 && t.category !== 'Transfer').reduce((s, t) => s + Math.abs(t.amount), 0);

  return { income, spending };
}
