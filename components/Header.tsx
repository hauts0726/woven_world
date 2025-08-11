'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TransitionLink from './TransitionLink';

const navLinkClass = "mx-2 hover:underline hover:text-neutral-900 transition-colors cursor-pointer";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const handleSmoothScroll = (sectionId: string) => {
    if (isHomePage) {
      if (sectionId === 'top') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else if (sectionId === 'chapters') {
        // "各章の紹介"セクションを探す
        const chaptersSection = document.getElementById('chapters');
        if (chaptersSection) {
          // セクション内の「各章の紹介」タイトルを探す
          const titleElement = chaptersSection.querySelector('.text-3xl');
          if (titleElement) {
            const elementTop = titleElement.getBoundingClientRect().top + window.scrollY;
            const headerHeight = 80;
            window.scrollTo({
              top: elementTop - headerHeight,
              behavior: 'smooth'
            });
          } else {
            // タイトルが見つからない場合はセクション自体にスクロール
            const elementTop = chaptersSection.getBoundingClientRect().top + window.scrollY;
            const headerHeight = 80;
            window.scrollTo({
              top: elementTop - headerHeight,
              behavior: 'smooth'
            });
          }
        }
      } else if (sectionId === 'events') {
        // "トークイベント・ワークショップ"のh3要素を探す
        const eventsTitle = document.getElementById('events-title');
        if (eventsTitle) {
          const elementTop = eventsTitle.getBoundingClientRect().top + window.scrollY;
          const headerHeight = 80;
          window.scrollTo({
            top: elementTop - headerHeight,
            behavior: 'smooth'
          });
        }
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementTop = element.getBoundingClientRect().top + window.scrollY;
          const headerHeight = 80;
          window.scrollTo({
            top: elementTop - headerHeight,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  return (
    <header className="border-b border-gray-200">
      <div className="w-full px-6 py-4 flex items-center justify-between">
        <TransitionLink href="/" className="text-2xl font-serif font-bold">
          Clothing and Our Future
        </TransitionLink>
        <nav className="font-sans text-gray-800">
          {isHomePage ? (
            <button 
              onClick={() => handleSmoothScroll('top')} 
              className={navLinkClass}
            >
              TOP
            </button>
          ) : (
            <TransitionLink href="/" className={navLinkClass}>
              TOP
            </TransitionLink>
          )}
          
          {isHomePage ? (
            <button 
              onClick={() => handleSmoothScroll('chapters')} 
              className={navLinkClass}
            >
              Chapters
            </button>
          ) : (
            <TransitionLink href="/chapters" className={navLinkClass}>
              Chapters
            </TransitionLink>
          )}
          
          {isHomePage ? (
            <button 
              onClick={() => handleSmoothScroll('events')} 
              className={navLinkClass}
            >
              Events
            </button>
          ) : (
            <TransitionLink href="/events" className={navLinkClass}>
              Events
            </TransitionLink>
          )}
          
          <a 
            href="https://note.com/woven_world" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={navLinkClass}
          >
            note
          </a>
          
          <a 
            href="https://open.spotify.com/show/3pXhDNK8sLEKr6wKlFZGRN" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={navLinkClass}
          >
            podcast
          </a>
          
          <TransitionLink href="/contact" className={navLinkClass}>
            Contact
          </TransitionLink>
        </nav>
      </div>
    </header>
  );
}
