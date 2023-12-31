import log from '@/lib/log';
import Errors from '@/config/errors';
import Response from '@/types/server';
import { authSchema } from '@/schemas/authSchema';
import { createUser, isEmailTaken } from '@/services/server/user';

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const { email, password } = authSchema.parse(body);
    const emailTaken = await isEmailTaken(email);
    if (emailTaken) {
      throw Errors.emailTaken;
    }
    const user = await createUser(email, password);
    return Response.success(user);
  } catch (err) {
    log.error(err, 'post /api/signup');
    return Response.error(err);
  }
}
