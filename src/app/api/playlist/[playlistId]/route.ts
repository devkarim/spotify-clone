import log from '@/lib/log';
import Errors from '@/config/errors';
import Response from '@/types/server';
import { toBigIntSafe } from '@/lib/utils';
import { getUser } from '@/services/server/session';
import { getUserPlaylist } from '@/services/server/playlist';

export async function GET(
  req: Request,
  { params }: { params: { playlistId: string } }
) {
  try {
    const user = await getUser();
    if (!user) {
      throw Errors.unauthenticated;
    }
    const playlistId = toBigIntSafe(params.playlistId);
    if (!playlistId) throw Errors.invalidPlaylistId;
    const playlist = await getUserPlaylist(user.id, playlistId);
    return Response.success(playlist);
  } catch (err) {
    log.error(err, 'get /api/playlist/[id]');
    return Response.error(err);
  }
}
