'use client';

import { useMemo, useCallback } from 'react';
import chapters from '@/data/chapters.json';
import { Chapter } from '@/types';

export default function SimpleNavButtons() {
  const sections = useMemo(
    () => [
      { id: 'top', name: 'TOP' },
      { id: 'intro', name: 'はじめに' },
      ...((chapters as Chapter[]).map((c) => ({ id: `chapter-${c.id}`, name: `第${c.id}章` })) as { id: string; name: string }[]),
      { id: 'events', name: 'トークイベント・ワークショップ' },
    ],
    []
  );

  const getCurrentIndex = useCallback(() => {
    const scrollY = window.scrollY;
    let found = 0;
    for (let i = 0; i < sections.length; i++) {
      const id = sections[i].id === 'events' ? 'events-title' : sections[i].id;
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (scrollY + window.innerHeight / 2 >= top) found = i;
    }
    return found;
  }, [sections]);

  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= sections.length) return;
    const s = sections[index];
    const target = s.id === 'events' ? document.getElementById('events-title') : document.getElementById(s.id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY;
    const offset = s.id === 'events' ? -100 : 5;
    window.scrollTo({ top: top + offset, behavior: 'smooth' });
  }, [sections]);

  const goToNextSection = useCallback(() => {
    const i = getCurrentIndex();
    const next = i + 1;
    const atEvent = sections[i]?.id === 'events';
    if (atEvent) {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      return;
    }
    if (next < sections.length) scrollToSection(next);
  }, [getCurrentIndex, scrollToSection, sections]);

  // ← これが“追従”。position: fixed を viewport に対して適用
  return (
    <div
      className="fixed z-[1000] pointer-events-auto"
      style={{ left: '50%', bottom: '20px', transform: 'translateX(-50%)', WebkitTransform: 'translateX(-50%)', position: 'fixed' }}
    >
      <button
        onClick={goToNextSection}
        className="w-12 h-12 rounded-full backdrop-blur-md transition-all duration-300 flex items-center justify-center group bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 border border-white/70 shadow-lg"
        aria-label="次のセクションへ"
        title="次のセクションへ"
      >
        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}
