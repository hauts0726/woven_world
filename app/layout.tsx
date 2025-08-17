import './globals.css';
import { ReactNode } from 'react';
import SimpleNavigation from '@/components/SimpleNavigation';
import Footer from '@/components/Footer';
import SimpleTopButton from '@/components/SimpleTopButton'; // 右下TOPボタン（グローバル1回）
import ChapterSummary from '@/components/ChapterSummary';
import PageTransition from '@/components/PageTransition';
import FixedNavClient from '@/components/FixedNavClient';   // ★ Home でだけ SimpleNavButtons を出す
import { Inter, Shippori_Mincho } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-inter', display: 'swap' });
const shipporiMincho = Shippori_Mincho({ subsets: ['latin','latin-ext'], weight: ['400','500','600','700','800'], variable: '--font-shippori-mincho', display: 'swap' });

export const metadata = {
  title: 'Clothing and Our Future: Japanese Art & Textiles Exhibition',
  description: 'Explore Japanese textile art from traditional craftsmanship to contemporary installations.',
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 5, userScalable: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`bg-white text-gray-900 ${inter.variable} ${shipporiMincho.variable}`}>
        {/* 固定ではない UI は内側でもOK */}
        <SimpleNavigation />
        <ChapterSummary />

        {/* ここは transform がかかる層。固定UIは入れない */}
        <PageTransition>
          <main className="w-full [&:has(.events-page)]:pt-0 [&:has(.events-page)]:pb-0 [&:has(.event-detail)]:pb-0 [&:has(.home-page)]:pt-0">
            {children}
          </main>
          <Footer />
        </PageTransition>

        {/* ★ 固定UIは外に“1回だけ”置く → fixed がビューポート基準で効く */}
        <SimpleTopButton />
        <FixedNavClient /> {/* Home（/）でだけ中央下の SimpleNavButtons を表示 */}
      </body>
    </html>
  );
}
