import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface ContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
