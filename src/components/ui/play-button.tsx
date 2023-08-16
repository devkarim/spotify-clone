'use client';

import { FaPlay } from 'react-icons/fa';
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface PlayButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick?: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({ className, ...props }) => {
  return (
    <button
      className={cn(
        'btn btn-primary btn-circle text-black hover:scale-105 transition-opacity duration-300 h-12 w-12 text-lg',
        className
      )}
      {...props}
    >
      <FaPlay className="ml-1" />
    </button>
  );
};

export default PlayButton;
