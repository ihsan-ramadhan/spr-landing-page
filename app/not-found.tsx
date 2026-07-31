import Link from 'next/link';
import { DEFAULT_LOCALE } from '../lib/content';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <p className="text-xs font-normal uppercase tracking-[0.2em] text-brand-primary mb-4 font-poppins">
        404
      </p>
      <h1 className="text-3xl md:text-5xl font-normal font-poppins mb-6">
        Page not found
      </h1>
      <p className="text-gray-500 max-w-md mb-10 leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href={`/${DEFAULT_LOCALE}`}
        className="inline-flex px-6 py-3 border border-gray-300 text-sm font-normal tracking-wider uppercase hover:bg-gray-900 hover:text-white transition-all duration-300 rounded"
      >
        Back to home
      </Link>
    </div>
  );
}
