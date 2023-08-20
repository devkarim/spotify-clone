import { cn } from '@/lib/utils';
import { Item } from '@/types/ui';
import MusicImage from '@/components/ui/music-image';
import SongPlayButton from '@/components/player/song-play-button';
import PlaylistPlayButton from '@/components/player/playlist-play-button';

interface SectionItemProps {
  item: Item;
  onParentClick?: () => void;
  rounded?: boolean;
}

const SectionItem: React.FC<SectionItemProps> = ({
  item: { title, subtitle, imageUrl, song, playlist },
  onParentClick,
  rounded = false,
}) => {
  return (
    <div
      className="group bg-section-card w-full lg:w-52 p-6 rounded-md space-y-2 cursor-pointer hover:bg-section-card-secondary transition-colors"
      onClick={(e) => e.target == e.currentTarget && onParentClick?.()}
    >
      <div
        className={cn(
          'relative h-40 w-full lg:w-40 rounded-md overflow-hidden',
          {
            'rounded-full': rounded,
          }
        )}
        onClick={(e) => e.target == e.currentTarget && onParentClick?.()}
      >
        <MusicImage
          imageUrl={imageUrl}
          emptyClassName="text-5xl"
          onClick={(e) => e.target == e.currentTarget && onParentClick?.()}
        />
        {playlist ? (
          <PlaylistPlayButton
            playlistId={playlist.id}
            className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 m-4"
          />
        ) : song ? (
          <SongPlayButton
            song={song}
            className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 m-4"
          />
        ) : null}
      </div>
      <div onClick={onParentClick}>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm opacity-60">{subtitle}</p>
      </div>
    </div>
  );
};

export default SectionItem;
