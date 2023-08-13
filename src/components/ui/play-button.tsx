import { FaPlay } from 'react-icons/fa';

import { cn } from '@/lib/utils';

interface PlayButtonProps {
  className?: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ className }) => {
  return (
    <button
      className={cn(
        'btn btn-primary btn-circle text-black m-4 opacity-0 group-hover:opacity-100 hover:scale-105 transition-opacity duration-300 h-12 w-12',
        className
      )}
    >
      <FaPlay className="ml-1 text-lg" />
    </button>
  );
};

export default PlayButton;
