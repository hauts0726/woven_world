"use client";

import { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
}

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  threshold = 0.1 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
              // Add visible class to chapter titles for CSS animations
              const chapterTitle = element.querySelector('.chapter-title');
              if (chapterTitle) {
                chapterTitle.classList.add('visible');
              }
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold,
        rootMargin: '-80px 0px -80px 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay, threshold]);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1200 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
      }`}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}
