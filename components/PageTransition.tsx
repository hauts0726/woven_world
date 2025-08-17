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
  const disableForThisPath = typeof pathname === 'string' && pathname.startsWith('/events');

  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    if (!isTransitioning) {
      setIsVisible(true);
      setDisplayChildren(children);
    }
  }, [children, isTransitioning]);

  useEffect(() => {
    if (disableForThisPath) {
      setIsVisible(true);
      setIsTransitioning(false);
      setDisplayChildren(children);
      return;
    }

    if (isTransitioning) {
      setDisplayChildren(children);
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, children, isTransitioning, disableForThisPath]);

  const startTransition = () => {
    if (disableForThisPath) return;
    setIsTransitioning(true);
    setIsVisible(false);
  };

  if (disableForThisPath) {
    return (
      <PageTransitionContext.Provider value={{ isTransitioning: false, startTransition }}>
        {children}
      </PageTransitionContext.Provider>
    );
  }

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, startTransition }}>
      <div
        className={`transition-opacity duration-300 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ willChange: 'opacity' }}
      >
        {displayChildren}
      </div>
    </PageTransitionContext.Provider>
  );
}
