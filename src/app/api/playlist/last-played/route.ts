import log from '@/lib/log';
import Errors from '@/config/errors';
import Response from '@/types/server';
import { getUser } from '@/services/server/session';
import { getLastPlayedPlaylists } from '@/services/server/playlist';

export async function GET(req: Request) {
  try {
    const user = await getUser();
    if (!user) {
      throw Errors.unauthenticated;
    }
    const playlists = await getLastPlayedPlaylists(user.id);
    return Response.success(playlists);
  } catch (err) {
    log.error(err, 'get /api/playlist/last-played');
    return Response.error(err);
  }
}
