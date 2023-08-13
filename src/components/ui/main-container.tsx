'use client';

import useScroll from '@/hooks/use-scroll';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface MainContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  ...props
}) => {
  const scroll = useScroll();

  return (
    <div
      onScroll={(e) => scroll.setOffset(e.currentTarget.scrollTop)}
      {...props}
    >
      {children}
    </div>
  );
};

export default MainContainer;
