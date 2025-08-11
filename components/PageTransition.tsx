'use client';

import { ReactNode, useEffect, useState, createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionContextType {
  isTransitioning: boolean;
  startTransition: () => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  isTransitioning: false,
  startTransition: () => {},
});

export const usePageTransition = () => useContext(PageTransitionContext);

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // 初回ロード時は即座に表示
    if (!isTransitioning) {
      setIsVisible(true);
      setDisplayChildren(children);
    }
  }, [children, isTransitioning]);

  useEffect(() => {
    // ページが変わったときの処理
    if (isTransitioning) {
      // 新しいコンテンツを設定してからフェードイン
      setDisplayChildren(children);
      
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsTransitioning(false);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [pathname, children, isTransitioning]);

  const startTransition = () => {
    setIsTransitioning(true);
    setIsVisible(false);
  };

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, startTransition }}>
      <div
        className={`transition-all duration-[6000ms] ease-in-out ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}
      >
        {displayChildren}
      </div>
    </PageTransitionContext.Provider>
  );
}
