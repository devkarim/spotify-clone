import log from '@/lib/log';
import Errors from '@/config/errors';
import Response from '@/types/server';
import { toBigIntSafe } from '@/lib/utils';
import { getUser } from '@/services/server/session';
import { playlistSchema } from '@/schemas/playlistSchema';
import { getUserPlaylist, updatePlaylist } from '@/services/server/playlist';

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

export async function PATCH(
  req: Request,
  { params }: { params: { playlistId: string } }
) {
  const body = await req.json();
  try {
    const user = await getUser();
    if (!user) {
      throw Errors.unauthenticated;
    }
    const playlistId = toBigIntSafe(params.playlistId);
    if (!playlistId) throw Errors.invalidPlaylistId;
    const data = playlistSchema.parse(body);
    const playlist = await updatePlaylist(user.id, playlistId, data);
    return Response.success(playlist);
  } catch (err) {
    log.error(err, 'patch /api/playlist/[id]');
    return Response.error(err);
  }
}
