import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ valid: false, error: 'No code provided' });
    }

    const discount = await prisma.discountCode.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!discount) {
      return NextResponse.json({ valid: false, error: 'Invalid discount code' });
    }

    if (!discount.active) {
      return NextResponse.json({ valid: false, error: 'This code is no longer active' });
    }

    if (discount.expiresAt && discount.expiresAt < new Date()) {
      return NextResponse.json({ valid: false, error: 'This code has expired' });
    }

    if (discount.maxUses && discount.usedCount >= discount.maxUses) {
      return NextResponse.json({ valid: false, error: 'This code has reached its usage limit' });
    }

    return NextResponse.json({
      valid: true,
      discount: discount.value,
      type: discount.type,
      value: discount.value,
      description: discount.description,
    });
  } catch (error) {
    console.error('Error validating discount code:', error);
    return NextResponse.json({ valid: false, error: 'Failed to validate code' }, { status: 500 });
  }
}
