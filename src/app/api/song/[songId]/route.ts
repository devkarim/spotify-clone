import log from '@/lib/log';
import Errors from '@/config/errors';
import Response from '@/types/server';
import { toBigIntSafe } from '@/lib/utils';
import { getUser } from '@/services/server/session';
import { editSong } from '@/services/server/song';
import { songSchema } from '@/schemas/songSchema';

export async function PATCH(
  req: Request,
  { params }: { params: { songId: string } }
) {
  const body = await req.json();
  try {
    const user = await getUser();
    if (!user) {
      throw Errors.unauthenticated;
    }
    const songId = toBigIntSafe(params.songId);
    if (!songId) throw Errors.invalidSongId;
    const songData = songSchema.parse(body);
    const song = await editSong(songId, user.id, songData);
    if (!song) throw Errors.invalidSongId;
    return Response.success(song);
  } catch (err) {
    log.error(err, 'patch /api/song/[id]');
    return Response.error(err);
  }
}
