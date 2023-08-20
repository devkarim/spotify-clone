import log from '@/lib/log';
import Errors from '@/config/errors';
import Response from '@/types/server';
import { toBigIntSafe } from '@/lib/utils';
import { getUser } from '@/services/server/session';
import { updatePlaylistLastPlayed } from '@/services/server/playlist';

export async function PATCH(
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
    const song = await updatePlaylistLastPlayed(user.id, playlistId);
    if (!song) throw Errors.invalidPlaylistId;
    return Response.success();
  } catch (err) {
    log.error(err, 'get /api/playlist/[id]/last-played');
    return Response.error(err);
  }
}
