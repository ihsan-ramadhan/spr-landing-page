import type { Metadata } from 'next';
import { Poppins, Manrope } from 'next/font/google';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { getSiteConfig } from '../lib/content';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'ASPIRE',
  description: 'Our pure and renewable journey together.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = getSiteConfig();

  return (
    <html lang="en" className={`${poppins.variable} ${manrope.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="https://images.squarespace-cdn.com/content/v1/61cdb78e5104297f40ace0af/15b28ac8-11d0-43bb-99d0-049c742f9c3c/2C836F76-D7A1-4316-BAD9-C104FA227A5B.JPG?format=1500w"
          fetchPriority="high"
        />
      </head>
      <body className="flex flex-col min-h-screen font-manrope text-foreground bg-background">
        <Navbar />
        <main className="grow">{children}</main>
        <Footer
          name={config.name}
          address={config.address}
          email={config.email}
          social={config.social}
          legalName={config.legalName}
        />
      </body>
    </html>
  );
}
