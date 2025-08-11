import TransitionLink from './TransitionLink';
import { Event, Speaker } from '@/types';
import speakersData from '@/data/speakers.json';
import Image from 'next/image';

const speakers: Speaker[] = speakersData as Speaker[];

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  // Get speaker data for this event
  const eventSpeakers = event.speakers 
    ? speakers.filter(speaker => event.speakers!.includes(speaker.id))
    : [];

  return (
    <TransitionLink href={`/events/${event.id}`} className="group block">
      <div className="bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 rounded-lg transition-all duration-300 py-2 px-8 lg:py-6 lg:px-12 shadow-sm hover:shadow-md w-full">
        {/* Title Section - Full width at top */}
        <div className="mb-6">
          <h2 className="mt-4 text-lg lg:text-xl font-semibold japanese-text leading-tight text-gray-900 group-hover:text-gray-700 transition-colors duration-300 whitespace-nowrap japanese-text">
            {event.title.replace(/\n/g, ' ')}
          </h2>
          
          {/* Date */}
          <div className="text-base lg:text-lg text-gray-500 font-light mt-4 whitespace-nowrap japanese-text pl-2">
            {event.date} {event.time ? `· ${event.time}` : ''}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 w-full">
          
          {/* Content Section */}
          <div className="flex-1 space-y-4">
            {/* Summary */}
            <p className="text-gray-700 japanese-text text-base lg:text-lg pl-2">
              {event.summary}
            </p>

            {/* Speaker info */}
            {eventSpeakers.length > 0 && (
              <div className="pt-2">
                <div className="flex items-center space-x-2 text-base lg:text-lg text-gray-600 mb-2 pl-2">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="japanese-text font-medium whitespace-nowrap">登壇者</span>
                </div>
                <ul className="text-sm text-gray-700 japanese-text pl-9">
  {eventSpeakers.map((speaker) => (
    <li
      key={speaker.id}
      className="mt-5 text-base lg:text-lg text-gray-600 japanese-text whitespace-nowrap japanese-text hover:text-gray-800 transition-colors duration-300"
    >
      {speaker.name}
    </li>
  ))}
</ul>
              </div>
            )}
          </div>

          {/* Image Section */}
          {eventSpeakers.length > 0 && (
            <div className="flex-shrink-0 w-full lg:w-auto">
              <div className="flex gap-4 items-start justify-center lg:justify-start">
                {eventSpeakers.map((speaker) => (
                  <div key={speaker.id} className="text-center">
                    {/* Image containers */}
                    <div className="w-40 h-40 lg:w-48 lg:h-48 relative rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 border border-gray-200">
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        fill
                        quality={100}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 1024px) 160px, 192px"
                        unoptimized={speaker.image.startsWith('http')}
                      />
                    </div>
                    
                    {/* Speaker name */}
                    <p className="mt-2 text-sm lg:text-base japanese-text text-gray-700 font-medium leading-tight max-w-[160px] lg:max-w-[192px] text-center ">
                      {speaker.name.split('（')[0].split('(')[0]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </TransitionLink>
  );
}
