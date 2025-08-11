import TransitionLink from './TransitionLink';
import { Chapter } from '@/types';
import Image from 'next/image';

interface ChapterCardProps {
  chapter: Chapter;
}

export default function ChapterCard({ chapter }: ChapterCardProps) {
  // Get description from either description field or first intro paragraph
  const getDescription = (isMobile = false) => {
    if (chapter.description) {
      return isMobile && chapter.description.length > 100 
        ? chapter.description.substring(0, 100) + '...' 
        : chapter.description;
    }
    if (chapter.intro && chapter.intro.length > 0) {
      // Remove HTML tags and truncate for preview
      const plainText = chapter.intro[0].replace(/<[^>]*>/g, '');
      const maxLength = isMobile ? 100 : 200;
      return plainText.length > maxLength ? plainText.substring(0, maxLength) + '...' : plainText;
    }
    return '';
  };

  return (
    <TransitionLink href={`/chapters/${chapter.id}`} className="group">
      <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        {/* Chapter Image */}
        {chapter.image && (
          <div className="relative w-full h-48 md:h-64 bg-gradient-to-br from-emerald-100 to-teal-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📚</div>
                <div className="text-sm text-gray-600 font-medium">Chapter {chapter.id}</div>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-3 md:p-6">
          <h2 className="text-lg md:text-2xl font-sans font-semibold group-hover:underline mb-2 md:mb-3 japanese-text leading-tight">{chapter.title}</h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed japanese-text line-clamp-3 md:line-clamp-none">{getDescription()}</p>
          
          {/* Show section count if available */}
          {chapter.sections && chapter.sections.length > 0 && (
            <div className="mt-2 md:mt-3 text-xs md:text-sm text-gray-500 japanese-text">
              {chapter.sections.length}つのセクション
            </div>
          )}
        </div>
      </div>
    </TransitionLink>
  );
}
