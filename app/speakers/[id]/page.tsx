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

export default function SpeakerDetail({ params }: { params: Params }) {
  const speaker = speakers.find(s => s.id === params.id);
  if (!speaker) {
    notFound();
  }

  // Find chapters and events associated with this speaker
  const relatedChapters = chapters.filter(ch => ch.artists?.includes(speaker.id));
  const relatedEvents = events.filter(ev => ev.speakers && ev.speakers.includes(speaker.id));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 ">
      <div className="mb-6">
        <BackButton />
      </div>
      <h2 className="text-base lg:text-xl font-sans font-bold mb-4 japanese-text"> {speaker.name.split('(')[0]}</h2>
      <div className="mb-2 flex gap-6 items-start">
                <div className="flex-shrink-0"></div>
        <div className="w-60 h-60 rounded-lg overflow-hidden shadow-md bg-gray-200">
          <Image 
            src={speaker.image.startsWith('http') ? speaker.image : `/images/${speaker.image}`}
            alt={speaker.name}
            width={360}
            height={360}
            quality={100}
            priority={true}
            sizes="(max-width: 768px) 100vw, 320px"
            className="w-80 h-80 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="flex-shrink-2 flex flex-col w-80">
          <div className="text-[18px] font-sans font-semibold mb-3 japanese-text">Profile</div>
          <div className="flex-1 overflow-y-auto pr-2">
            {speaker.bio.map((para: string, idx: number) => (
              <p key={idx} className="mb-6 text-gray-800 japanese-text profile-tiny-text">
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
