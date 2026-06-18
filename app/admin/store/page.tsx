'use client';

import { useEffect, useState } from 'react';
import { DollarSign, Package, TrendingUp, Users } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  email: string;
  total: number;
  status: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-500/20 text-yellow-400',
  PAID: 'bg-green-500/20 text-green-400',
  PROCESSING: 'bg-blue-500/20 text-blue-400',
  SHIPPED: 'bg-purple-500/20 text-purple-400',
  DELIVERED: 'bg-[#39FF14]/20 text-[#39FF14]',
  CANCELLED: 'bg-red-500/20 text-red-400',
};

export default function AdminStorePage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/store/orders').then((r) => r.json()).then((d) => setOrders(d.orders || []));
  }, []);

  const revenue = orders.filter((o) => o.status !== 'CANCELLED').reduce((s, o) => s + o.total, 0);
  const avgOrder = orders.length ? revenue / orders.length : 0;

  const stats = [
    { label: 'Total Revenue', value: `$${(revenue / 100).toFixed(2)}`, icon: DollarSign, color: 'text-[#39FF14]' },
    { label: 'Total Orders', value: orders.length, icon: Package, color: 'text-blue-400' },
    { label: 'Avg Order Value', value: `$${(avgOrder / 100).toFixed(2)}`, icon: TrendingUp, color: 'text-purple-400' },
    { label: 'Waitlist', value: '3,847', icon: Users, color: 'text-yellow-400' },
  ];

  return (
    <div className="min-h-screen bg-[#080c12] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black">APEX Store — Admin</h1>
          <p className="text-gray-400 mt-1">Orders, revenue, and discount code performance</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
              <Icon className={`w-6 h-6 ${color}`} />
              <div className="text-2xl font-black text-white">{value}</div>
              <div className="text-sm text-gray-400">{label}</div>
            </div>
          ))}
        </div>

        {/* Discount Code Tracker */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h2 className="font-bold text-white text-lg mb-4">Influencer Discount Codes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-white/10">
                  <th className="text-left py-2 pr-4">Code</th>
                  <th className="text-left py-2 pr-4">Influencer</th>
                  <th className="text-left py-2 pr-4">Discount</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { code: 'APEX20', influencer: 'General Campaign', discount: '20%', active: true },
                  { code: 'ROGAN15', influencer: 'Joe Rogan', discount: '15%', active: true },
                  { code: 'HUBERMAN20', influencer: 'Huberman Lab', discount: '20%', active: true },
                  { code: 'UFC10', influencer: 'UFC Partnership', discount: '10%', active: true },
                  { code: 'EARLY15', influencer: 'Waitlist Members', discount: '15%', active: true },
                ].map(({ code, influencer, discount, active }) => (
                  <tr key={code}>
                    <td className="py-3 pr-4 font-mono text-[#39FF14] font-bold">{code}</td>
                    <td className="py-3 pr-4 text-gray-300">{influencer}</td>
                    <td className="py-3 pr-4 text-white font-semibold">{discount}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h2 className="font-bold text-white text-lg mb-4">Recent Orders</h2>
          {orders.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Package className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>No orders yet. Launch the store and start selling! 🚀</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-white/10">
                    <th className="text-left py-2 pr-4">Order #</th>
                    <th className="text-left py-2 pr-4">Email</th>
                    <th className="text-left py-2 pr-4">Total</th>
                    <th className="text-left py-2 pr-4">Status</th>
                    <th className="text-left py-2">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="py-3 pr-4 font-mono text-[#39FF14]">{order.orderNumber}</td>
                      <td className="py-3 pr-4 text-gray-300">{order.email}</td>
                      <td className="py-3 pr-4 text-white font-bold">${(order.total / 100).toFixed(2)}</td>
                      <td className="py-3 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[order.status] || 'bg-gray-500/20 text-gray-400'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
