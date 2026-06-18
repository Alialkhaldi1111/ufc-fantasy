import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // Placeholder — replace with Prisma query
  return NextResponse.json({ id, status: 'PAID', message: 'Order found' });
}
