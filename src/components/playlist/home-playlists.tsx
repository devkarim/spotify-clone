'use client';

import { useRouter } from 'next/navigation';

import { Playlist } from '@prisma/client';

import PlaylistHomeCard from './playlist-home-card';

interface HomePlaylistsProps {
  playlists?: Playlist[];
}

const HomePlaylists: React.FC<HomePlaylistsProps> = ({ playlists = [] }) => {
  const router = useRouter();

  const onParentClick = (playlistId: bigint) => {
    router.push(`/playlist/${playlistId}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {playlists.map((p) => (
        <PlaylistHomeCard
          key={p.name}
          playlistId={p.id}
          name={p.name}
          imageUrl={p.imageUrl}
          onParentClick={() => onParentClick(p.id)}
        />
      ))}
    </div>
  );
};

export default HomePlaylists;
