import { NextRequest, NextResponse } from 'next/server';

// Hardcoded discount codes — replace with DB lookup in production
const CODES: Record<string, { value: number; type: 'percentage' | 'fixed'; influencer?: string }> = {
  APEX20: { value: 20, type: 'percentage' },
  APEX10: { value: 10, type: 'percentage' },
  EARLY15: { value: 15, type: 'percentage' },
  ROGAN15: { value: 15, type: 'percentage', influencer: 'Joe Rogan' },
  HUBERMAN20: { value: 20, type: 'percentage', influencer: 'Huberman Lab' },
  UFC10: { value: 10, type: 'percentage', influencer: 'UFC Partnership' },
  WELCOME10: { value: 10, type: 'percentage' },
};

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    const normalized = (code || '').trim().toUpperCase();
    const discount = CODES[normalized];

    if (!discount) {
      return NextResponse.json({ valid: false, message: 'Code not found' });
    }

    return NextResponse.json({ valid: true, ...discount });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
