'use client';

import { cn } from '@/lib/utils';

interface SidebarCardProps {
  className?: string;
  children: React.ReactNode;
}

const SidebarCard: React.FC<SidebarCardProps> = ({ className, children }) => {
  return (
    <div
      className={cn('bg-backgroundSecondary w-full p-4 rounded-lg', className)}
    >
      {children}
    </div>
  );
};

export default SidebarCard;
