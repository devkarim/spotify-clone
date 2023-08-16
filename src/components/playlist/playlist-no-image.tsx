import { FiMusic } from 'react-icons/fi';

import { cn } from '@/lib/utils';

interface PlaylistNoImageProps {
  className?: string;
}

const PlaylistNoImage: React.FC<PlaylistNoImageProps> = ({ className }) => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-section-card">
      <FiMusic className={cn('text-7xl opacity-60', className)} />
    </div>
  );
};

export default PlaylistNoImage;
