import log from '@/lib/log';
import Errors from '@/config/errors';
import Response from '@/types/server';
import { getUser } from '@/services/server/session';
import { getLastPlayedSongs } from '@/services/server/song';

export async function GET(req: Request) {
  try {
    const user = await getUser();
    if (!user) {
      throw Errors.unauthenticated;
    }
    const songs = await getLastPlayedSongs(user.id);
    return Response.success(songs);
  } catch (err) {
    log.error(err, 'get /api/song/last-played');
    return Response.error(err);
  }
}
