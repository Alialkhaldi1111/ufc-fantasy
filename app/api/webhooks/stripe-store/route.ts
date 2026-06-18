import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_STORE_WEBHOOK_SECRET ?? ''
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const metadata = session.metadata ?? {};
      const rawItems = metadata.items ? JSON.parse(metadata.items) : [];

      // Fetch products
      const productIds = rawItems.map((i: { productId: string }) => i.productId);
      const products = await prisma.storeProduct.findMany({
        where: { id: { in: productIds } },
      });

      const orderItems = rawItems.map((item: { productId: string; quantity: number }) => {
        const product = products.find((p) => p.id === item.productId);
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product?.price ?? 0,
        };
      });

      const subtotal = orderItems.reduce(
        (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
        0
      );

      const shipping = session.shipping_details ?? null;
      const orderNumber = `APEX-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

      await prisma.storeOrder.create({
        data: {
          orderNumber,
          email: session.customer_details?.email ?? '',
          firstName: shipping?.name?.split(' ')[0] ?? '',
          lastName: shipping?.name?.split(' ').slice(1).join(' ') ?? '',
          phone: session.customer_details?.phone ?? null,
          address: shipping?.address?.line1 ?? '',
          city: shipping?.address?.city ?? '',
          state: shipping?.address?.state ?? '',
          zip: shipping?.address?.postal_code ?? '',
          country: shipping?.address?.country ?? 'US',
          status: 'PAID',
          subtotal,
          discount: session.total_details?.amount_discount ?? 0,
          shipping: session.total_details?.amount_shipping ?? 0,
          total: session.amount_total ?? subtotal,
          stripePaymentId: session.payment_intent as string,
          discountCode: metadata.discountCode || null,
          items: { create: orderItems },
        },
      });

      // Increment discount code usage
      if (metadata.discountCode) {
        await prisma.discountCode.updateMany({
          where: { code: metadata.discountCode },
          data: { usedCount: { increment: 1 } },
        });
      }
    } catch (err) {
      console.error('Error creating order from webhook:', err);
      return NextResponse.json({ error: 'Order creation failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
