import MusicImage from '@/components/ui/music-image';
import PlaylistPlayButton from '../player/playlist-play-button';

interface PlaylistHomeCardProps {
  playlistId: bigint;
  name: string;
  imageUrl: string | null;
}

const PlaylistHomeCard: React.FC<PlaylistHomeCardProps> = ({
  playlistId,
  name,
  imageUrl,
}) => {
  return (
    <div className="group flex h-24 bg-card/60 hover:bg-card/100 rounded-md overflow-hidden transition-colors duration-300 justify-between items-center cursor-pointer">
      <div className="flex gap-4 h-full items-center">
        <div className="relative h-full w-24">
          <MusicImage imageUrl={imageUrl} emptyClassName="text-4xl" />
        </div>
        <p className="font-semibold text-lg">{name}</p>
      </div>
      <PlaylistPlayButton
        playlistId={playlistId}
        className="opacity-0 group-hover:opacity-100 m-4"
      />
    </div>
  );
};

export default PlaylistHomeCard;
