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

// Next.js 15: params は Promise として渡される（ローカル型で明示）
type ArtistRouteParams = { id: string };

export async function generateStaticParams() {
  return artists.map((a: Artist) => ({ id: a.id }));
}

export default async function ArtistDetail({
  params,
}: {
  params: Promise<ArtistRouteParams>;
}) {
  // ✅ Promise を await して取り出す
  const { id } = await params;

  const artist = artists.find((a) => a.id === id);
  if (!artist) notFound();

  // 依存する値はローカル変数に取り出して型を確定
  const streetLibrary = artist.streetLibrary ?? null;
  const artworks = artist.artworks ?? [];
  const bioParas = Array.isArray(artist.bio) ? artist.bio : [];

  const relatedChapters = chapters.filter((ch) => ch.artists?.includes(artist.id));
  const relatedEvents = events.filter((ev) => ev.speakers && ev.speakers.includes(artist.id));

  // ★ この2名のページだけ Photos を非表示（プロフィール写真はそのまま）
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

      {/* プロフィール写真（枠にピッタリ埋める／サイズはそのまま） */}
      <div className="mb-2 flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">
        <div className="flex-shrink-0 w-full lg:w-auto">
          {/* ← responsive-image-container 等の補助クラスは使わず relative + fill を徹底 */}
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
            {bioParas.map((para: string, idx: number) => (
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

      {/* 路上書房セクション（該当アーティストのみ） */}
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
                  <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm mr-2">編</span>
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

      {/* Photos（★ 剱持・鈴木祐太のページでは非表示） */}
      {showPhotos && (
        <div className="mt-0 mb-4">
          <div className="text-responsive-base sm:text-responsive-lg font-sans font-semibold mb-3 japanese-text border-b border-gray-200 pb-1">
            Photos
          </div>
          <div className="responsive-grid-3 gap-2 sm:gap-3 lg:gap-4">
            {artworks.map((artwork, index) => (
              <div key={artwork.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-md shadow-md bg-gray-100 aspect-[3/4]">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    quality={100}
                    sizes="(max-width: 475px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                      artist.id === 'kono_chikayo' && index === 0 ? 'object-right' : ''
                    }`}
                    unoptimized={artwork.image.startsWith('http')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-1 sm:p-2 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-responsive-xs font-medium japanese-text line-clamp-1 break-words">{artwork.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {relatedChapters.length > 0 && (
        <div className="mt-8">
          <h3 className="shia-small-text font-sans font-semibold mb-4 japanese-text">Chapters featuring {artist.name}</h3>
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
          <h3 className="shia-small-text font-sans font-semibold mb-4 japanese-text">Events with {artist.name}</h3>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            {relatedEvents.map((ev: Event) => (
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
