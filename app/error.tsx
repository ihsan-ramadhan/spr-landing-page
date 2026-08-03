'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorFallback({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h1 className="text-3xl md:text-5xl font-normal font-poppins mb-6">
        Something went wrong
      </h1>
      <p className="text-gray-500 max-w-md mb-10 leading-relaxed">
        An unexpected error occurred. Try again, or return home.
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="inline-flex px-6 py-3 bg-brand-black text-white text-sm font-normal tracking-wider uppercase hover:bg-brand-primary transition-all duration-300 rounded"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex px-6 py-3 border border-gray-300 text-sm font-normal tracking-wider uppercase hover:bg-gray-900 hover:text-white transition-all duration-300 rounded"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
