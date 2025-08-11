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
    <TransitionLink href={`/events/${event.id}`} className="group block container-responsive">
      <div className="bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 rounded-lg transition-all duration-300 fluid-p-md shadow-sm hover:shadow-md w-full">
        {/* Title Section - Full width at top */}
        <div className="mb-4 sm:mb-6">
          <h2 className="mt-2 sm:mt-4 text-responsive-lg sm:text-responsive-xl font-semibold japanese-text leading-tight text-gray-900 group-hover:text-gray-700 transition-colors duration-300 break-words">
            {event.title.replace(/\n/g, ' ')}
          </h2>
          
          {/* Date */}
          <div className="text-responsive-sm sm:text-responsive-base text-gray-500 font-light mt-2 sm:mt-4 japanese-text pl-0 sm:pl-2 break-words">
            {event.date} {event.time ? `· ${event.time}` : ''}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6 lg:gap-12 w-full">
          
          {/* Content Section */}
          <div className="flex-1 space-y-3 sm:space-y-4">
            {/* Summary */}
            <p className="text-gray-700 japanese-text text-responsive-sm sm:text-responsive-base pl-0 sm:pl-2 leading-relaxed">
              {event.summary}
            </p>

            {/* Speaker info */}
            {eventSpeakers.length > 0 && (
              <div className="pt-1 sm:pt-2">
                <div className="flex items-center space-x-2 text-responsive-xs sm:text-responsive-sm text-gray-600 mb-2 pl-0 sm:pl-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="japanese-text font-medium">登壇者</span>
                </div>
                <ul className="text-gray-700 japanese-text pl-6 sm:pl-9">
                  {eventSpeakers.map((speaker) => (
                    <li
                      key={speaker.id}
                      className="mt-3 sm:mt-5 text-gray-600 japanese-text hover:text-gray-800 transition-colors duration-300 break-words"
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
              <div className="flex gap-3 sm:gap-4 items-start justify-center lg:justify-start flex-wrap">
                {eventSpeakers.map((speaker) => (
                  <div key={speaker.id} className="text-center">
                    {/* Image containers - Responsive sizing */}
                    <div className="w-32 h-32 xs:w-36 xs:h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 relative rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 border border-gray-200 responsive-image-container">
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        fill
                        quality={100}
                        className="responsive-image object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 475px) 128px, (max-width: 640px) 144px, (max-width: 1024px) 160px, 192px"
                        unoptimized={speaker.image.startsWith('http')}
                      />
                    </div>
                    
                    {/* Speaker name - Responsive text */}
                    <p className="mt-2 text-responsive-xs sm:text-responsive-sm japanese-text text-gray-700 font-medium leading-tight max-w-[128px] xs:max-w-[144px] sm:max-w-[160px] lg:max-w-[192px] text-center break-words">
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
