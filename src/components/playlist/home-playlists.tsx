import { Playlist } from '@prisma/client';
import PlaylistHomeCard from './playlist-home-card';

interface HomePlaylistsProps {
  playlists?: Playlist[];
}

const HomePlaylists: React.FC<HomePlaylistsProps> = ({ playlists = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {playlists.map((p) => (
        <PlaylistHomeCard key={p.name} name={p.name} imageUrl={p.imageUrl} />
      ))}
    </div>
  );
};

export default HomePlaylists;
