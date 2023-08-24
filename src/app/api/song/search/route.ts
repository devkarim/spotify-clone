import log from '@/lib/log';
import Errors from '@/config/errors';
import Response from '@/types/server';
import { getUser } from '@/services/server/session';
import { searchSongs } from '@/services/server/song';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  try {
    const user = await getUser();
    if (!user) {
      throw Errors.unauthenticated;
    }
    if (!query) {
      throw Errors.queryRequired;
    }
    const songs = await searchSongs(user.id, query);
    return Response.success(songs);
  } catch (err) {
    log.error(err, 'get /api/song/search');
    return Response.error(err);
  }
}
