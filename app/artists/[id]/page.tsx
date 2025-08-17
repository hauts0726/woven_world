// app/artists/[id]/page.tsx
import artistsData from '@/data/artists.json';
import chaptersData from '@/data/chapters.json';
import eventsData from '@/data/events.json';
import BackButton from '@/components/BackButton';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Artist, Chapter, Event } from '@/types';
import Image from 'next/image';

const artists: Artist[] = artistsData as Artist[];
const chapters: Chapter[] = chaptersData as Chapter[];
const events: Event[] = eventsData as Event[];

// Next.js 15: params は Promise で渡る型定義（あなたのプロジェクト準拠）
type ArtistRouteParams = { id: string };

// --- 追加型（any 不使用） ---
type ArtworkCard = {
  id: string;
  image: string;
  title: string;
};

type StreetLibraryImage = {
  url: string;
  title: string;
  description: string;
};

type StreetLibrary = {
  concept: string;
  images: StreetLibraryImage[];
  mechanism: { write: string; read: string; weave: string };
  message: string;
};

type ArtistEx = Artist & {
  bio?: string | string[];
  artworks?: ArtworkCard[];
  streetLibrary?: StreetLibrary;
};

type EventEx = Event & {
  speakers?: string[];
};

export async function generateStaticParams() {
  return artists.map((a: Artist) => ({ id: a.id }));
}

