import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (slug === 'apex-cold-plunge-pro') {
    return NextResponse.json({
      id: 'apex-cold-plunge-v1',
      slug,
      name: 'APEX Cold Plunge Pro',
      price: 24900,
      comparePrice: 39900,
      stock: 47,
    });
  }
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
