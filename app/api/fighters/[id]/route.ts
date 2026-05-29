import { NextRequest, NextResponse } from 'next/server';
import { fighters } from '@/data/fighters';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const fighter = fighters.find((f) => f.id === id);

    if (!fighter) {
      return NextResponse.json({ error: 'Fighter not found' }, { status: 404 });
    }

    return NextResponse.json({ fighter });
  } catch (error) {
    console.error('[GET /api/fighters/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
