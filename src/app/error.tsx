'use client';

import Response from '@/types/server';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex mt-32 justify-center items-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl">{Response.parseError(error)}</h2>
        <button className="btn btn-secondary" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </div>
  );
}
