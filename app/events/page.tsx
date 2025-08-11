import eventsData from '@/data/events.json';
import { Event } from '@/types';
import EventCard from '@/components/EventCard';
import Reveal from '@/components/Reveal';

const events: Event[] = eventsData as Event[];

export default function EventsPage() {
  return (
    <div className="w-full">
      <h1 className="text-xl font-sans font-bold mb-8 text-center japanese-text">トークイベント／ワークショップ</h1>
      <div className="space-y-8">
        {events.map((event: Event) => (
          <Reveal key={event.id}>
            <EventCard event={event} /></Reveal>
        ))}
      </div>
    </div>
  );
}
