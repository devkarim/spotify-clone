'use client';

import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import useScroll from '@/hooks/use-scroll';

interface MainContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  className,
  ...props
}) => {
  const scroll = useScroll();

  return (
    <div
      onScroll={(e) => scroll.setOffset(e.currentTarget.scrollTop)}
      className={cn(
        'bg-backgroundSecondary h-full w-full overflow-y-auto bg-no-repeat bg-local',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default MainContainer;
