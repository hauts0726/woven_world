import speakersData from '@/data/speakers.json';
import chaptersData from '@/data/chapters.json';
import eventsData from '@/data/events.json';
import BackButton from '@/components/BackButton';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Speaker, Chapter, Event } from '@/types';
import Image from 'next/image';

const speakers: Speaker[] = speakersData as Speaker[];
const chapters: Chapter[] = chaptersData as Chapter[];
const events: Event[] = eventsData as Event[];

interface Params {
  id: string;
}

export async function generateStaticParams() {
  return speakers.map((s: Speaker) => ({ id: s.id }));
}

export default async function SpeakerDetail({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const speaker = speakers.find(s => s.id === id);
  if (!speaker) {
    notFound();
  }

  // Find chapters and events associated with this speaker
  const relatedChapters = chapters.filter(ch => ch.artists?.includes(speaker.id));
  const relatedEvents = events.filter(ev => ev.speakers && ev.speakers.includes(speaker.id));

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 container-responsive">
      <div className="mb-4 sm:mb-6">
        <BackButton />
      </div>
      <h2 className="text-responsive-base sm:text-responsive-lg lg:text-responsive-xl font-sans font-bold mb-3 sm:mb-4 japanese-text break-words">{speaker.name.split('(')[0]}</h2>
      <div className="mb-2 flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">
        <div className="flex-shrink-0 w-full lg:w-auto">
          <div className="w-full max-w-sm mx-auto lg:mx-0 lg:w-48 xl:w-60 aspect-square rounded-lg overflow-hidden shadow-md bg-gray-200 responsive-image-container">
            <Image 
              src={speaker.image.startsWith('http') ? speaker.image : `/images/${speaker.image}`}
              alt={speaker.name}
              width={360}
              height={360}
              quality={100}
              priority={true}
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 192px, 240px"
              className="w-full h-full object-cover responsive-image"
              unoptimized={speaker.image.startsWith('http')}
            />
          </div>
        </div>
        <div className="flex-1 w-full lg:max-w-none">
          <div className="text-responsive-base sm:text-responsive-lg font-sans font-semibold mb-3 japanese-text">Profile</div>
          <div className="max-h-none lg:max-h-60 lg:overflow-y-auto lg:pr-2">
            {speaker.bio.map((para: string, idx: number) => (
              <p key={idx} className="mb-4 sm:mb-6 text-gray-800 japanese-text text-responsive-xs sm:text-responsive-sm leading-relaxed break-words">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      {relatedChapters.length > 0 && (
        <div className="mt-6">
          <h3 className="shia-small-text font-sans font-semibold mb-2">Chapters featuring {speaker.name}</h3>
          <ul className="list-disc list-inside text-gray-800 ">
            {relatedChapters.map((ch: Chapter) => (
              <li key={ch.id}>
                <Link href={`/chapters/${ch.id}`} className="hover:underline japanese-text">
                  {ch.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {relatedEvents.length > 0 && (
        <div className="mt-4">
          <h3 className="shia-small-text font-sans font-semibold mb-2 japanese-text">Events with {speaker.name.split('(')[0]}</h3>
          <ul className="list-disc list-inside text-gray-800">
            {relatedEvents.map((ev: Event) => (
              <li key={ev.id}>
                <Link href={`/events/${ev.id}`} className="hover:underline japanese-text">
                  {ev.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
