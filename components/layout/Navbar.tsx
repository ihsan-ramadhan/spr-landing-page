'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

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
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;

      if (currentScrollY <= 50 || !scrollingDown) {
        header.classList.remove('-translate-y-full');
      } else if (currentScrollY > 50 && scrollingDown) {
        header.classList.add('-translate-y-full');
        setMenuOpen(false);
      }

      if (currentScrollY < 60) {
        header.classList.remove('shadow-md');
      } else {
        header.classList.add('shadow-md');
      }

      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (menuOpen) {
      gsap.set(menu, { display: 'flex' });
      gsap.fromTo(
        menu,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
      );
      const links = menu.querySelectorAll('a');
      gsap.fromTo(
        links,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out', delay: 0.1 },
      );
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => gsap.set(menu, { display: 'none' }),
      });
    }

    return () => {
      gsap.killTweensOf(menu);
      gsap.killTweensOf(menu.querySelectorAll('a'));
    };
  }, [menuOpen]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white border-b border-gray-100/80 transition-transform duration-300 ease-in-out will-change-transform"
    >
      <div className="max-w-[90%] mx-auto px-6 h-28 flex justify-between items-center transition-all duration-300">
        <Link href="/" className="flex items-center">
          <div ref={logoRef} className="relative h-20 w-56 transition-all duration-300">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/61cdb78e5104297f40ace0af/58364340-731c-42e0-a3fb-ed0ca425b6e4/Logo+Member+of+Astra.png"
              alt="ASPIRE"
              fill
              className="object-contain object-left"
              priority
              sizes="(max-width: 768px) 224px, 224px"
            />
          </div>
        </Link>
        <nav ref={navRef} className="hidden lg:flex items-center space-x-2">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 lg:px-5 py-2.5 text-sm font-normal transition-colors duration-300 group ${
                  isActive
                    ? 'text-brand-primary'
                    : 'text-gray-600 hover:text-brand-primary'
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-brand-primary transition-all duration-300 origin-center ${
                    isActive
                      ? 'w-5 scale-x-100 opacity-100'
                      : 'w-0 scale-x-0 opacity-0 group-hover:w-5 group-hover:scale-x-100 group-hover:opacity-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-0.5 bg-gray-900 transition-transform duration-300 origin-center ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-900 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block w-6 h-0.5 bg-gray-900 transition-transform duration-300 origin-center ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      <div
        ref={mobileMenuRef}
        className="lg:hidden absolute left-0 right-0 top-full bg-white border-b border-gray-100 shadow-lg z-40 flex flex-col px-6 py-4 space-y-1 overflow-y-auto"
        style={{ display: 'none' }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`block py-2.5 px-4 text-sm font-normal rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'text-brand-primary bg-brand-primary/5'
                  : 'text-gray-700 hover:text-brand-primary hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
