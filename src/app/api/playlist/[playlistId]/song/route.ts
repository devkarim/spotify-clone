import log from '@/lib/log';
import Errors from '@/config/errors';
import Response from '@/types/server';
import { toBigInt } from '@/lib/utils';
import { songSchema } from '@/schemas/songSchema';
import { createSong } from '@/services/server/song';
import { getUser } from '@/services/server/session';
import { MAX_SONGS_PER_PLAYLIST } from '@/config/limits';
import { getPlaylistById } from '@/services/server/playlist';

export async function POST(
  req: Request,
  { params }: { params: { playlistId: string } }
) {
  const body = await req.json();
  try {
    const playlistId = toBigInt(params.playlistId);
    const user = await getUser();
    if (!user) throw Errors.unauthenticated;
    const playlist = await getPlaylistById(playlistId);
    if (!playlist) throw Errors.invalidPlaylistId;
    if (!user.isPremium && playlist.songs.length >= MAX_SONGS_PER_PLAYLIST)
      throw Errors.maxSongs;
    const songData = songSchema.parse(body);
    const song = await createSong(playlistId, songData);
    return Response.success(song);
  } catch (err) {
    log.error(err, 'post /api/playlist/[playlistId]/song');
    return Response.error(err);
  }
}
