import Stripe from 'stripe';
import 'server-only';

import { APP_NAME } from '@/config/constants';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
  appInfo: { name: APP_NAME, version: '0.0.1' },
});

export default stripe;
