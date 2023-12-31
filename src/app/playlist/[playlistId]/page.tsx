import Errors from '@/config/errors';
import { toBigInt } from '@/lib/utils';
import Container from '@/components/ui/container';
import { getUser } from '@/services/server/session';
import SongsList from '@/components/songs/songs-list';
import { getUserPlaylist } from '@/services/server/playlist';
import PlaylistPlayButton from '@/components/player/playlist-play-button';

import PlaylistHeader from './components/playlist-header';
import PlaylistOptions from './components/playlist-options';

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
    <Container className="space-y-8">
      <PlaylistHeader
        id={playlist.id}
        title={playlist.name}
        imageUrl={playlist.imageUrl ?? undefined}
      />
      <div className="flex items-center gap-6">
        <PlaylistPlayButton
          playlistId={playlist.id}
          firstSong={playlist.songs[0]}
        />
        <PlaylistOptions name={playlist.name} playlistId={playlist.id} />
      </div>
      <SongsList songs={playlist.songs} />
    </Container>
  );
};

export default PlaylistPage;
