'use client';

import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import useScroll from '@/hooks/use-scroll';

interface MainContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  headerClassName?: string;
}

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  className,
  headerClassName,
  ...props
}) => {
  const scroll = useScroll();

  return (
    <div
      onScroll={(e) => scroll.setOffset(e.currentTarget.scrollTop)}
      className={cn(
        'relative bg-backgroundSecondary h-full w-full overflow-y-auto rounded-lg',
        className
      )}
      {...props}
    >
      <div className={cn('absolute top-0 w-full h-64', headerClassName)} />
      <div className="relative">{children}</div>
    </div>
  );
};

export default MainContainer;
