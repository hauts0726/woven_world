import chaptersData from '@/data/chapters.json';
import artistsData from '@/data/artists.json';
import ArtistCard from '@/components/ArtistCard';
import BackButton from '@/components/BackButton';
import KenmochiCarousel from '@/components/KenmochiCarousel';
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

export default async function ChapterDetail({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const chapterId = parseInt(id, 10);
  const chapter = chapters.find(ch => ch.id === chapterId);
  if (!chapter) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 pt-2 pb-6 sm:pb-8 container-responsive">
      <div className="mb-6 sm:mb-9">
        <BackButton />
      </div>
      <h1 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-sans font-bold mb-6 sm:mb-8 japanese-text break-words">{chapter.title}</h1>
      

      {/* Introduction */}
      {chapter.intro && chapter.intro.length > 0 && (
        <div className="mb-6 sm:mb-8">
          {chapter.intro.map((para: string, idx: number) => (
            <div 
              key={idx} 
              className="mb-4 sm:mb-6 text-gray-800 leading-relaxed japanese-text text-responsive-sm sm:text-responsive-base break-words"
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
        <div className="mb-8 sm:mb-12">
          <p className="text-gray-700 leading-relaxed japanese-text text-responsive-xs sm:text-responsive-sm break-words">
            {chapter.description}
          </p>
        </div>
      )}

      {/* Legacy content for backward compatibility */}
      {chapter.content && chapter.content.length > 0 && (
        <div className="mb-8 sm:mb-12">
          {chapter.content.map((para: string, idx: number) => (
            <p key={idx} className="mb-4 sm:mb-6 text-gray-800 leading-relaxed japanese-text text-responsive-sm sm:text-responsive-base break-words">
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
              <div key={idx} className="border-l-2 sm:border-l-4 border-gray-200 pl-4 sm:pl-8">
                {/* セクションタイトル */}
                {section.title && (
                  <h3 className="text-responsive-base sm:text-responsive-lg font-sans font-semibold mb-4 sm:mb-6 text-gray-800 japanese-text break-words">
                    {section.title}
                  </h3>
                )}

                {/* アーティストと作品の統合表示 */}
                {sectionArtists.length > 0 && (
                  <div className="responsive-grid-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
                    {sectionArtists.map((artist) => (
                      <Link key={artist.id} href={`/artists/${artist.id}`} className="group block">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                          {/* アーティスト作品画像 */}
                          <div className="aspect-[4/3] relative overflow-hidden responsive-image-container">
                            {artist.artworks && artist.artworks.length > 0 ? (
                              <Image
                                src={artist.artworks[0].image}
                                alt={`${artist.name}の作品`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="responsive-image object-cover transition-transform duration-300 group-hover:scale-105"
                                unoptimized={artist.artworks[0].image.startsWith('http')}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                            
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <div className="text-white text-center px-2 sm:px-4">
                                <p className="text-responsive-xs japanese-text break-words">{artist.name}のページを見る</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* アーティスト情報 */}
                          <div className="p-3 sm:p-4 lg:p-6">
                            <div className="flex items-center mb-3 sm:mb-4">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-200 mr-3 sm:mr-4 flex-shrink-0 responsive-image-container">
                                {artist.image ? (
                                  <Image
                                    src={artist.image}
                                    alt={artist.name}
                                    width={48}
                                    height={48}
                                    sizes="48px"
                                    className="responsive-image w-full h-full object-cover"
                                    unoptimized={artist.image.startsWith('http')}
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <h4 className="font-medium text-gray-800 japanese-text group-hover:text-gray-900 transition-colors text-responsive-xs sm:text-responsive-sm break-words">
                                {artist.name}
                              </h4>
                            </div>
                            
                            {/* 作品タイトル */}
                            {artist.artworks && artist.artworks[0] && (
                              <p className="text-responsive-xs text-gray-600 japanese-text break-words">
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
                      className="mb-3 sm:mb-4 text-gray-700 leading-relaxed japanese-text text-responsive-xs sm:text-responsive-sm break-words"
                      dangerouslySetInnerHTML={{ 
                        __html: para
                          .replace(/<em>/g, '<em class="italic">')
                          .replace(/<strong>/g, '<strong class="font-semibold">') 
                      }} 
                    />
                  ))}
                </div>

                {/* 釼持さん専用のカルーセル（第2章かつ釼持さんのセクションの場合） */}
                {chapterId === 2 && section.authorIds?.includes('kenmochi_hiroshi') && (
                  <div className="mt-12">
                    {(() => {
                      const kenmochiArtist = artists.find(a => a.id === 'kenmochi_hiroshi');
                      return kenmochiArtist ? <KenmochiCarousel artist={kenmochiArtist} /> : null;
                    })()}
                  </div>
                )}
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
