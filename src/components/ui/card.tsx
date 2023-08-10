import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div className={cn('bg-card p-4 rounded-lg', className)}>{children}</div>
  );
};

export default Card;
