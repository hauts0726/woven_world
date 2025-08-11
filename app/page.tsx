'use client';

import Image from 'next/image';
import Link from 'next/link';
import chapters from '@/data/chapters.json';
import artists from '@/data/artists.json';
import speakers from '@/data/speakers.json';
import events from '@/data/events.json';
import ArtistCard from '@/components/ArtistCard';
import SpeakerCard from '@/components/SpeakerCard';
import EventCard from '@/components/EventCard';
import ChapterAutoScroll from '@/components/ChapterAutoScroll';
import SimpleNavButtons from '@/components/SimpleNavButtons';
import ArtistCarousel from '@/components/ArtistCarousel';
import { Chapter, Artist, Speaker, Event } from '@/types';

export default function HomePage() {
  const featuredArtist = (artists as Artist[]).find((a) => a.id === 'okimoto-kei');
  const nextEvent = (events as Event[])[0];

  return (
    <div className="w-full home-page">
      {/* Hero Section with Video Background */}
      <section id="top" className="hero-section relative mb-8 sm:mb-12 lg:mb-16 h-screen overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        >
          <source
            src="https://res.cloudinary.com/dfsg7aahv/video/upload/v1754341624/%E6%9C%80%E6%96%B0_idgldl.mov"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay and Text */}
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center w-full max-w-6xl mx-auto container-responsive">
            <h1 className="text-responsive-4xl sm:text-responsive-5xl font-sans font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-700 japanese-text leading-tight break-words">
              衣服とわたしたちのこれから
            </h1>
            <p className="text-responsive-lg sm:text-responsive-xl text-gray-700 mb-3 sm:mb-4 japanese-text leading-relaxed break-words">– わたしたちは、なにをまとい、なにを未来へ残すのか –</p>
            <p className="text-responsive-base sm:text-responsive-lg text-gray-600 italic break-words">
              On view April 22 – June 21, 2026— BUG, Tokyo, Japan
            </p>
          </div>
        </div>

      </section>

      {/* Intro Text - Minimal & Beautiful Design */}
      <section id="intro" className="min-h-screen flex flex-col justify-center mb-12 sm:mb-16 lg:mb-24 px-4 sm:px-6 lg:px-8 w-full mx-auto relative container-responsive">
        {/* Section Header with Subtle Accent */}
        <div className="text-center mb-4 mt-12 sm:mt-16 lg:mt-20">
          <div className="inline-block relative">
            <h2 className="text-responsive-xl sm:text-responsive-2xl font-light tracking-wide mb-2 text-gray-800 japanese-text break-words">
              はじめに
            </h2>
          </div>
        </div>

        {/* Main Content with Enhanced Typography */}
        <div className="flex justify-center w-full">
          <div className="prose prose-lg max-w-7xl w-full">
            <div className="space-y-6 sm:space-y-8 lg:space-y-10 text-gray-700 leading-loose japanese-text">
              {/* First paragraph with emphasis */}
              <p className="text-responsive-lg sm:text-responsive-xl font-light leading-relaxed text-gray-600 mb-6 sm:mb-8 text-center italic break-words">
                わたしたちは、なにをまとい、なにを未来へ残すのか。
              </p>

              {/* Main content paragraphs */}
              <div className="mt-8 sm:mt-10 lg:mt-12 space-y-4 sm:space-y-5 lg:space-y-6 text-responsive-base sm:text-responsive-lg leading-loose">
                <p className="text-left mt-2 break-words">
                  本来なら捨てられるはずだった着物を見つめながら、「この着物を、もっと生かす方法はないだろうか」。
                </p>

                <p className="text-left mb-2 break-words">
                  愛知県豊田市で地域創生に取り組む友人が、そう私につぶやいたことがキッカケとなり、この企画が生まれました。
                </p>

                <p className="text-left mb-2 break-words">
                  かつて衣服は、直し、譲り、受け継ぎながら大切にされてきましたが、その記憶や背景は静かに埋もれつつあります。
                </p>

                <p className="text-left mb-2 pb-4 sm:pb-6 break-words">
                  「まとう」という行為も、自己表現や社会とのつながりという意味を、どこかで手放しつつあるのではないでしょうか。
                </p>
                

                <p className="text-left mb-2 break-words">
                  本展は、素材との出会いから未来の装いをたどり、
                </p>

                <p className="text-left mb-2 break-words">
                  来場者との対話の場を作るだけでなく、様々な視点から掘り下げるトークイベントやワークショップを全5回開催。
                </p>

                <p className="text-left mb-2 break-words">
                  裂き織りやバイオ技術、AIなど、多様な手法を用いた作家20名とゲスト８名を迎え、各章に呼応する形で紹介します。
                </p>

                {/* Closing statement with special styling */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 relative pb-4 sm:pb-6">
                  <p className="text-left text-responsive-base sm:text-responsive-lg leading-loose text-gray-600 mb-6 sm:mb-8 japanese-text break-words">
                    衣服にまつわる記憶や素材、社会との関係に目を向け、まとうことの意味や広がりを考える機会となれば幸いです。
                  </p>
                  
                  {/* 企画者クレジット - 右下に配置（レスポンシブ対応） */}
                  <div className="text-right sm:absolute sm:bottom-1 sm:right-0 text-responsive-sm text-gray-600 japanese-text mt-4 sm:mt-0">
                    企画者　鈴木 祐太
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Navigation Buttons - Fixed Position */}
      <SimpleNavButtons />

      {/* Chapters Section */}
      <section id="chapters" className="w-full">
        <div className="scroll-smooth">
          {(chapters as Chapter[]).map((chapter, index) => {
            // 各章の作家を取得
            const chapterArtists = (artists as Artist[]).filter(artist => 
              chapter.artists && chapter.artists.includes(artist.id)
            );
            
            return (
              <div key={chapter.id} id={`chapter-${chapter.id}`} className="min-h-screen flex flex-col justify-center" data-chapter-id={chapter.id}>
                <ChapterAutoScroll chapterId={chapter.id}>
                  <div className="w-full max-w-screen-2xl text-center px-4 sm:px-6 lg:px-8 mx-auto py-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans font-bold mb-4 text-gray-800 japanese-text">
                      {chapter.title}
                    </h3>
                    
                    {/* Chapter Intro */}
                    <div className="mb-6 transform transition-all duration-1200 ease-out">
                      <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-loose japanese-text">
                        {chapter.intro?.[0]}
                      </p>
                    </div>

                    {/* u6章の特別な路上書房レイアウト */}
                    {chapter.id === 6 && (
                      <div className="mb-8 max-w-6xl mx-auto bg-gray-50 rounded-3xl p-6 lg:p-8">
                        {/* 路上書房の説明と今井咲希さんのカード */}
                        <div className="grid lg:grid-cols-2 gap-6 items-start">
                          {/* 左側：路上書房の説明（中央寄せ調整版） */}
                          <div className="flex flex-col items-center text-center">
                            <h5 className="text-lg font-bold japanese-text text-gray-800 mb-1">路上書房について</h5>
                            
                            {/* 路上書房のコンセプト説明（簡潔版） */}
                            <div className="mb-2 p-3 rounded-lg w-full">
                              <p className="text-sm text-gray-700 japanese-text text-left leading-relaxed">
                                衣服にまつわる記憶や体験を共有し、一冊の本として編み上げる参加型プロジェクト。来場者の声が集まり、「まとうこと」の意味を探求します。
                              </p>
                            </div>
                            
                            {/* 書く・読む・編むの説明（シンプル中央寄せ版） */}
                            <div className="space-y-3 w-full flex flex-col items-center">
                              <div className="flex flex-col items-center text-center">
                                <h6 className="text-base font-bold japanese-text text-gray-800 mb-1">書く</h6>
                                <p className="text-sm text-gray-600 japanese-text leading-relaxed">
                                  ブックリーフに衣服にまつわる物語を綴る
                                </p>
                              </div>
                              
                              <div className="flex flex-col items-center text-center">
                                <h6 className="text-base font-bold japanese-text text-gray-800 mb-1">読む</h6>
                                <p className="text-sm text-gray-600 japanese-text leading-relaxed">
                                  他の来場者の物語を読み、共感や発見を味わう
                                </p>
                              </div>
                              
                              <div className="flex flex-col items-center text-center">
                                <h6 className="text-base font-bold japanese-text text-gray-800 mb-1">編む</h6>
                                <p className="text-sm text-gray-600 japanese-text leading-relaxed">
                                  集まった物語を一冊の本として編み上げる
                                </p>
                              </div>
                            </div>

                            {/* メッセージ（簡潔版） */}
                            <div className="mt-1 pt-4 w-full">
                              <p className="text-sm text-gray-600 japanese-text leading-relaxed italic text-center">
                                誰もが参加できる本づくりの場「路上書房」
                              </p>
                              <p className="text-xs text-gray-500 japanese-text leading-relaxed mt-2 text-center">
                                あなたの声が、未来への新しい物語を紡ぎます
                              </p>
                            </div>
                          </div>

                          {/* 右側：今井咲希さんのカード */}
                          <div>
                            <Link href="/artists/imai-saki" className="group block">
                              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform ]">
                                {/* 作品画像 */}
                                <div className="h-[300px] md:h-[400px] lg:h-[500px] relative overflow-hidden">
                                  <img 
                                    src="https://res.cloudinary.com/dfsg7aahv/image/upload/v1754227434/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-08-03_22.20.50_mmwdrx.png"
                                    alt="路上書房の設営風景"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                  />
                                  {/* グラデーションオーバーレイ */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                  
                                  {/* Hover overlay */}
                                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="text-white text-center px-4">
                                      <p className="text-sm japanese-text">今井 咲希のページを見る</p>
                                    </div>
                                  </div>
                                </div>

                                {/* 作家プロフィール画像を強調したオーバーレイ */}
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                  {/* 背景オーバーレイ */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-800/40 to-transparent rounded-b-2xl"></div>
                                  
                                  <div className="relative flex items-end space-x-4">
                                    {/* 顔写真エリア - 左下に配置 */}
                                    <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/80 shadow-lg backdrop-blur-sm flex-shrink-0 mb-1">
                                      <img 
                                        src="https://res.cloudinary.com/dfsg7aahv/image/upload/v1753656903/%E4%BB%8A%E4%BA%95_%E5%92%B2%E5%B8%8C_l2n3mp.jpg"
                                        alt="今井 咲希"
                                        className="w-full h-full object-cover"
                                      />
                                    </div>

                                    {/* テキストエリア - 右側に配置 */}
                                    <div className="flex-1 min-w-0 pb-1">
                                      <h4 className="text-lg font-bold japanese-text mb-1 leading-tight text-white drop-shadow-lg">
                                        今井 咲希
                                      </h4>
                                    
                                      
                                      <div className="border-t border-white/40 pt-2">
                                        <p className="text-xs text-slate-100/95 japanese-text leading-relaxed drop-shadow-md">
                                          路上書房 作家
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chapter Artists & Sections - 第4章はカルーセル、その他は従来のレイアウト */}
                    {chapter.id === 4 && chapterArtists.length > 0 ? (
                      // 第4章：カルーセル機能を使用
                      <ArtistCarousel artists={chapterArtists} chapterId={chapter.id} />
                    ) : chapter.id !== 6 && chapterArtists.length > 0 && chapter.sections && chapter.sections.length > 0 ? (
                      // その他の章：従来のグリッドレイアウト
                      <div className="mb-8 max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                          {chapter.sections.map((section, sectionIndex) => {
                            // セクションに関連する作家を取得
                            const sectionArtists = chapterArtists.filter(artist => 
                              section.authorIds?.includes(artist.id)
                            );
                            
                            if (sectionArtists.length === 0) return null;
                            
                            // 合作の場合は複数の作家、単独の場合は1人の作家
                            const isCollaboration = sectionArtists.length > 1;
                            const mainArtist = sectionArtists[0];
                            
                            // 作家の代表作品を使用
                            const topAlignedIds = ['kuramochi-michiyo', 'sumiya-yukiko', 'suzuki_yuta'];

                            // 作家の代表作品を使用
                            const representativeArtwork = mainArtist.artworks?.[0];

                            return (
                              <div key={sectionIndex} className="group block relative">
                                <div 
                                  className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:scale-[1.02]"
                                  style={{
                                    animationDelay: `${sectionIndex * 200}ms`,
                                  }}
                                >
                                  {/* メイン作品画像 */}
                                  <div className="aspect-[3/4] relative overflow-hidden">
                                    {representativeArtwork ? (
                                      <img 
                                        src={representativeArtwork.image} 
                                        alt={representativeArtwork.title}
                                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                                          topAlignedIds.includes(mainArtist.id) ? 'object-top' : 'object-center'
                                        }`}
                                      />
                                    ) : (
                                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                        <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                        </svg>
                                      </div>
                                    )}
                                    
                                    {/* グラデーションオーバーレイ */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    
                                    {/* Hover overlay for single artist */}
                                    {!isCollaboration && (
                                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div className="text-white text-center px-4">
                                          <p className="text-sm japanese-text">{mainArtist.name}のページを見る</p>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* 作家プロフィール画像を強調したオーバーレイ - ミニマルな色彩 */}
                                  <div className="absolute bottom-0 left-0 right-0 p-6">
                                    {/* 背景オーバーレイ - 透明度を加えた美しい色 */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-800/40 to-transparent rounded-b-2xl"></div>
                                    
                                    <div className="relative flex items-end space-x-6">
                                      {/* 顔写真エリア - 左下に配置、文字とのバランス調整 */}
                                      {isCollaboration ? (
                                        // 合作の場合：複数の作家を表示
                                        <div className="flex space-x-2 flex-shrink-0 mb-2">
                                          {sectionArtists.map((artist, idx) => (
                                            <div key={artist.id} className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/80 shadow-lg backdrop-blur-sm">
                                              <img 
                                                src={artist.image} 
                                                alt={artist.name}
                                                className="w-full h-full object-cover"
                                              />
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        // 単独の場合 - 左下に配置
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/80 shadow-lg backdrop-blur-sm flex-shrink-0 mb-2">
                                          <img 
                                            src={mainArtist.image} 
                                            alt={mainArtist.name}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                      )}

                                      {/* テキストエリア - 右側に配置、美しいミニマル色彩 */}
                                      <div className="flex-1 min-w-0 pb-2">
                                        {isCollaboration ? (
                                          <div className="text-lg font-bold japanese-text mb-2 leading-tight text-white drop-shadow-lg">
                                            {sectionArtists.map((artist, idx) => (
                                              <div key={artist.id} className={idx > 0 ? 'mt-1' : ''}>
                                                {artist.name}
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <h4 className="text-xs sm:text-sm md:text-base font-bold japanese-text mb-1 leading-tight text-white drop-shadow-lg break-words">
                                            {mainArtist.name}
                                          </h4>
                                        )}
                                        
                                        {isCollaboration ? (
                                          <p className="text-xs text-slate-200/90 japanese-text mb-2 font-medium drop-shadow-md break-words">
                                            研究者
                                          </p>
                                        ) : (
                                        <p className="text-xs text-slate-200/90 japanese-text mb-2 drop-shadow-md leading-tight break-words">
                                          {mainArtist.shortBio.split('。')[0]}
                                        </p>
                                        )}
                                        
                                        <div className="border-t border-white/40 pt-3">
                                          <p className="text-sm text-slate-100/95 japanese-text leading-relaxed drop-shadow-md">
                                            {section.title.split('–')[0].split('：')[1] || section.title.split('–')[0].trim()}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* 合作の場合のホバーオーバーレイ */}
                                {isCollaboration && (
                                  <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center z-10">
                                    <div className="text-center space-y-4">
                                      <p className="text-white text-sm mb-4 japanese-text">アーティストを選択してください</p>
                                      <div className="space-y-2">
                                        {sectionArtists.map((artist, idx) => (
                                          <Link
                                            key={artist.id}
                                            href={`/artists/${artist.id}`}
                                            className="block bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-colors duration-200 text-sm font-medium japanese-text"
                                          >
                                            {artist.name}のページを見る
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {/* 単独の場合の通常リンク */}
                                {!isCollaboration && (
                                  <Link href={`/artists/${mainArtist.id}`} className="absolute inset-0 z-10" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}

                    {/* Chapter Description - 画像の後に詳細説明を追加 */}
                    {chapter.description && (
                      <div className="mt-4 mb-6 max-w-6xl mx-auto">
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed japanese-text text-left px-4 md:px-0">
                          {chapter.description}
                        </p>
                      </div>
                    )}

                  </div>
                </ChapterAutoScroll>
              </div>
            );
          })}
        </div>
      </section>

      {/* Events Section（問題の対象部分） */}
<section id="events" className="mb-16 px-4 sm:px-6 lg:px-8 w-full min-h-screen pb-20">
  {/* 見出し */}
  <h3
    id="events-title"
    className="text-3xl font-bold scroll-mt-24 mb-6 japanese-text px-4 sm:px-0 max-w-screen-2xl mx-auto"
  >
    トークイベント・ワークショップ
  </h3>

  {/* イベントカード一覧 */}
  <div className="space-y-12 max-w-screen-2xl mx-auto px-4 sm:px-0">
    {(events as Event[]).map((event) => (
      <EventCard key={event.id} event={event} />
    ))}

    {/* 追加：末尾に余白を確保 */}
    <div className="h-1" />
  </div>
</section>
    </div>
  );
}
