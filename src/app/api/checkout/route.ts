import log from '@/lib/log';
import Errors from '@/config/errors';
import Response from '@/types/server';
import { getUser } from '@/services/server/session';
import { checkout, createOrRetrieveCustomer } from '@/services/server/stripe';

export async function POST(req: Request) {
  try {
    const user = await getUser();
    if (!user) throw Errors.unauthenticated;
    if (user.isPremium) throw Errors.alreadyPremium;
    const customerId = await createOrRetrieveCustomer(user.id, user.email);
    if (!customerId) throw Errors.invalidId;
    const session = await checkout(customerId);
    return Response.success(session.url);
  } catch (err) {
    log.error(err, 'post /api/checkout');
    return Response.error(err);
  }
}
