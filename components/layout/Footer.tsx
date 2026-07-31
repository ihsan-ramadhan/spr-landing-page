'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { UIStrings, Locale } from '../../lib/content';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  name: string;
  address: string;
  email: string;
  social: { instagram: string; facebook: string; twitter: string };
  legalName: string;
  ui: UIStrings;
  locale: Locale;
}

export default function Footer({ name, address, email, social, legalName, ui, locale }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const columns = footer.querySelectorAll('.footer-col');
      const bottom = footer.querySelector('.footer-bottom');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          once: true,
        },
      });

      tl.fromTo(
        columns,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
        },
      );

      if (bottom) {
        tl.fromTo(
          bottom,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out'
          },
        );
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-brand-dark text-white py-16 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="footer-col">
          <h4 className="font-poppins text-lg font-bold mb-4">{name} Stargate</h4>
          <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{address}</p>
          <a href={`mailto:${email}`} className="text-sm text-gray-400 mt-2 no-underline hover:text-white transition-colors">
            {email}
          </a>
        </div>

        <div className="footer-col">
          <h4 className="font-poppins text-lg font-bold mb-4">{ui.footer.siteMap}</h4>
          <div className="flex flex-col space-y-2 text-sm text-gray-400">
            <Link href={`/${locale}/about`} className="hover:text-white transition-colors">
              {ui.footer.aboutLink}
            </Link>
            <Link href={`/${locale}/careers`} className="hover:text-white transition-colors">
              {ui.footer.getInvolved}
            </Link>
            {ui.about.externalUrl && ui.about.externalUrl !== '#' && (
              <a
                href={ui.about.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {ui.about.storiesHeading}
              </a>
            )}
          </div>
        </div>

        <div className="footer-col">
          <h4 className="font-poppins text-lg font-bold mb-4">{ui.footer.socialLinks}</h4>
          <div className="flex flex-col space-y-2 text-sm text-gray-400">
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Facebook
            </a>
            <a
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom max-w-7xl mx-auto border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} {legalName}. {ui.footer.rights}</p>
      </div>
    </footer>
  );
}
