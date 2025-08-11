import chaptersData from '@/data/chapters.json';
import artistsData from '@/data/artists.json';
import ArtistCard from '@/components/ArtistCard';
import BackButton from '@/components/BackButton';
import { notFound } from 'next/navigation';
import { Chapter, Artist } from '@/types';
import Image from 'next/image';
import Link from 'next/link';


const chapters: Chapter[] = chaptersData as Chapter[];
const artists: Artist[] = artistsData as Artist[];

interface Params {
  id: string;
}

export async function generateStaticParams() {
  return chapters.map((ch: Chapter) => ({ id: ch.id.toString() }));
}

export default function ChapterDetail({ params }: { params: Params }) {
  const chapterId = parseInt(params.id, 10);
  const chapter = chapters.find(ch => ch.id === chapterId);
  if (!chapter) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-2 pb-8">
      <div className="mb-9">
        <BackButton />
      </div>
      <h1 className="text-3xl font-sans font-bold mb-8 japanese-text">{chapter.title}</h1>
      

      {/* Introduction */}
      {chapter.intro && chapter.intro.length > 0 && (
        <div className="mb-8">
          {chapter.intro.map((para: string, idx: number) => (
            <div 
              key={idx} 
              className="mb-6 text-gray-800 leading-relaxed japanese-text text-lg"
              dangerouslySetInnerHTML={{ 
                __html: para
                  .replace(/<em>/g, '<em class="italic">')
                  .replace(/<strong>/g, '<strong class="font-semibold">') 
              }} 
            />
          ))}
        </div>
      )}

      {/* Detailed Description */}
      {chapter.description && (
        <div className="mb-12">
          <p className="text-gray-700 leading-relaxed japanese-text text-base">
            {chapter.description}
          </p>
        </div>
      )}

      {/* Legacy content for backward compatibility */}
      {chapter.content && chapter.content.length > 0 && (
        <div className="mb-12">
          {chapter.content.map((para: string, idx: number) => (
            <p key={idx} className="mb-6 text-gray-800 leading-relaxed japanese-text text-lg">
              {para}
            </p>
          ))}
        </div>
      )}

      {/* Artist Sections - Integrated Display */}
      {chapter.sections && chapter.sections.length > 0 && (
        <div className="mb-12 space-y-16">
          {chapter.sections.map((section, idx) => {
            // セクションに関連するアーティストを取得
            const sectionArtists = section.authorIds?.map(authorId => 
              artists.find(a => a.id === authorId)
            ).filter((artist): artist is Artist => artist !== undefined) || [];

            return (
              <div key={idx} className="border-l-4 border-gray-200 pl-8">
                {/* セクションタイトル */}
                {section.title && (
                  <h3 className="text-xl font-sans font-semibold mb-6 text-gray-800 japanese-text">
                    {section.title}
                  </h3>
                )}

                {/* アーティストと作品の統合表示 */}
                {sectionArtists.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {sectionArtists.map((artist) => (
                      <Link key={artist.id} href={`/artists/${artist.id}`} className="group block">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                          {/* アーティスト作品画像 */}
                          <div className="aspect-[4/3] relative overflow-hidden">
                            {artist.artworks && artist.artworks.length > 0 ? (
                              <Image
                                src={artist.artworks[0].image}
                                alt={`${artist.name}の作品`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                            
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <div className="text-white text-center px-4">
                                <p className="text-sm japanese-text">{artist.name}のページを見る</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* アーティスト情報 */}
                          <div className="p-6">
                            <div className="flex items-center mb-4">
                              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4 flex-shrink-0">
                                {artist.image ? (
                                  <Image
                                    src={artist.image}
                                    alt={artist.name}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <h4 className="font-medium text-gray-800 japanese-text group-hover:text-gray-900 transition-colors">
                                {artist.name}
                              </h4>
                            </div>
                            
                            {/* 作品タイトル */}
                            {artist.artworks && artist.artworks[0] && (
                              <p className="text-sm text-gray-600 japanese-text">
                                {artist.artworks[0].title}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* セクション内容 */}
                <div className="prose prose-gray max-w-none">
                  {section.content.map((para: string, paraIdx: number) => (
                    <div 
                      key={paraIdx} 
                      className="mb-4 text-gray-700 leading-relaxed japanese-text text-base"
                      dangerouslySetInnerHTML={{ 
                        __html: para
                          .replace(/<em>/g, '<em class="italic">')
                          .replace(/<strong>/g, '<strong class="font-semibold">') 
                      }} 
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Chapter Statistics */}
      {(chapter.sections || chapter.artists) && (
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-center space-x-12 text-center">
            {chapter.sections && (
              <div>
                <div className="text-2xl font-bold text-gray-800 japanese-text">
                  {chapter.sections.length}つのセクション
                </div>
              </div>
            )}
            {chapter.artists && (
              <div>
                <div className="text-2xl font-bold text-gray-800 japanese-text">
                  参加作家（{chapter.artists.length}名）
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
