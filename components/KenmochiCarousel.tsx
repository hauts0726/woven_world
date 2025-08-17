'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Artist } from '@/types';

interface KenmochiCarouselProps {
  artist: Artist;
}

export default function KenmochiCarousel({ artist }: KenmochiCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 釼持さんの作品画像を拡張（実際の画像が追加されるまでのプレースホルダー）
  const extendedArtworks = [
    ...(artist.artworks || []),
    // 追加の作品画像（実際の画像に置き換える必要があります）
    {
      id: "wasai-2",
      title: "和裁の技法 - 柄合わせ",
      image: "https://res.cloudinary.com/dfsg7aahv/image/upload/v1755397143/33268890_m_oga9uf_ryiw9n.webp",
      description: "millimeter単位で調整する熟練の柄合わせ技法"
    },
    {
      id: "wasai-3", 
      title: "着物の仕立て",
      image: "https://res.cloudinary.com/dfsg7aahv/image/upload/v1755397143/33268890_m_oga9uf_ryiw9n.webp",
      description: "60年以上の経験を活かした丁寧な手仕事"
    },
    {
      id: "wasai-4",
      title: "後進の育成",
      image: "https://res.cloudinary.com/dfsg7aahv/image/upload/v1755397143/33268890_m_oga9uf_ryiw9n.webp", 
      description: "子ども向けの運針体験ワークショップ"
    }
  ];

  const totalItems = extendedArtworks.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!artist || extendedArtworks.length === 0) return null;

  return (
    <div className="mb-12 max-w-5xl mx-auto">
      {/* カルーセルタイトル */}
      <div className="mb-8 text-center">
        <h3 className="text-2xl lg:text-3xl font-bold japanese-text mb-4 text-gray-800">
          {artist.name}の作品
        </h3>
        <p className="text-gray-600 japanese-text text-sm lg:text-base">
          東京で60年以上にわたり着物を仕立ててきた和裁士の技と心
        </p>
      </div>

      <div className="relative">
        {/* メインカルーセル */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {extendedArtworks.map((artwork, index) => (
              <div key={artwork.id} className="w-full flex-shrink-0 relative">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <Image
                    src={artwork.image}
                    alt={artwork.title || `${artist.name}の作品 ${index + 1}`}
                    fill
                    quality={100}
                    className="object-cover"
                    unoptimized={artwork.image.startsWith('http')}
                    priority={index === 0}
                  />
                  
                  {/* グラデーションオーバーレイ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  
                  {/* 作品情報オーバーレイ */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-end space-x-6">
                      {/* 作家プロフィール画像 */}
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/80 shadow-lg flex-shrink-0">
                        <Image
                          src={artist.image}
                          alt={artist.name}
                          fill
                          quality={100}
                          className="object-cover"
                          unoptimized={artist.image.startsWith('http')}
                        />
                      </div>
                      
                      {/* テキスト情報 */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xl lg:text-2xl font-bold japanese-text mb-2 text-white drop-shadow-lg">
                          {artwork.title || `作品 ${index + 1}`}
                        </h4>
                        <p className="text-white/90 japanese-text mb-3 drop-shadow-md text-sm lg:text-base">
                          {artist.name} - {artist.shortBio}
                        </p>
                        <div className="border-t border-white/40 pt-3">
                          <p className="text-white/95 japanese-text leading-relaxed drop-shadow-md text-sm lg:text-base">
                            {artwork.description || ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ナビゲーションボタン */}
          {totalItems > 1 && (
            <>
              {/* 前へボタン */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 rounded-full p-3 shadow-lg"
                aria-label="前の作品"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* 次へボタン */}
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 rounded-full p-3 shadow-lg"
                aria-label="次の作品"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* ページインジケーター */}
        {totalItems > 1 && (
          <div className="flex justify-center mt-6 space-x-3">
            {extendedArtworks.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gray-800 scale-125 shadow-md' 
                    : 'bg-gray-300 hover:bg-gray-500 hover:scale-110'
                }`}
                aria-label={`${index + 1}番目の作品を表示`}
              />
            ))}
          </div>
        )}

        {/* 作品詳細情報 */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6 lg:p-8">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <h4 className="text-lg font-semibold japanese-text mb-3 text-gray-800">
                作家について
              </h4>
              <p className="text-gray-700 japanese-text leading-relaxed text-sm lg:text-base">
                {artist.bio?.[0] || artist.shortBio}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold japanese-text mb-3 text-gray-800">
                技法の特徴
              </h4>
              <ul className="text-gray-700 japanese-text space-y-2 text-sm lg:text-base">
                <li>• 着物の「柄合わせ」技法に長けている</li>
                <li>• millimeter単位での精密な調整</li>
                <li>• 一人ひとりの体型に合わせた仕立て</li>
                <li>• 後進の育成と伝統工芸保存活動</li>
              </ul>
            </div>
          </div>
          
          {/* アーティストページへのリンク */}
          <div className="mt-6 text-center">
            <Link 
              href={`/artists/${artist.id}`}
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 japanese-text"
            >
              {artist.name}の詳細を見る
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
