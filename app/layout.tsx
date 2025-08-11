import './globals.css';
import { ReactNode } from 'react';
import SimpleNavigation from '@/components/SimpleNavigation';
import Footer from '@/components/Footer';
import SimpleTopButton from '@/components/SimpleTopButton';
import ChapterSummary from '@/components/ChapterSummary';
import { Noto_Serif_JP } from 'next/font/google';
import { Zen_Kaku_Gothic_New } from 'next/font/google';

const notoSerif = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
});

const zenGothic = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-zen-gothic',
  display: 'swap',
});

export const metadata = {
  title: 'Clothing and Our Future: Japanese Art & Textiles Exhibition',
  description: 'Explore Japanese textile art from traditional craftsmanship to contemporary installations.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`bg-white text-gray-900 ${notoSerif.variable} ${zenGothic.variable} font-serif`}
      >
        <SimpleNavigation />
        <ChapterSummary />
        <main className="w-full [&:has(.events-page)]:pt-0 [&:has(.events-page)]:pb-0 [&:has(.event-detail)]:pb-0 [&:has(.home-page)]:pt-0">{children}</main>
        <Footer />
        <SimpleTopButton />
      </body>
    </html>
  );
}
