import { NextRequest, NextResponse } from 'next/server';
import { getFighters } from '@/lib/data';
import { Fighter } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const weightClass = searchParams.get('weightClass');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') as 'salary' | 'projectedPoints' | 'ownership' | null;
    const order = (searchParams.get('order') ?? 'desc') as 'asc' | 'desc';
    const limit = parseInt(searchParams.get('limit') ?? '50', 10);
    const page = parseInt(searchParams.get('page') ?? '1', 10);

    const fighters = await getFighters();
    let results: Fighter[] = [...fighters];

    if (weightClass) {
      results = results.filter(
        (f) => f.weightClass.toLowerCase() === weightClass.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          (f.nickname?.toLowerCase().includes(q) ?? false)
      );
    }

    if (sortBy) {
      results.sort((a, b) => {
        const valA = a[sortBy] as number;
        const valB = b[sortBy] as number;
        return order === 'asc' ? valA - valB : valB - valA;
      });
    }

    const totalCount = results.length;
    const offset = (page - 1) * limit;
    const paginated = results.slice(offset, offset + limit);

    return NextResponse.json({
      fighters: paginated,
      totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error('[GET /api/fighters]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
