'use client';

import * as React from 'react';
import type { JSX } from 'react';
import speakersData from '@/data/speakers.json';
import { Speaker } from '@/types';
import SpeakerCard from '@/components/SpeakerCard';
import Reveal from '@/components/Reveal';

const speakers: Speaker[] = speakersData as Speaker[];

export default function SpeakersPage(): JSX.Element {
  return (
    <div>
      <h1 className="text-3xl font-sans font-bold mb-6">登壇者一覧</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {speakers.map((speaker: Speaker) => (
          <Reveal key={speaker.id}>
            <SpeakerCard speaker={speaker} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
