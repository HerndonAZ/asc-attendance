'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center gap-4">
      <h2>Something went wrong!</h2>
      <button className="rounded-md border px-4 py-2" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
