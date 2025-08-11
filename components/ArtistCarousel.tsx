'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Artist } from '@/types';

interface ArtistCarouselProps {
  artists: Artist[];
  chapterId: number;
}

export default function ArtistCarousel({ artists, chapterId }: ArtistCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3; // 3列表示を維持
  
  // 指定された順序でアーティストを並び替え
  const orderedArtistIds = ['suzuki_yuta', 'tange_megumi', 'noguchi-kirara', 'sumiya-yukiko', 'umida-halilova'];
  const orderedArtists = orderedArtistIds
    .map(id => artists.find(artist => artist.id === id))
    .filter(artist => artist !== undefined) as Artist[];
  
  // 順序指定されていないアーティストを追加
  const remainingArtists = artists.filter(artist => !orderedArtistIds.includes(artist.id));
  const finalArtists = [...orderedArtists, ...remainingArtists];
  
  const totalItems = finalArtists.length;

  const nextPage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const prevPage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const goToPage = (index: number) => {
    setCurrentIndex(index);
  };

  if (finalArtists.length === 0) return null;

  // 現在のインデックスから3つのアーティストを取得（循環表示）
  const currentArtists = [];
  for (let i = 0; i < itemsPerPage; i++) {
    const artistIndex = (currentIndex + i) % totalItems;
    currentArtists.push(finalArtists[artistIndex]);
  }

  // 作家の代表作品を使用
  const topAlignedIds = ['kuramochi-michiyo', 'sumiya-yukiko', 'suzuki_yuta'];

  return (
    <div className="mb-8 max-w-6xl mx-auto">
      <div className="relative">
        {/* 3列グリッドレイアウト（既存のスタイルを維持） */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 transition-all duration-500 ease-in-out">
          {currentArtists.map((artist, index) => {
            const representativeArtwork = artist.artworks?.[0];
            
            return (
              <div key={artist.id} className="group block relative">
                <div 
                  className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:scale-[1.02]"
                  style={{
                    animationDelay: `${index * 200}ms`,
                  }}
                >
                  {/* メイン作品画像 */}
                  <div className="aspect-[3/4] relative overflow-hidden">
                    {representativeArtwork ? (
                      <Image 
                        src={representativeArtwork.image} 
                        alt={representativeArtwork.title}
                        fill
                        quality={100}
                        className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                          topAlignedIds.includes(artist.id) ? 'object-top' : 'object-center'
                        }`}
                        unoptimized={representativeArtwork.image.startsWith('http')}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    
                    {/* グラデーションオーバーレイ */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="text-white text-center px-4">
                        <p className="text-sm japanese-text">{artist.name}のページを見る</p>
                      </div>
                    </div>
                  </div>

                  {/* 作家プロフィール画像を強調したオーバーレイ - ミニマルな色彩 */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* 背景オーバーレイ - 透明度を加えた美しい色 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-800/40 to-transparent rounded-b-2xl"></div>
                    
                    <div className="relative flex items-end space-x-6">
                      {/* 顔写真エリア - 左下に配置、文字とのバランス調整 */}
                      <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/80 shadow-lg backdrop-blur-sm flex-shrink-0 mb-2 relative">
                        <Image 
                          src={artist.image} 
                          alt={artist.name}
                          fill
                          quality={100}
                          className="object-cover"
                          unoptimized={artist.image.startsWith('http')}
                        />
                      </div>

                      {/* テキストエリア - 右側に配置、美しいミニマル色彩 */}
                      <div className="flex-1 min-w-0 pb-2">
                        <h4 className="text-lg lg:text-xl font-bold japanese-text mb-2 leading-tight text-white drop-shadow-lg">
                          {artist.name.includes('&') ? (
                            <span className="text-lg lg:text-xl leading-relaxed">
                              {artist.name.split('&').map((name, index) => (
                                <span key={index}>
                                  {name.trim()}
                                  {index < artist.name.split('&').length - 1 && (
                                    <>
                                      <br />
                                      <span className="text-base opacity-80">&</span>
                                      <br />
                                    </>
                                  )}
                                </span>
                              ))}
                            </span>
                          ) : (
                            artist.name
                          )}
                        </h4>
                        
                        <p className={`text-slate-200/90 japanese-text mb-3 drop-shadow-md ${
                          artist.shortBio.includes('テキスタイルデザイナー') || artist.name.includes('根岸') ? 'text-[10px]' : 'text-sm'
                        }`}>
                          {artist.shortBio.split('。')[0]}
                        </p>
                        
                        <div className="border-t border-white/40 pt-3">
                          <p className="text-sm text-slate-100/95 japanese-text leading-relaxed drop-shadow-md">
                            {representativeArtwork?.description || ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* アーティストページへのリンク */}
                <Link href={`/artists/${artist.id}`} className="absolute inset-0 z-10" />
              </div>
            );
          })}
        </div>

        {/* ナビゲーションボタン（複数アイテムがある場合のみ表示） */}
        {totalItems > itemsPerPage && (
          <>
            {/* 前へボタン */}
            <button
              onClick={prevPage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-gray-200 transition-all duration-300 hover:scale-110 drop-shadow-lg"
              aria-label="前のページ"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* 次へボタン */}
            <button
              onClick={nextPage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-gray-200 transition-all duration-300 hover:scale-110 drop-shadow-lg"
              aria-label="次のページ"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* ページインジケーター（複数アイテムがある場合のみ表示） */}
      {totalItems > itemsPerPage && (
        <div className="flex justify-center my-2 space-x-2">
          {Array.from({ length: totalItems }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-gray-800 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-500'
              }`}
              aria-label={`${index + 1}番目のアーティストを表示`}
            />
          ))}
        </div>
      )}

    </div>
  );
}
