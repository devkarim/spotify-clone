import { APP_URL } from '@/config/constants';
import prisma from '@/lib/prisma';
import stripe from '@/lib/stripe';

/* Customer */

export const createCustomer = (userId: string, email: string) => {
  return stripe.customers.create({
    email,
    metadata: {
      userId,
    },
  });
};

export const createOrRetrieveCustomer = async (
  userId: bigint,
  email: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return null;
  }

  if (!user.stripe_customer_id) {
    const customer = await createCustomer(userId.toString(), email);
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        stripe_customer_id: customer.id,
      },
    });

    return customer.id;
  }

  return user.stripe_customer_id;
};

/* Checkout */

export const checkout = (customerId: string) => {
  return stripe.checkout.sessions.create({
    customer: customerId,
    billing_address_collection: 'required',
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_ID,
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: 7,
    },
    success_url: `${APP_URL}/premium`,
  });
};
