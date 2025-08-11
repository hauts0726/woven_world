"use client";

interface ChapterAutoScrollProps {
  children: React.ReactNode;
  chapterId: number;
}

export default function ChapterAutoScroll({ 
  children, 
  chapterId 
}: ChapterAutoScrollProps) {
  return (
    <div 
      data-chapter-id={chapterId}
      className="min-h-screen flex items-start justify-center py-16"
      style={{
        paddingTop: '120px'
      }}
    >
      {children}
    </div>
  );
}
