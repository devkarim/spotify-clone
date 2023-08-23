import Image, { ImageProps } from 'next/image';

import { cn } from '@/lib/utils';

import MusicNoImage from './music-no-image';

interface MusicImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  imageUrl?: string | null;
  emptyClassName?: string;
}

const MusicImage: React.FC<MusicImageProps> = ({
  imageUrl,
  className,
  emptyClassName,
  ...props
}) => {
  return imageUrl ? (
    <Image
      src={imageUrl}
      alt="music-image"
      fill
      className={cn('object-cover select-none', className)}
      {...props}
    />
  ) : (
    <MusicNoImage className={emptyClassName} />
  );
};

export default MusicImage;
