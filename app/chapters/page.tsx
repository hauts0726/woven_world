import chaptersData from '@/data/chapters.json';
import artistsData from '@/data/artists.json';
import { Chapter, Artist } from '@/types';
import ScrollReveal from '@/components/ScrollReveal';
import ChapterSummary from '@/components/ChapterSummary';

const chapters: Chapter[] = chaptersData as Chapter[];
const artists: Artist[] = artistsData as Artist[];

export default function ChaptersPage() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-sans font-bold mb-8 text-center japanese-text">各章の紹介</h1>
      
      <div className="space-y-16">
        {chapters.map((chapter) => (
          <ScrollReveal key={chapter.id} delay={chapter.id * 150}>
            <ChapterSummary chapter={chapter} artists={artists} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
