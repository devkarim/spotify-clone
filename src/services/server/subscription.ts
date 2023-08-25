import Stripe from 'stripe';

import { SubscriptionStatus } from '@prisma/client';

import prisma from '@/lib/prisma';

export const createSubscription = (userId: bigint, subscriptionId: string) =>
  prisma.subscription.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      stripe_subscription_id: subscriptionId,
      status: 'PENDING',
    },
  });

export const updateSubscriptionStatus = (
  customerId: string,
  subscriptionId: string,
  status: SubscriptionStatus
) => {
  return prisma.subscription.updateMany({
    where: {
      user: {
        stripe_customer_id: customerId,
      },
    },
    data: {
      stripe_subscription_id: subscriptionId,
      status,
    },
  });
};

const parseSubscriptionStatus = (
  status: Stripe.Subscription.Status
): SubscriptionStatus => {
  if (status == 'active') return 'ACTIVE';
  if (status == 'canceled') return 'CANCELLED';
  if (status == 'incomplete') return 'PENDING';
  if (status == 'trialing') return 'TRIALING';
  return 'UNPAID';
};

export const parseDate = (secs: number | null) => {
  if (!secs) return;
  const t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

export const updateSubscription = async (subscription: Stripe.Subscription) => {
  const {
    id,
    status,
    customer,
    cancel_at,
    canceled_at,
    cancel_at_period_end,
    trial_start,
    trial_end,
    current_period_start,
    current_period_end,
    ended_at,
  } = subscription;
  return prisma.subscription.updateMany({
    where: {
      user: {
        stripe_customer_id: customer as string,
      },
    },
    data: {
      stripe_subscription_id: id,
      status: parseSubscriptionStatus(status),
      cancel_at: parseDate(cancel_at),
      canceled_at: parseDate(canceled_at),
      cancel_at_period_end: cancel_at_period_end,
      current_period_start: parseDate(current_period_start),
      current_period_end: parseDate(current_period_end),
      trial_start: parseDate(trial_start),
      trial_end: parseDate(trial_end),
      ended_at: parseDate(ended_at),
    },
  });
};
