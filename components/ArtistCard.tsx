'use client';

import TransitionLink from './TransitionLink';
import Image from 'next/image';
import { Artist } from '@/types';
import { useState } from 'react';

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Artists that should use center positioning
  const centerPositionArtists = ['okimoto-kei', 'hashida_toyo'];
  // Artists that should use top positioning (default behavior, but listed for clarity)
  const topPositionArtists = ['suzuki_yuta', 'sumiya-yukiko', 'kuramochi-michiyo', 'koshida-rikuha', 'kawamata-ryuto', 'tadokoro-naoki', 'terashima-kyosui'];
  const objectPosition = centerPositionArtists.includes(artist.id) ? 'object-center' : 'object-top';

  return (
    <TransitionLink href={`/artists/${artist.id}`} className="group block container-responsive">
      <div className="artist-image-container rounded-lg overflow-hidden relative responsive-image-container">
        {!imageError ? (
          <Image 
            src={artist.image.startsWith('http') ? artist.image : `/images/${artist.image}`} 
            alt={artist.name} 
            width={400} 
            height={300} 
            quality={100}
            priority={false}
            sizes="(max-width: 475px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={`w-full h-40 xs:h-44 sm:h-48 md:h-52 lg:h-48 object-cover ${objectPosition} responsive-image centered-image transform transition-all duration-700 ease-out group-hover:scale-105`}
            onError={() => setImageError(true)}
            unoptimized={artist.image.startsWith('http')}
          />
        ) : (
          <div className="w-full h-40 xs:h-44 sm:h-48 md:h-52 lg:h-48 bg-gray-100 flex items-center justify-center centered-image transform transition-all duration-700 ease-out group-hover:scale-105">
            <div className="text-center text-gray-500">
              <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-responsive-xs">Artist Photo</p>
            </div>
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="text-white text-center px-2 sm:px-4">
            <p className="text-responsive-xs sm:text-responsive-sm japanese-text">{artist.name}のページを見る</p>
          </div>
        </div>
      </div>
      <h2 className="text-responsive-base sm:text-responsive-lg lg:text-responsive-xl font-sans font-semibold mt-2 group-hover:underline japanese-text transition-colors duration-300 break-words leading-tight">{artist.name}</h2>
      <p className={`text-gray-700 japanese-text transition-colors duration-300 group-hover:text-gray-900 mt-1 leading-relaxed break-words ${
        artist.id === 'negishi_keisuke' || artist.id === 'kuramochi-michiyo' || artist.shortBio.includes('テキスタイルデザイナー') || artist.shortBio.includes('ファッションデザイナー') 
          ? 'text-[clamp(0.6rem,1.5vw,0.75rem)] leading-tight' 
          : 'text-responsive-xs sm:text-responsive-sm'
      }`}>{artist.shortBio}</p>
    </TransitionLink>
  );
}
