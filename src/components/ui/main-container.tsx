'use client';

import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import useScroll from '@/hooks/use-scroll';
import { usePathname } from 'next/navigation';

interface MainContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  headerClassName?: string;
  isSignedIn?: boolean;
}

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  className,
  headerClassName,
  isSignedIn,
  ...props
}) => {
  const pathname = usePathname();
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
      <div
        className={cn(
          'absolute top-0 w-full h-64',
          isSignedIn && 'bg-gradient-to-b from-blue-800/40',
          pathname.startsWith('/playlist') &&
            'bg-gradient-to-b from-emerald-800/70',
          headerClassName
        )}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

export default MainContainer;
