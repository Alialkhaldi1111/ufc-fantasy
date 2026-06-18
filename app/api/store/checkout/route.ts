import { NextRequest, NextResponse } from 'next/server';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CODES: Record<string, number> = {
  APEX20: 20,
  APEX10: 10,
  EARLY15: 15,
  ROGAN15: 15,
  HUBERMAN20: 20,
  UFC10: 10,
  WELCOME10: 10,
};

export async function POST(req: NextRequest) {
  try {
    const { items, discountCode, email } = await req.json() as {
      items: CartItem[];
      discountCode?: string;
      email?: string;
    };

    if (!items?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
    }

    // Dynamic import to avoid issues if stripe not installed
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(stripeKey);

    const discountPct = discountCode ? (CODES[discountCode.toUpperCase()] ?? 0) : 0;

    const lineItems = items.map((item) => {
      const discountedPrice = Math.round(item.price * (1 - discountPct / 100));
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [],
          },
          unit_amount: discountedPrice,
        },
        quantity: item.quantity,
      };
    });

    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const shipping = subtotal >= 19900 ? 0 : 999;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      customer_email: email,
      shipping_address_collection: { allowed_countries: ['US', 'CA', 'AU', 'GB'] },
      shipping_options: shipping === 0
        ? [{ shipping_rate_data: { type: 'fixed_amount', fixed_amount: { amount: 0, currency: 'usd' }, display_name: 'Free Shipping', delivery_estimate: { minimum: { unit: 'business_day', value: 3 }, maximum: { unit: 'business_day', value: 5 } } } }]
        : [{ shipping_rate_data: { type: 'fixed_amount', fixed_amount: { amount: 999, currency: 'usd' }, display_name: 'Standard Shipping', delivery_estimate: { minimum: { unit: 'business_day', value: 3 }, maximum: { unit: 'business_day', value: 7 } } } }],
      success_url: `${req.headers.get('origin')}/store/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/store/cart`,
      metadata: { discountCode: discountCode || '' },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
