'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    const logo = logoRef.current;
    const nav = navRef.current;
    if (!header || !logo || !nav) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -60',
        end: 'top -120',
        onUpdate: (self) => {
          if (self.progress > 0) {
            header.classList.add('shadow-md', 'backdrop-blur-md', 'bg-white/90');
          } else {
            header.classList.remove('shadow-md', 'backdrop-blur-md', 'bg-white/90');
          }
        },
      });
    }, header);

    return () => ctx.revert();
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
      className="sticky top-0 z-50 bg-white border-b border-gray-100/80 transition-all duration-300"
    >
      <div className="max-w-[90%] mx-auto px-6 h-28 flex justify-between items-center transition-all duration-300">
        <Link href="/" className="flex items-center">
          <div ref={logoRef} className="relative h-20 w-56 transition-all duration-300">
            <Image
              src="/images/logo.webp"
              alt="ASPIRE"
              fill
              className="object-contain object-left"
              priority
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
          <span className="block w-6 h-0.5 bg-gray-900 transition-transform duration-300" />
          <span className="block w-6 h-0.5 bg-gray-900 transition-transform duration-300" />
          <span className="block w-6 h-0.5 bg-gray-900 transition-transform duration-300" />
        </button>
      </div>

      <div
        ref={mobileMenuRef}
        className="lg:hidden absolute left-0 right-0 top-full bg-white border-b border-gray-100 shadow-lg z-40 flex-col px-6 py-4 space-y-1 overflow-y-auto"
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
