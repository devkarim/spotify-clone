'use client';

import React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  solid?: boolean;
  error?: string;
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
        <div className="relative w-full">
          <input
            className={cn(
              'focus:border-white/60 transition-colors',
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
              className
            )}
            ref={ref}
            {...props}
          />
          <span className="absolute right-5 top-3">{right}</span>
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
