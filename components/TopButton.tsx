'use client';

import { useState, useEffect } from 'react';

export default function TopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 ease-in-out rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl z-50 group"
          aria-label="トップに戻る"
        >
          <div className="flex flex-col items-center">
            <svg 
              className="w-5 h-5 mb-0.5 transform group-hover:-translate-y-0.5 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span className="text-xs font-medium japanese-text leading-none">Top</span>
          </div>
        </button>
      )}
    </>
  );
}
