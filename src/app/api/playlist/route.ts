import log from '@/lib/log';
import Errors from '@/config/errors';
import Response from '@/types/server';
import { getUser } from '@/services/server/session';
import { playlistSchema } from '@/schemas/playlistSchema';
import { createPlaylist } from '@/services/server/playlist';
import { getUserById } from '@/services/server/user';
import { MAX_PLAYLISTS_PER_USER } from '@/config/limits';

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const user = await getUser();
    if (!user) throw Errors.unauthenticated;
    const fullUser = await getUserById(user.id);
    if (!fullUser) throw Errors.invalidId;
    if (!user.isPremium && fullUser.playlists.length >= MAX_PLAYLISTS_PER_USER)
      throw Errors.maxPlaylists;
    const { name, imageUrl } = playlistSchema.parse(body);
    const playlist = await createPlaylist(user.id, name, imageUrl);
    return Response.success(playlist);
  } catch (err) {
    log.error(err, 'post /api/playlist');
    return Response.error(err);
  }
}
