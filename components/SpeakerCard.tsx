'use client';

import TransitionLink from './TransitionLink';
import Image from 'next/image';
import { Speaker } from '@/types';
import { useState } from 'react';

interface SpeakerCardProps {
  speaker: Speaker;
}

export default function SpeakerCard({ speaker }: SpeakerCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <TransitionLink href={`/speakers/${speaker.id}`} className="group block">
      {!imageError ? (
        <Image 
          src={speaker.image.startsWith('http') ? speaker.image : `/images/${speaker.image}`} 
          alt={speaker.name} 
          width={400} 
          height={300} 
          quality={100}
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-48 object-cover object-center rounded transform transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageError(true)}
          unoptimized={speaker.image.startsWith('http')}
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
          <div className="text-center text-gray-500">
            <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs">Speaker Photo</p>
          </div>
        </div>
      )}
      <h2 className="text-lg lg:text-xl font-sans font-semibold mt-2 group-hover:underline japanese-text">{speaker.name}</h2>
      <p className={`text-gray-700 japanese-text ${
        speaker.shortBio.includes('テキスタイルデザイナー') || speaker.name.includes('根岸') ? 'text-xs leading-tight' : 'text-sm'
      }`}>{speaker.shortBio}</p>
    </TransitionLink>
  );
}
