'use client';

import * as React from 'react';
import type { JSX } from 'react';
import artistsData from '@/data/artists.json';
import { Artist } from '@/types';
import ArtistCard from '@/components/ArtistCard';
import Reveal from '@/components/Reveal';

const artists: Artist[] = artistsData as Artist[];

export default function ArtistsPage(): JSX.Element {
  return (
    <div>
      <h1 className="text-3xl font-sans font-bold mb-6">Artists</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {artists.map((artist: Artist) => (
          <Reveal key={artist.id}>
            <ArtistCard artist={artist} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
