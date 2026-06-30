import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FinanceFlow — Personal Finance Dashboard',
  description: 'Track your net worth, accounts, transactions, and budgets.',
};

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ colorScheme: 'light', backgroundColor: '#f7f8fc', color: '#1a202c' }}>
      {children}
    </div>
  );
}
