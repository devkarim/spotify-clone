import Errors from '@/config/errors';
import { toBigInt } from '@/lib/utils';
import { getUser } from '@/services/server/session';
import PlaylistHeader from './components/playlist-header';
import { getUserPlaylist } from '@/services/server/playlist';
import Container from '@/components/ui/container';

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

  if (!playlist) throw Errors.notFound;

  return (
    <Container>
      <PlaylistHeader title={playlist.name} imageUrl={playlist.imageUrl} />
    </Container>
  );
};

export default PlaylistPage;
