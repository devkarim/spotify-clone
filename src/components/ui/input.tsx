'use client';

import React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  solid?: boolean;
  error?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  parentClassName?: string;
  full?: boolean;
  file?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className,
      left,
      right,
      solid = false,
      parentClassName,
      full,
      file,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          'w-full max-w-sm space-y-1',
          { 'max-w-none': full },
          parentClassName
        )}
      >
        {label && (
          <label className="mb-2">
            <span className="ml-1 text-sm sm:text-base font-medium opacity-60">
              {label}
            </span>
          </label>
        )}
        <div className="group relative w-full">
          <input
            className={cn(
              'focus:border-white/80 transition-colors peer',
              {
                input: !file,
              },
              {
                'input-file': file,
              },
              {
                'input-error focus:border-error': !!error,
              },
              {
                'input-solid': solid,
              },
              {
                'input-block': full,
              },
              {
                'pl-10': !!left,
              },
              className
            )}
            ref={ref}
            {...props}
          />
          <span className="absolute left-4 top-1/3 opacity-40 peer-focus:opacity-100 transition-opacity">
            {left}
          </span>
          <span className="absolute right-5 top-3 opacity-40 peer-focus:opacity-100 transition-opacity">
            {right}
          </span>
        </div>
        {error && (
          <label className="absolute label">
            <span className="label-text-alt text-error font-medium">
              {error}
            </span>
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
