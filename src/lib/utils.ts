import Errors from '@/config/errors';

import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capatlize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toBigInt(str: string) {
  try {
    return BigInt(str);
  } catch (err) {
    throw Errors.invalidId;
  }
}

export function toBigIntSafe(str: string) {
  try {
    return BigInt(str);
  } catch (err) {
    return null;
  }
}
