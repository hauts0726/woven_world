'use client';

import { useState, useEffect } from 'react';
import chapters from '@/data/chapters.json';
import { Chapter } from '@/types';

export default function SimpleNavButtons() {
  const [mounted, setMounted] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // ナビゲーション対象のセクション定義
  const sections = [
    { id: 'top', name: 'TOP' },
    { id: 'intro', name: 'はじめに' },
    ...((chapters as Chapter[]).map((chapter) => ({
      id: `chapter-${chapter.id}`,
      name: `第${chapter.id}章`,
    }))),
    { id: 'events', name: 'トークイベント・ワークショップ' },
  ];

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);

      let foundIndex = 0;
      for (let i = 0; i < sections.length; i++) {
        const id = sections[i].id === 'events' ? 'events-title' : sections[i].id;
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          if (scrollY + window.innerHeight / 2 >= elementTop) {
            foundIndex = i;
          }
        }
      }

      setCurrentSectionIndex(foundIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // セクション先頭を画面最上部にスクロール表示
  const scrollToSection = (index: number) => {
    if (index < 0 || index >= sections.length) return;

    const section = sections[index];

    const element =
      section.id === 'events'
        ? document.getElementById('events-title')
        : document.getElementById(section.id);

    if (!element) {
      console.warn(`要素が見つかりません: ${section.id}`);
      return;
    }

    const rect = element.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;

    const offset = section.id === 'events' ? -100 :40;

    window.scrollTo({
      top: absoluteTop + offset,
      behavior: 'smooth',
    });
  };

  // ✅ トークイベント以降はページ末尾にスクロール
  const goToNextSection = () => {
    const nextIndex = currentSectionIndex + 1;
    const isAtEvent = sections[currentSectionIndex]?.id === 'events';

    if (isAtEvent) {
      // レンダリングが落ち着いてから末尾にスクロール
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        }, 200); // 必要に応じて遅延調整
      });
      return;
    }

    if (nextIndex < sections.length) {
      scrollToSection(nextIndex);
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-40">
      <button
        onClick={goToNextSection}
        className="w-12 h-12 rounded-full backdrop-blur-md transition-all duration-900 flex items-center justify-center group bg-white/70 hover:bg-white/80 text-gray-700 hover:text-gray-900 border border-white/70 hover:border-white/80 shadow-lg hover:shadow-lg"
        title="次のセクションへ"
      >
        <svg
          className="w-5 h-5 transition-transform duration-700 group-hover:translate-y-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}
