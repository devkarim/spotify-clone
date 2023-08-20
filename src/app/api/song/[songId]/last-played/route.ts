import log from '@/lib/log';
import Errors from '@/config/errors';
import Response from '@/types/server';
import { toBigIntSafe } from '@/lib/utils';
import { getUser } from '@/services/server/session';
import { getSongById, updateSongLastPlayed } from '@/services/server/song';

export async function PATCH(
  req: Request,
  { params }: { params: { songId: string } }
) {
  try {
    const user = await getUser();
    if (!user) {
      throw Errors.unauthenticated;
    }
    const songId = toBigIntSafe(params.songId);
    if (!songId) throw Errors.invalidSongId;
    const song = await getSongById(songId);
    if (!song) throw Errors.invalidSongId;
    if (song.playlist.userId !== user.id) throw Errors.unauthorized;
    await updateSongLastPlayed(songId);
    return Response.success();
  } catch (err) {
    log.error(err, 'get /api/song/[id]/last-played');
    return Response.error(err);
  }
}
