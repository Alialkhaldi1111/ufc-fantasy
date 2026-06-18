import { NextRequest, NextResponse } from 'next/server';

// In-memory orders for demo — replace with Prisma in production
const orders: Array<{
  id: string;
  orderNumber: string;
  email: string;
  total: number;
  status: string;
  createdAt: string;
}> = [];

export async function GET() {
  return NextResponse.json({ orders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const order = {
      id: crypto.randomUUID(),
      orderNumber: `APEX-${Date.now()}`,
      ...body,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    orders.push(order);
    return NextResponse.json(order, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
