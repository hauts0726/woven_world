'use client'

import { useState, useEffect, useCallback } from 'react'
import chapters from '@/data/chapters.json'
import { Chapter } from '@/types'

export default function FloatingTableOfContents() {
  const [activeSection, setActiveSection] = useState<string>('top')
  const [tocPosition, setTocPosition] = useState<number>(80) // 初期位置（px）

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight

    // セクション要素を取得
    const sections = [
      { id: 'top', element: document.documentElement, offset: 0 },
      { id: 'chapters', element: document.getElementById('chapters') },
      ...chapters.map(chapter => ({
        id: `chapter-${chapter.id}`,
        element: document.querySelector(`[data-chapter-id="${chapter.id}"]`)
      })),
      { id: 'events', element: document.getElementById('events') }
    ]

    // 現在のスクロール位置に基づいてアクティブセクションを決定
    let currentActiveSection = 'top'
    let activeElement = null

    // ページの最下部近くの場合、eventsセクションをアクティブにする
    if (scrollPosition + windowHeight >= document.documentElement.scrollHeight - 100) {
      currentActiveSection = 'events'
      activeElement = document.getElementById('events')
    }
    // ページトップ付近の場合
    else if (scrollPosition < 0) {
      currentActiveSection = 'top'
      activeElement = null
    } 
    else {
      // 各セクションをチェック（下から上へ）
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element && section.id !== 'top') {
          const rect = section.element.getBoundingClientRect()
          const elementTop = scrollPosition + rect.top
          
          // セクションの上部がスクロール位置を超えた場合、そのセクションをアクティブにする
          if (scrollPosition >= elementTop - 200) {
            currentActiveSection = section.id
            activeElement = section.element
            break
          }
        }
      }
    }

    setActiveSection(currentActiveSection)

    // 目次の位置を右上に固定（追従後は右上で停止）
    const targetPosition = scrollPosition + 20 // 画面上端から20px下の位置に固定

    setTocPosition(targetPosition)
  }, [])

  useEffect(() => {
    // スクロールイベントのスロットリング
    let ticking = false
    
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    // イベントリスナーを追加
    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    window.addEventListener('resize', throttledHandleScroll, { passive: true })
    
    // 初期状態を設定
    setTimeout(() => {
      handleScroll()
    }, -200)

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
      window.removeEventListener('resize', throttledHandleScroll)
    }
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToChapter = (chapterId: number) => {
    const element = document.querySelector(`[data-chapter-id="${chapterId}"]`)
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY
      const headerHeight = -75 // ヘッダーの高さを考慮（調整）
      window.scrollTo({ top: elementTop - headerHeight, behavior: 'smooth' })
    }
  }

  const scrollToEvents = () => {
    const element = document.getElementById('events')
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY
      const headerHeight = -75 // ヘッダーの高さを考慮（調整）
      window.scrollTo({ top: elementTop - headerHeight, behavior: 'smooth' })
    }
  }

  const scrollToIntro = () => {
    const element = document.querySelector('section:has(h2:contains("はじめに"))')
    if (!element) {
      // フォールバック：はじめにセクションを直接探す
      const introElement = Array.from(document.querySelectorAll('h2')).find(h2 => 
        h2.textContent?.includes('はじめに')
      )?.closest('section')
      
      if (introElement) {
        const elementTop = introElement.getBoundingClientRect().top + window.scrollY
        const headerHeight = -75 // ヘッダーの高さを考慮（調整）
        window.scrollTo({ top: elementTop - headerHeight, behavior: 'smooth' })
      }
    } else {
      const elementTop = element.getBoundingClientRect().top + window.scrollY
      const headerHeight = -75 // ヘッダーの高さを考慮（調整）
      window.scrollTo({ top: elementTop - headerHeight, behavior: 'smooth' })
    }
  }

  const scrollToChapters = () => {
    const element = document.getElementById('chapters')
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY
      const headerHeight = -75 // ヘッダーの高さを考慮（調整）
      window.scrollTo({ top: elementTop - headerHeight, behavior: 'smooth' })
    }
  }

  return (
    <div 
      className="absolute right-4 z-50 block transition-all duration-500 ease-out"
      style={{ top: `${tocPosition}px` }}
    >
      <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-3 w-48">
        <h3 className="text-xs font-bold text-gray-800 mb-2 text-center japanese-text border-b border-gray-200 pb-1">
          目次
        </h3>
        
        <div className="space-y-0.5 text-xs">
          {/* TOP */}
          <button
            onClick={scrollToTop}
            className="w-full text-left p-2 rounded-lg transition-all duration-300 japanese-text transform hover:scale-[1.02] hover:shadow-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            TOP
          </button>

          {/* はじめにセクション */}
          <button
            onClick={scrollToIntro}
            className={`w-full text-left p-2 rounded-lg transition-all duration-300 japanese-text transform hover:scale-[1.02] hover:shadow-md ${
              activeSection === 'intro'
                ? 'bg-blue-100 text-blue-800 font-bold shadow-lg border-l-4 border-blue-600 scale-[1.02]'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            はじめに
          </button>

          {/* 各章 */}
          {(chapters as Chapter[]).map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => scrollToChapter(chapter.id)}
              className={`w-full text-left p-2 rounded-lg transition-all duration-300 japanese-text transform hover:scale-[1.02] hover:shadow-md ${
                activeSection === `chapter-${chapter.id}`
                  ? 'bg-blue-100 text-blue-800 font-bold shadow-lg border-l-4 border-blue-600 scale-[1.02]'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
            >
              <div>
                <div className="text-xs text-gray-500 mb-1">
                  第{chapter.id}章
                </div>
                <div className="leading-tight">
                  {chapter.title.split('：')[1] || chapter.title}
                </div>
              </div>
            </button>
          ))}

          {/* トークイベント */}
          <button
            onClick={scrollToEvents}
            className={`w-full text-left p-2 rounded-lg transition-all duration-300 japanese-text transform hover:scale-[1.02] hover:shadow-md ${
              activeSection === 'events'
                ? 'bg-blue-100 text-blue-800 font-bold shadow-lg border-l-4 border-blue-600 scale-[1.02]'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            トークイベント
          </button>
        </div>
      </div>
    </div>
  )
}
