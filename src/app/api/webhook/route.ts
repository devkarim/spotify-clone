import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import log from '@/lib/log';
import stripe from '@/lib/stripe';
import Errors from '@/config/errors';
import Response from '@/types/server';
import {
  updateSubscription,
  updateSubscriptionStatus,
} from '@/services/server/subscription';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');
    if (!signature) throw Errors.unauthorized;
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer;
        if (!customerId || typeof customerId != 'string')
          throw Errors.invalidId;
        await updateSubscription(subscription);
        break;
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode == 'subscription') {
          const subscriptionId = session.subscription;
          const customerId = session.customer;
          if (!subscriptionId || typeof subscriptionId != 'string')
            throw Errors.invalidId;
          if (!customerId || typeof customerId != 'string')
            throw Errors.invalidId;
          await updateSubscriptionStatus(customerId, subscriptionId, 'ACTIVE');
        }
        break;
    }
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    log.error(err, 'post /api/webhook');
    return Response.error(err);
  }
}
