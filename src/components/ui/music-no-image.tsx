// import { FiMusic } from 'react-icons/fi';
import { FiMusic } from '@react-icons/all-files/fi/FiMusic';

import { cn } from '@/lib/utils';

interface MusicNoImageProps {
  className?: string;
}

const MusicNoImage: React.FC<MusicNoImageProps> = ({ className }) => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-section-card select-none">
      <FiMusic className={cn('text-7xl opacity-60', className)} />
    </div>
  );
};

export default MusicNoImage;
