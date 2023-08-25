import log from '@/lib/log';
import stripe from '@/lib/stripe';
import Errors from '@/config/errors';
import Response from '@/types/server';
import { APP_URL } from '@/config/constants';
import { getUser } from '@/services/server/session';
import { getUserById } from '@/services/server/user';

export async function POST(req: Request) {
  try {
    const user = await getUser();
    if (!user) throw Errors.unauthenticated;
    const customer = await getUserById(user.id);
    if (!customer || !customer.stripe_customer_id) throw Errors.notFound;
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.stripe_customer_id,
      return_url: `${APP_URL}/premium`,
    });
    return Response.success(session.url);
  } catch (err) {
    log.error(err, 'post /api/portal');
    return Response.error(err);
  }
}
