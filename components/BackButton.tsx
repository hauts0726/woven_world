'use client';

import { useRouter } from 'next/navigation';

interface BackButtonProps {
  className?: string;
}

export default function BackButton({ className = '' }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button 
      onClick={handleBack}
      className={`fixed top-20 left-4 z-50 inline-flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white/90 transition-all duration-200 text-gray-700 hover:text-gray-900 font-medium japanese-text group shadow-lg ${className}`}
    >
      <svg 
        className="w-4 h-4 transition-transform group-hover:-translate-x-1" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M10 19l-7-7m0 0l7-7m-7 7h18" 
        />
      </svg>
      前の画面に戻る
    </button>
  );
}
