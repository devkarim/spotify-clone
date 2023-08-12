import { authSchema } from '@/schemas/authSchema';
import { createUser, isEmailTaken } from '@/services/user';
import Response from '@/types/server';
import ServerError from '@/types/error';
import log from '@/lib/log';

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const { email, password } = authSchema.parse(body);
    const emailTaken = await isEmailTaken(email);
    if (emailTaken) {
      throw Response.error('Email already taken', 400);
    }
    const user = await createUser(email, password);
    return Response.success(user);
  } catch (err) {
    log.error(err, 'post /api/signup');
    return ServerError.from(err).res();
  }
}
