import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error('[Stripe Webhook] Missing signature or webhook secret');
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Stripe Webhook] Signature verification failed:', message);
    return NextResponse.json({ error: `Webhook error: ${message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan ?? 'pro';

        if (!userId) {
          console.warn('[Stripe Webhook] checkout.session.completed: no userId in metadata');
          break;
        }

        console.log(`[Stripe Webhook] Checkout completed for user ${userId}, plan: ${plan}`);

        // In production, update DB:
        // await prisma.subscription.upsert({
        //   where: { userId },
        //   create: {
        //     userId,
        //     stripeCustomerId: session.customer as string,
        //     stripeSubscriptionId: session.subscription as string,
        //     plan,
        //     status: 'ACTIVE',
        //   },
        //   update: {
        //     stripeCustomerId: session.customer as string,
        //     stripeSubscriptionId: session.subscription as string,
        //     plan,
        //     status: 'ACTIVE',
        //   },
        // });
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const stripeSubscriptionId = subscription.id;
        const status = mapStripeStatus(subscription.status);

        console.log(`[Stripe Webhook] Subscription updated: ${stripeSubscriptionId}, status: ${status}`);

        // In production:
        // await prisma.subscription.update({
        //   where: { stripeSubscriptionId },
        //   data: {
        //     status,
        //     currentPeriodStart: new Date(subscription.current_period_start * 1000),
        //     currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        //     cancelAtPeriodEnd: subscription.cancel_at_period_end,
        //   },
        // });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const stripeSubscriptionId = subscription.id;

        console.log(`[Stripe Webhook] Subscription cancelled: ${stripeSubscriptionId}`);

        // In production:
        // await prisma.subscription.update({
        //   where: { stripeSubscriptionId },
        //   data: { status: 'CANCELLED', plan: 'free' },
        // });
        // await prisma.user.updateMany({
        //   where: { subscription: { stripeSubscriptionId } },
        //   data: { role: 'USER' },
        // });
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Stripe Webhook] Handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

function mapStripeStatus(status: Stripe.Subscription.Status): string {
  const map: Record<Stripe.Subscription.Status, string> = {
    active: 'ACTIVE',
    canceled: 'CANCELLED',
    past_due: 'PAST_DUE',
    trialing: 'TRIALING',
    incomplete: 'PAST_DUE',
    incomplete_expired: 'CANCELLED',
    paused: 'CANCELLED',
    unpaid: 'PAST_DUE',
  };
  return map[status] ?? 'CANCELLED';
}
