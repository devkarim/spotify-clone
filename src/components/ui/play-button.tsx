'use client';

// import { FaPause, FaPlay } from 'react-icons/fa';
import { FaPlay } from '@react-icons/all-files/fa/FaPlay';
import { FaPause } from '@react-icons/all-files/fa/FaPause';
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface PlayButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isPlaying?: boolean;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  isPlaying,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'btn btn-primary btn-circle text-black hover:scale-105 transition-opacity duration-300 h-12 w-12 text-lg',
        className
      )}
      {...props}
    >
      {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
    </button>
  );
};

export default PlayButton;
