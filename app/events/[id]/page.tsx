import events from '@/data/events.json';
import speakers from '@/data/speakers.json';
import BackButton from '@/components/BackButton';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Event, Speaker } from '@/types';
import Image from 'next/image';

interface Params {
  id: string;
}

export async function generateStaticParams() {
  return (events as Event[]).map((ev) => ({ id: ev.id }));
}

export default async function EventDetail({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const event = (events as Event[]).find((ev) => ev.id === id);
  if (!event) {
    notFound();
  }

  const eventSpeakers = event.speakers?.map((speakerId: string) => {
    const speaker = (speakers as Speaker[]).find((s) => s.id === speakerId);
    return speaker ? speaker : null;
  }).filter((speaker): speaker is Speaker => speaker !== null) || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <h1 className="font-sans font-bold mb-6 japanese-text event-title">{event.title}</h1>
      <p className="text-gray-600 font-sans mb-6 japanese-text event-date">
        {event.date} {event.time ? `· ${event.time}` : ''}
      </p>

      {eventSpeakers.length > 0 && (
        <div className="mb-8">
          <h2 className="font-bold mb-6 japanese-text event-speakers-heading">登壇者</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {eventSpeakers.map((speaker) => (
              <div key={speaker.id} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    width={180}
                    height={180}
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/speakers/${speaker.id}`} className="text-blue-600 hover:underline">
                    <h3 className="font-bold japanese-text whitespace-nowrap overflow-hidden text-ellipsis event-speaker-name">{speaker.name.split('(')[0]}</h3>
                  </Link>
                  <p className="text-gray-600 mt-2 japanese-text leading-relaxed event-speaker-bio">{speaker.shortBio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {event.description.map((para: string, idx: number) => (
          <p key={idx} className="text-gray-800 leading-relaxed japanese-text">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
