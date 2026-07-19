import Link from 'next/link';
import Image from 'next/image';
import { getSiteConfig } from '../../lib/content';

export default function Navbar() {
  const config = getSiteConfig();
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[90%] mx-auto px-6 h-28 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="relative h-20 w-56">
            <Image
              src="/images/logo.webp"
              alt="ASPIRE"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>
        <nav className="hidden md:flex space-x-8">
          {config.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-normal text-gray-700 hover:text-brand-primary transition">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
