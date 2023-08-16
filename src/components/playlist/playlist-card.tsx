'use client';

import { useRouter } from 'next/navigation';

import PlaylistImage from './playlist-image';

interface PlaylistCardProps {
  id: bigint;
  name: string;
  imageUrl: string | null;
  songs?: number;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  id,
  name,
  imageUrl,
  songs = 0,
}) => {
  const router = useRouter();

  return (
    <div
      className="flex p-2 gap-4 hover:bg-card/50 rounded-md transition-colors cursor-pointer"
      onClick={() => router.push(`/playlist/${id}`)}
    >
      <div className="relative rounded-md overflow-hidden h-16 w-16">
        <PlaylistImage imageUrl={imageUrl} emptyClassName="text-2xl" />
      </div>
      <div className="space-y-px">
        <h2>{name}</h2>
        <p className="text-sm opacity-60">Playlist - {songs} songs</p>
      </div>
    </div>
  );
};

export default PlaylistCard;
