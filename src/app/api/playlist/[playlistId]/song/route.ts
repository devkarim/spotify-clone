import log from '@/lib/log';
import Errors from '@/config/errors';
import Response from '@/types/server';
import { toBigInt } from '@/lib/utils';
import { songSchema } from '@/schemas/songSchema';
import { createSong } from '@/services/server/song';
import { getUser } from '@/services/server/session';

export async function POST(
  req: Request,
  { params }: { params: { playlistId: string } }
) {
  const body = await req.json();
  try {
    const playlistId = toBigInt(params.playlistId);
    const user = await getUser();
    if (!user) {
      throw Errors.unauthenticated;
    }
    const songData = songSchema.parse(body);
    const song = await createSong(playlistId, songData);
    return Response.success(song);
  } catch (err) {
    log.error(err, 'post /api/playlist/[playlistId]/song');
    return Response.error(err);
  }
}
