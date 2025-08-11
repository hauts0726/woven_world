'use client'

import { Chapter, Artist } from '@/types'
import Image from 'next/image'
import Reveal from './Reveal'
import TransitionLink from './TransitionLink'

interface ChapterSummaryProps {
  chapter?: Chapter
  artists?: Artist[]
}

export default function ChapterSummary({ chapter, artists }: ChapterSummaryProps) {
  // propsが渡されていない場合は何も表示しない
  if (!chapter || !artists) {
    return null
  }

  // 章に関連する作家を取得
  const chapterArtists = artists.filter(artist => 
    chapter.artists?.includes(artist.id)
  )

  // 章ごとのアクセントカラーを定義
  const getChapterColor = (chapterId: number) => {
    const colors = [
      'from-emerald-50 to-teal-50 border-emerald-200', // 第1章 - 素材
      'from-blue-50 to-indigo-50 border-blue-200',     // 第2章 - 生地
      'from-purple-50 to-pink-50 border-purple-200',   // 第3章 - 染める・織る
      'from-amber-50 to-orange-50 border-amber-200',   // 第4章 - 解き・縫う
      'from-rose-50 to-red-50 border-rose-200',        // 第5章 - 異分野融合
      'from-slate-50 to-gray-50 border-slate-200'      // 第6章 - 対話
    ]
    return colors[chapterId - 1] || colors[0]
  }

  const getAccentColor = (chapterId: number) => {
    const colors = [
      'text-emerald-700',
      'text-blue-700', 
      'text-purple-700',
      'text-amber-700',
      'text-rose-700',
      'text-slate-700'
    ]
    return colors[chapterId - 1] || colors[0]
  }

  return (
    <Reveal>
      <div className={`mb-20 bg-gradient-to-br ${getChapterColor(chapter.id)} rounded-2xl border overflow-hidden shadow-sm`}>
        {/* Chapter Header */}
        <div className="p-8 lg:p-12">
          <div className="text-center max-w-5xl mx-auto">
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 font-serif leading-tight ${getAccentColor(chapter.id)}`}>
              {chapter.title}
            </h2>
            {chapter.intro && chapter.intro.length > 0 && (
              <p className="text-base lg:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                {chapter.intro[0]}
              </p>
            )}
          </div>
        </div>

          {/* Artists Showcase - 作家の画像を大きく強調し、個別に表示 */}
        <div className="px-8 lg:px-12 pb-8">
          <div className="mb-16">
            <h3 className={`text-3xl font-bold mb-12 text-center font-serif ${getAccentColor(chapter.id)}`}>
              参加作家
            </h3>
            
            {/* Artists - 各作家を大きく個別に表示 */}
            <div className="space-y-16">
              {chapterArtists.map((artist, index) => (
                <div key={artist.id} className="group">
                  {/* 作家メインセクション */}
                  <div className="bg-white/90 rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/60 backdrop-blur-sm">
                    <div className="text-center mb-8">
                      {/* 大きな作家プロフィール画像 - レスポンシブ対応 */}
                      <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto mb-8">
                        <TransitionLink 
                          href={`/artists/${artist.id}`}
                          className="block w-full h-full cursor-pointer group"
                        >
                          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white group-hover:shadow-3xl transition-all duration-500">
                            <Image
                              src={artist.image}
                              alt={artist.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <div className="text-white text-center px-4">
                                <p className="text-sm japanese-text">{artist.name}のページを見る</p>
                              </div>
                            </div>
                            
                            {/* 名前オーバーレイ - レスポンシブ対応 */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 md:p-6">
                              <h4 className="text-lg lg:text-xl font-bold text-white mb-2 font-serif">
                                {artist.name}
                              </h4>
                              <div className="inline-block px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-xs sm:text-sm font-semibold bg-white/90 text-gray-800">
                                {artist.shortBio.includes('草職人') ? '草職人' :
                                 artist.shortBio.includes('プロデューサー') ? 'プロデューサー' :
                                 artist.shortBio.includes('和裁士') ? '和裁士' :
                                 artist.shortBio.includes('作家') ? '作家' :
                                 artist.shortBio.includes('研究者') ? '研究者' : '作家'}
                              </div>
                            </div>
                          </div>
                        </TransitionLink>
                      </div>
                    </div>
                    
                    {/* 作家詳細情報 - レスポンシブ対応 */}
                    <div className="max-w-4xl mx-auto text-center">
                      <p className={`text-gray-700 leading-relaxed mb-8 font-medium ${
                        artist.shortBio.includes('テキスタイルデザイナー') || artist.name.includes('根岸') ? 'text-sm sm:text-base' : 'text-lg sm:text-xl'
                      }`}>
                        {artist.shortBio}
                      </p>
                    </div>
                  </div>
                  
                  {/* この章での取り組み - 独立したセクション */}
                  {chapter.sections && chapter.sections.some(section => section.authorIds?.includes(artist.id)) && (
                    <div className="mt-8 bg-gradient-to-r from-white/80 to-white/60 rounded-2xl p-8 backdrop-blur-sm border border-white/40">
                      <h5 className={`text-xl font-bold mb-6 text-center font-serif ${getAccentColor(chapter.id)}`}>
                        {artist.name}さんの取り組み
                      </h5>
                      <div className="space-y-6">
                        {chapter.sections
                          .filter(section => section.authorIds?.includes(artist.id))
                          .map((section, sectionIndex) => (
                            <div key={sectionIndex} className="bg-white/70 rounded-xl p-6 border border-white/50">
                              <h6 className="text-lg font-semibold text-gray-900 mb-3">
                                {section.title}
                              </h6>
                              {section.content && section.content.length > 0 && (
                                <p className="text-gray-700 leading-relaxed">
                                  {section.content[0]}
                                </p>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  
                  {/* 代表作品 - 控えめで美しい表示 */}
                  {artist.artworks && artist.artworks.length > 0 && (
                    <div className="mt-6 bg-white/50 rounded-xl p-6 backdrop-blur-sm border border-white/30">
                      <h5 className={`text-lg font-semibold mb-4 text-center ${getAccentColor(chapter.id)}`}>
                      </h5>
                      <div className="flex justify-center space-x-3">
                        {artist.artworks.slice(0, 4).map((artwork, artworkIndex) => (
                          <div key={artworkIndex} className="group/artwork">
                            <div className="w-16 h-16 rounded-lg overflow-hidden shadow-sm border border-white/50 group-hover/artwork:shadow-md transition-all duration-200">
                              <img 
                                src={artwork.image} 
                                alt={artwork.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="mt-1 text-center text-xs text-gray-600 truncate w-16">
                              {artwork.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chapter Themes - セクション情報を章のイメージを伝える形に改善 */}
          {chapter.sections && chapter.sections.length > 0 && (
            <div className="bg-white/60 rounded-xl p-8 backdrop-blur-sm">
              <h3 className={`text-2xl font-bold mb-8 text-center font-serif ${getAccentColor(chapter.id)}`}>
                この章で探求するテーマ
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {chapter.sections.map((section, index) => {
                  // セクションタイトルからキーワードとイメージを抽出
                  const getThemeInfo = (title: string) => {
                    if (title.includes('記憶')) return { keyword: '記憶', icon: '🧠', description: '素材に宿る記憶を辿る' }
                    if (title.includes('環境') || title.includes('倫理')) return { keyword: '持続可能性', icon: '🌱', description: '環境に配慮した素材選択' }
                    if (title.includes('伝統')) return { keyword: '伝統技術', icon: '🎋', description: '受け継がれる職人の技' }
                    if (title.includes('裂き織り')) return { keyword: '再生', icon: '♻️', description: '古布に新たな命を吹き込む' }
                    if (title.includes('直線裁断')) return { keyword: '構造', icon: '📐', description: '布と身体の関係性を探る' }
                    if (title.includes('廃棄')) return { keyword: 'アップサイクル', icon: '🔄', description: '廃棄物から美しい作品へ' }
                    if (title.includes('自然')) return { keyword: '自然染色', icon: '🌿', description: '自然が紡ぐやさしい色彩' }
                    if (title.includes('融合')) return { keyword: 'イノベーション', icon: '⚡', description: '異分野の融合が生む新表現' }
                    if (title.includes('対話')) return { keyword: 'コミュニケーション', icon: '💬', description: '作家と来場者をつなぐ場' }
                    return { keyword: 'クラフト', icon: '✨', description: '手仕事の美しさ' }
                  }

                  const themeInfo = getThemeInfo(section.title)
                  
                  return (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group">
                      <div className="text-center mb-4">
                        <div className="text-3xl mb-3">{themeInfo.icon}</div>
                        <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-3 ${getAccentColor(chapter.id)} bg-white/80 border`}>
                          {themeInfo.keyword}
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 leading-tight text-center">
                        {themeInfo.description}
                      </h4>
                      {section.content && section.content.length > 0 && (
                        <p className="text-sm text-gray-600 leading-relaxed text-center">
                          {section.content[0].substring(0, 100)}...
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Chapter Stats - シンプルで美しい統計情報 */}
          <div className="mt-8 pt-6 border-t border-white/30">
            <div className="flex justify-center items-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400`}></div>
                <span className="font-medium text-gray-700">
                  {chapter.sections?.length || 0}つのテーマ
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400`}></div>
                <span className="font-medium text-gray-700">
                  参加作家（{chapter.artists?.length || 0}名）
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
