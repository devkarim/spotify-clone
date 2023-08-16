import { cn } from '@/lib/utils';
import PlayButton from '@/components/ui/play-button';
import PlaylistImage from '@/components/playlist/playlist-image';

interface SectionItemProps {
  title: string;
  subtitle: string;
  imageUrl: string | null;
  rounded?: boolean;
}

const SectionItem: React.FC<SectionItemProps> = ({
  title,
  subtitle,
  imageUrl,
  rounded = false,
}) => {
  return (
    <div className="group bg-section-card w-full lg:w-fit p-6 rounded-md space-y-2 cursor-pointer hover:bg-section-card-secondary transition-colors">
      <div
        className={cn(
          'relative h-40 w-full lg:w-40 rounded-md overflow-hidden',
          {
            'rounded-full': rounded,
          }
        )}
      >
        <PlaylistImage imageUrl={imageUrl} emptyClassName="text-5xl" />
        <PlayButton className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100" />
      </div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm opacity-60">{subtitle}</p>
    </div>
  );
};

export default SectionItem;
