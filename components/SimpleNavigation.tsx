'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function SimpleNavigation() {
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
          const headerHeight = 80;
          const elementTop = element.offsetTop;
          window.scrollTo({
            top: elementTop - headerHeight,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const navLinkClass = "px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200 font-medium";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/" className="text-xl font-serif font-bold text-gray-900 hover:text-gray-700 transition-colors">
            Clothing and Our Future
          </Link>

          {/* ナビゲーションメニュー */}
          <nav className="hidden md:flex items-center space-x-1">
            {isHomePage ? (
              <button 
                onClick={() => handleSmoothScroll('top')} 
                className={navLinkClass}
              >
                TOP
              </button>
            ) : (
              <Link href="/" className={navLinkClass}>
                TOP
              </Link>
            )}
            
            {isHomePage ? (
              <button 
                onClick={() => handleSmoothScroll('chapters')} 
                className={navLinkClass}
              >
                Chapters
              </button>
            ) : (
              <Link href="/chapters" className={navLinkClass}>
                Chapters
              </Link>
            )}
            
            {isHomePage ? (
              <button 
                onClick={() => handleSmoothScroll('events')} 
                className={navLinkClass}
              >
                Events
              </button>
            ) : (
              <Link href="/events" className={navLinkClass}>
                Events
              </Link>
            )}
            
            <a 
              href="https://note.com/woven_world" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={navLinkClass}
            >
              Articles
            </a>
            
            <a 
              href="https://open.spotify.com/show/3pXhDNK8sLEKr6wKlFZGRN" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={navLinkClass}
            >
              Podcast
            </a>
            
            <Link href="/contact" className={navLinkClass}>
              Contact
            </Link>
          </nav>

          {/* モバイルメニューボタン */}
          <div className="md:hidden">
            <MobileMenu isHomePage={isHomePage} handleSmoothScroll={handleSmoothScroll} />
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ isHomePage, handleSmoothScroll }: { isHomePage: boolean, handleSmoothScroll: (sectionId: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 left-0 bg-white border-b border-gray-200 shadow-lg md:hidden">
          <div className="px-4 py-2 space-y-1">
            {isHomePage ? (
              <button 
                onClick={() => {
                  handleSmoothScroll('top');
                  setIsOpen(false);
                }} 
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                TOP
              </button>
            ) : (
              <Link 
                href="/" 
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                TOP
              </Link>
            )}
            
            {isHomePage ? (
              <button 
                onClick={() => {
                  handleSmoothScroll('chapters');
                  setIsOpen(false);
                }} 
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                Chapters
              </button>
            ) : (
              <Link 
                href="/chapters" 
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Chapters
              </Link>
            )}
            
            {isHomePage ? (
              <button 
                onClick={() => {
                  handleSmoothScroll('events');
                  setIsOpen(false);
                }} 
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                Events
              </button>
            ) : (
              <Link 
                href="/events" 
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Events
              </Link>
            )}
            
            <a 
              href="https://note.com/woven_world" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Articles
            </a>
            
            <a 
              href="https://open.spotify.com/show/3pXhDNK8sLEKr6wKlFZGRN" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Podcast
            </a>
            
            <Link 
              href="/contact" 
              className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
