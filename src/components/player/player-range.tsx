'use client';

import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface PlayerRangeProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: number;
  setValue: (value: number) => void;
  onChangeStart?: () => void;
  onChangeDone?: (value: number) => void;
}

const PlayerRange: React.FC<PlayerRangeProps> = ({
  value,
  className,
  onChangeStart,
  onChangeDone,
  setValue,
  ...props
}) => {
  return (
    <input
      type="range"
      className={cn(
        'range range-secondary hover:range-primary w-full [&::-webkit-slider-thumb]:hover:bg-primary',
        className
      )}
      value={value}
      onChange={(e) => {
        onChangeStart?.();
        setValue(+e.target.value);
      }}
      onMouseUp={() => onChangeDone?.(value)}
      {...props}
    />
  );
};

export default PlayerRange;
