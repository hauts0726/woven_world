"use client";

import { useEffect, useRef } from 'react';

export default function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
          entry.target.classList.remove('opacity-0');
          entry.target.classList.remove('translate-y-[10px]');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="opacity-0 translate-y-[10px]">
      {children}
    </div>
  );
}
