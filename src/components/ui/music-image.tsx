import Image from 'next/image';

import { cn } from '@/lib/utils';

import MusicNoImage from './music-no-image';

interface MusicImageProps {
  imageUrl: string | null;
  className?: string;
  emptyClassName?: string;
}

const MusicImage: React.FC<MusicImageProps> = ({
  imageUrl,
  className,
  emptyClassName,
}) => {
  return imageUrl ? (
    <Image
      src={imageUrl}
      alt="music-image"
      fill
      className={cn('object-cover select-none', className)}
    />
  ) : (
    <MusicNoImage className={emptyClassName} />
  );
};

export default MusicImage;
