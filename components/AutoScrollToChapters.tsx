"use client";

import { useEffect, useRef, useState } from 'react';

interface AutoScrollToChaptersProps {
  children: React.ReactNode;
}

export default function AutoScrollToChapters({ children }: AutoScrollToChaptersProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAutoScrolled) {
            // Welcome文セクションが表示されたら、少し遅延してから「各章の紹介」に自動スクロール
            setTimeout(() => {
              const chaptersSection = document.getElementById('chapters');
              if (chaptersSection && !hasAutoScrolled) {
                chaptersSection.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
                setHasAutoScrolled(true);
              }
            }, 1500); // 1.5秒後に自動スクロール
            
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.8, // Welcome文の80%が見えたらトリガー
        rootMargin: '0px 0px -100px 0px' // 下から100px余裕を持たせる
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasAutoScrolled]);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}
