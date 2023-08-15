import Errors from '@/config/errors';
import { toBigInt } from '@/lib/utils';
import Container from '@/components/ui/container';
import { getUser } from '@/services/server/session';
import PlayButton from '@/components/ui/play-button';
import PlaylistHeader from './components/playlist-header';
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

  if (!playlist) throw Errors.notFound;

  return (
    <Container>
      <PlaylistHeader title={playlist.name} imageUrl={playlist.imageUrl} />
      <PlayButton />
    </Container>
  );
};

export default PlaylistPage;
