'use client';

export default function TopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-8 z-[1000] w-12 h-12 rounded-full backdrop-blur-md transition-all duration-300 flex items-center justify-center group shadow-lg bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 border border-white/80 hover:shadow-xl"
      aria-label="TOPに戻る"
      title="TOPに戻る"
      style={{ position: 'fixed' }} // 念押し（特異性で負けないように）
    >
      <svg
        className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
