import { cn } from '@/lib/utils';

interface SpinnerRingProps {
  className?: string;
}

const SpinnerRing: React.FC<SpinnerRingProps> = ({ className }) => {
  return (
    <svg
      className={cn('spinner-ring spinner-secondary', className)}
      viewBox="25 25 50 50"
      strokeWidth="5"
    >
      <circle cx="50" cy="50" r="20" />
    </svg>
  );
};

export default SpinnerRing;
