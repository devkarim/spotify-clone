import AddSongButton from '@/components/ui/add-song-button';
import MusicImage from '@/components/ui/music-image';

interface PlaylistHeaderProps {
  id: bigint;
  title: string;
  imageUrl: string | null;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({
  id,
  title,
  imageUrl,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-12 items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="relative h-72 w-72 rounded-md overflow-hidden shadow-xl">
          <MusicImage imageUrl={imageUrl} />
        </div>
        <div className="space-y-4">
          <p>Playlist</p>
          <h1 className="font-bold text-5xl sm:text-7xl">{title}</h1>
        </div>
      </div>
      <AddSongButton playlistId={id} />
    </div>
  );
};

export default PlaylistHeader;
