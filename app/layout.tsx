import type { Metadata } from 'next';
import { Poppins, Manrope } from 'next/font/google';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
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
  return (
    <html lang="en" className={`${poppins.variable} ${manrope.variable}`}>
      <body className="flex flex-col min-h-screen font-manrope text-foreground bg-background">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
