import { prisma } from '@/lib/prisma';

type OrderStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'REFUNDED' | 'CANCELLED';

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: 'bg-yellow-500/20 text-yellow-400',
  PAID: 'bg-[#39FF14]/20 text-[#39FF14]',
  PROCESSING: 'bg-blue-500/20 text-blue-400',
  SHIPPED: 'bg-purple-500/20 text-purple-400',
  DELIVERED: 'bg-green-500/20 text-green-400',
  REFUNDED: 'bg-orange-500/20 text-orange-400',
  CANCELLED: 'bg-red-500/20 text-red-400',
};

export default async function AdminStorePage() {
  const [orders, totalRevenue, statusCounts] = await Promise.all([
    prisma.storeOrder.findMany({
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    }),
    prisma.storeOrder.aggregate({
      where: { status: { in: ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'] } },
      _sum: { total: true },
    }),
    prisma.storeOrder.groupBy({
      by: ['status'],
      _count: { _all: true },
    }),
  ]);

  const revenue = (totalRevenue._sum.total ?? 0) / 100;

  const stats = [
    { label: 'Total Revenue', value: `$${revenue.toFixed(2)}` },
    { label: 'Total Orders', value: orders.length },
    {
      label: 'Paid Orders',
      value: statusCounts.find((s) => s.status === 'PAID')?._count._all ?? 0,
    },
    {
      label: 'Shipped',
      value: statusCounts.find((s) => s.status === 'SHIPPED')?._count._all ?? 0,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-2xl font-black text-white">Store Orders</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#0f1520] border border-white/10 rounded-xl p-5">
            <p className="text-white/50 text-sm">{s.label}</p>
            <p className="text-white font-black text-2xl mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-[#0f1520] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10">
              <tr className="text-white/50 text-left">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-white/40">
                    No orders yet
                  </td>
                </tr>
              )}
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <p className="text-white font-mono text-xs">{order.orderNumber}</p>
                    {order.trackingNumber && (
                      <p className="text-white/40 text-xs">{order.trackingNumber}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-white">
                      {order.firstName} {order.lastName}
                    </p>
                    <p className="text-white/50 text-xs">{order.email}</p>
                  </td>
                  <td className="px-4 py-3 text-white/70">
                    {order.items.map((i) => `${i.quantity}x ${i.product.name}`).join(', ')}
                  </td>
                  <td className="px-4 py-3 text-white font-semibold">
                    ${(order.total / 100).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status as OrderStatus] ?? 'bg-white/10 text-white/60'}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/50 text-xs">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
