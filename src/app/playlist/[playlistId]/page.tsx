import Errors from '@/config/errors';
import { toBigInt } from '@/lib/utils';
import { getUser } from '@/services/server/session';
import { getUserPlaylist } from '@/services/server/playlist';

interface PlaylistPageProps {
  params: { playlistId: string };
}

const PlaylistPage: React.FC<PlaylistPageProps> = async ({
  params: { playlistId },
}) => {
  const id = toBigInt(playlistId);

  const user = await getUser();

  if (!user) throw Errors.unauthenticated;

  const playlist = await getUserPlaylist(user.id, id);

  return <div></div>;
};

export default PlaylistPage;
