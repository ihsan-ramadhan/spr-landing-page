'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'What we do', href: '/whatwedo' },
  { label: 'Governance', href: '/governance' },
  { label: 'Careers', href: '/careers' },
  { label: 'Investors', href: '/investors' }
];

export default function Navbar() {
  const pathname = usePathname();

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
        <nav className="hidden md:flex items-center space-x-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-5 py-2.5 text-sm font-normal transition-colors duration-300 group ${
                  isActive ? 'text-brand-primary' : 'text-gray-600 hover:text-brand-primary'
                }`}
              >
                <span>{item.label}</span>
                <span 
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-brand-primary transition-all duration-300 origin-center ${
                    isActive ? 'w-5 scale-x-100 opacity-100' : 'w-0 scale-x-0 opacity-0 group-hover:w-5 group-hover:scale-x-100 group-hover:opacity-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
