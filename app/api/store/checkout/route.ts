import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2025-05-28.basil',
});

interface CheckoutItem {
  productId: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, discountCode, email }: { items: CheckoutItem[]; discountCode?: string; email?: string } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    // Fetch products
    const productIds = items.map((i: CheckoutItem) => i.productId);
    const products = await prisma.storeProduct.findMany({
      where: { id: { in: productIds }, active: true },
    });

    if (products.length !== items.length) {
      return NextResponse.json({ error: 'Some products not found' }, { status: 400 });
    }

    // Validate discount code
    let discountAmount = 0;
    let validatedCode = null;
    if (discountCode) {
      const code = await prisma.discountCode.findUnique({
        where: { code: discountCode.toUpperCase() },
      });
      if (
        code &&
        code.active &&
        (!code.expiresAt || code.expiresAt > new Date()) &&
        (!code.maxUses || code.usedCount < code.maxUses)
      ) {
        validatedCode = code;
        const subtotal = items.reduce((sum: number, item: CheckoutItem) => {
          const product = products.find((p) => p.id === item.productId);
          return sum + (product?.price ?? 0) * item.quantity;
        }, 0);
        if (code.type === 'percentage') {
          discountAmount = Math.round(subtotal * (code.value / 100));
        } else {
          discountAmount = code.value;
        }
      }
    }

    // Build line items
    const lineItems = items.map((item: CheckoutItem) => {
      const product = products.find((p) => p.id === item.productId)!;
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description.substring(0, 200),
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      };
    });

    // Build discounts array for Stripe
    const stripeDiscounts = [];
    if (discountAmount > 0 && validatedCode) {
      const coupon = await stripe.coupons.create({
        amount_off: discountAmount,
        currency: 'usd',
        duration: 'once',
        name: validatedCode.code,
      });
      stripeDiscounts.push({ coupon: coupon.id });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      customer_email: email,
      discounts: stripeDiscounts.length > 0 ? stripeDiscounts : undefined,
      metadata: {
        discountCode: discountCode ?? '',
        items: JSON.stringify(items),
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Free Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
