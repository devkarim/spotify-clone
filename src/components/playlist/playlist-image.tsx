import Image from 'next/image';

import { cn } from '@/lib/utils';

import PlaylistNoImage from './playlist-no-image';

interface PlaylistImageProps {
  imageUrl: string | null;
  className?: string;
  emptyClassName?: string;
}

const PlaylistImage: React.FC<PlaylistImageProps> = ({
  imageUrl,
  className,
  emptyClassName,
}) => {
  return imageUrl ? (
    <Image
      src={imageUrl}
      alt="playlist-image"
      fill
      className={cn('object-cover select-none', className)}
    />
  ) : (
    <PlaylistNoImage className={emptyClassName} />
  );
};

export default PlaylistImage;