export default async function ArtistDetail({
  params,
}: {
  params: Promise<ArtistRouteParams>;
}) {
  const { id } = await params;

  const artistBase = artists.find((a) => a.id === id);
  if (!artistBase) notFound();

  // 明示的に拡張型へ（any ではなく ArtistEx）
  const artist = artistBase as ArtistEx;

  const streetLibrary: StreetLibrary | null =
    artist.streetLibrary ? artist.streetLibrary : null;

  const artworks: ArtworkCard[] = Array.isArray(artist.artworks)
    ? (artist.artworks as ArtworkCard[])
    : [];

  const bioParas: string[] = Array.isArray(artist.bio) ? (artist.bio as string[]) : [];

  const relatedChapters = chapters.filter((ch) => ch.artists?.includes(artist.id));
  const relatedEvents: EventEx[] = (events as EventEx[]).filter(
    (ev) => Array.isArray(ev.speakers) && ev.speakers!.includes(artist.id)
  );

  // この2名は Photos 非表示
  const HIDE_PHOTOS_IDS = new Set(['kenmochi_hiroshi', 'suzuki_yuta']);
  const showPhotos = !HIDE_PHOTOS_IDS.has(artist.id) && artworks.length > 0;

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 container-responsive">
      <div className="mb-4 sm:mb-6">
        <BackButton />
      </div>

      <h2 className="text-responsive-base sm:text-responsive-lg lg:text-responsive-xl font-sans font-bold mb-3 sm:mb-4 japanese-text break-words">
        {artist.name}
      </h2>

      {/* プロフィール */}
      <div className="mb-2 flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">
        <div className="flex-shrink-0 w-full lg:w-auto">
          <div className="w-full max-w-sm mx-auto lg:mx-0 lg:w-48 xl:w-60 aspect-square rounded-lg overflow-hidden shadow-md bg-gray-200 relative">
            <Image
              src={artist.image.startsWith('http') ? artist.image : `/images/${artist.image}`}
              alt={artist.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 192px, 240px"
              className={`object-cover ${artist.id === 'suzuki_yuta' ? 'object-center' : ''}`}
              unoptimized={artist.image.startsWith('http')}
            />
          </div>
        </div>

        <div className="flex-1 w-full lg:max-w-none">
          <div className="text-responsive-base sm:text-responsive-lg font-sans font-semibold mb-3 japanese-text">Profile</div>
          <div className="max-h-none lg:max-h-60 lg:overflow-y-auto">
            {bioParas.map((para, idx) => (
              <p
                key={idx}
                className="mb-4 sm:mb-6 text-gray-800 japanese-text text-responsive-xs sm:text-responsive-sm leading-relaxed break-words"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* 路上書房（ある場合のみ） */}
      {streetLibrary && (
        <div className="mt-8 mb-8">
          <h2 className="text-2xl font-sans font-semibold mb-6 japanese-text border-b border-gray-200 pb-2">路上書房について</h2>

          <div className="mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-gray-400">
            <h3 className="text-lg font-semibold mb-3 japanese-text text-gray-800">路上書房とは？</h3>
            <p className="text-gray-700 leading-relaxed japanese-text">{streetLibrary.concept}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 japanese-text">路上書房の様子</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {streetLibrary.images.map((image, index) => (
                <div key={index} className="group">
                  <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-100 aspect-[4/3]">
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-all duration-300"
                      unoptimized={image.url.startsWith('http')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="text-sm font-semibold japanese-text mb-1">{image.title}</h4>
                      <p className="text-xs japanese-text opacity-90">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 japanese-text">具体的な仕組み</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-md font-semibold mb-3 japanese-text text-gray-800 flex items-center">
                  <span className="w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm mr-2">書</span>
                  書く
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed japanese-text">{streetLibrary.mechanism.write}</p>
              </div>
              <div className="p-5 bg-gray-100 rounded-lg border border-gray-300">
                <h4 className="text-md font-semibold mb-3 japanese-text text-gray-800 flex items-center">
                  <span className="w-6 h-6 bg-gray-700 text-white rounded-full flex items-center justify-center text-sm mr-2">読</span>
                  読む
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed japanese-text">{streetLibrary.mechanism.read}</p>
              </div>
              <div className="p-5 bg-white rounded-lg border border-gray-400">
                <h4 className="text-md font-semibold mb-3 japanese-text text-gray-800 flex items-center">
                  <span className="w-6 h-6 bg-black text-white rounded-full flex items中心 justify-center text-sm mr-2">編</span>
                  編む
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed japanese-text">{streetLibrary.mechanism.weave}</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg border-l-4 border-gray-500">
            <h3 className="text-lg font-semibold mb-3 japanese-text text-gray-800">メッセージ</h3>
            <p className="text-gray-700 leading-relaxed japanese-text italic">{streetLibrary.message}</p>
          </div>
        </div>
      )}

      {/* Photos（剱持・鈴木祐太は非表示） */}
      {showPhotos && (
        <div className="mt-0 mb-4">
          <div className="text-responsive-base sm:text-responsive-lg font-sans font-semibold mb-3 japanese-text border-b border-gray-200 pb-1">
            Photos
          </div>
          <div className="responsive-grid-3 gap-2 sm:gap-3 lg:gap-4">
            {artworks.map((artwork, index) => {
              // 河野さんのときだけ 1枚目と最後の1枚を左寄せ
              const leftCrop =
                artist.id === 'kono_chikayo' && (index === 0 || index === artworks.length - 1);

              return (
                <div key={artwork.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-md shadow-md bg-gray-100 aspect-[3/4]">
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      quality={100}
                      sizes="(max-width: 475px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                        leftCrop ? 'object-left' : 'object-center'
                      }`}
                      style={leftCrop ? { objectPosition: 'left center' } : undefined}
                      unoptimized={artwork.image.startsWith('http')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-1 sm:p-2 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-responsive-xs font-medium japanese-text line-clamp-1 break-words">
                        {artwork.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {relatedChapters.length > 0 && (
        <div className="mt-8">
          <h3 className="shia-small-text font-sans font-semibold mb-4 japanese-text">
            Chapters featuring {artist.name}
          </h3>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            {relatedChapters.map((ch: Chapter) => (
              <li key={ch.id}>
                <Link href={`/#chapter-${ch.id}`} className="hover:underline japanese-text text-gray-600 hover:text-black">
                  {ch.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {relatedEvents.length > 0 && (
        <div className="mt-8">
          <h3 className="shia-small-text font-sans font-semibold mb-4 japanese-text">
            Events with {artist.name}
          </h3>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            {relatedEvents.map((ev) => (
              <li key={ev.id}>
                <Link href={`/events/${ev.id}`} className="hover:underline japanese-text text-gray-600 hover:text-black">
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
