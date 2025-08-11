'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import chapters from '@/data/chapters.json'
import { Chapter } from '@/types'

export default function MinimalNavigation() {
  const [currentSection, setCurrentSection] = useState<string>('top')
  const [navPosition, setNavPosition] = useState<number>(80)
  const router = useRouter()

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight

    // セクション要素を取得
    const sections = [
      { id: 'top', element: document.documentElement, offset: 0 },
      { id: 'intro', element: document.getElementById('intro') },
      { id: 'chapters', element: document.getElementById('chapters') },
      ...chapters.map(chapter => ({
        id: `chapter-${chapter.id}`,
        element: document.querySelector(`[data-chapter-id="${chapter.id}"]`)
      })),
      { id: 'events', element: document.getElementById('events') }
    ]

    // 現在のスクロール位置に基づいてアクティブセクションを決定
    let currentActiveSection = 'top'

    // ページの最下部近くの場合、eventsセクションをアクティブにする
    if (scrollPosition + windowHeight >= document.documentElement.scrollHeight - 100) {
      currentActiveSection = 'events'
    }
    // ページトップ付近の場合
    else if (scrollPosition < 200) {
      currentActiveSection = 'top'
    } 
    else {
      // 各セクションをチェック（下から上へ）
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element && section.id !== 'top') {
          const rect = section.element.getBoundingClientRect()
          const elementTop = scrollPosition + rect.top
          
          // セクションの上部がスクロール位置を超えた場合、そのセクションをアクティブにする
          if (scrollPosition >= elementTop - 300) {
            currentActiveSection = section.id
            break
          }
        }
      }
    }

    setCurrentSection(currentActiveSection)

    // ナビゲーションの位置を右上に固定
    const targetPosition = scrollPosition + 20
    setNavPosition(targetPosition)
  }, [])

  useEffect(() => {
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

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    window.addEventListener('resize', throttledHandleScroll, { passive: true })
    
    setTimeout(() => {
      handleScroll()
    }, 100)

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
      window.removeEventListener('resize', throttledHandleScroll)
    }
  }, [handleScroll])

  // 現在のセクションに基づいて次のアクションを決定
  const getNextAction = () => {
    if (currentSection === 'top') {
      return {
        label: 'はじめに',
        action: () => {
          const element = document.getElementById('intro')
          if (element) {
            const elementTop = element.getBoundingClientRect().top + window.scrollY
            window.scrollTo({ top: elementTop - 75, behavior: 'smooth' })
          }
        }
      }
    }
    
    if (currentSection === 'intro') {
      return {
        label: '第1章へ',
        action: () => router.push('/chapters/1')
      }
    }
    
    if (currentSection === 'chapters') {
      return {
        label: '第1章へ',
        action: () => router.push('/chapters/1')
      }
    }
    
    if (currentSection.startsWith('chapter-')) {
      const chapterId = parseInt(currentSection.replace('chapter-', ''))
      const nextChapter = chapterId + 1
      
      if (nextChapter <= chapters.length) {
        return {
          label: `第${nextChapter}章へ`,
          action: () => router.push(`/chapters/${nextChapter}`)
        }
      } else {
        return {
          label: 'イベントへ',
          action: () => {
            const element = document.getElementById('events')
            if (element) {
              const elementTop = element.getBoundingClientRect().top + window.scrollY
              window.scrollTo({ top: elementTop - 75, behavior: 'smooth' })
            }
          }
        }
      }
    }
    
    if (currentSection === 'events') {
      return {
        label: 'トップへ',
        action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    
    return null
  }

  // 現在のセクション名を取得
  const getCurrentSectionName = () => {
    if (currentSection === 'top') return 'トップ'
    if (currentSection === 'intro') return 'はじめに'
    if (currentSection === 'chapters') return '章一覧'
    if (currentSection.startsWith('chapter-')) {
      const chapterId = parseInt(currentSection.replace('chapter-', ''))
      const chapter = chapters.find(c => c.id === chapterId)
      return chapter ? `第${chapterId}章` : '章'
    }
    if (currentSection === 'events') return 'イベント'
    return ''
  }

  const nextAction = getNextAction()

  return (
    <div 
      className="fixed right-6 z-50 transition-all duration-500 ease-out"
      style={{ top: `${navPosition}px` }}
    >
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-4 min-w-[200px]">
        {/* 現在のセクション表示 */}
        <div className="text-center mb-3">
          <div className="text-xs text-gray-500 mb-1 japanese-text">現在</div>
          <div className="text-sm font-medium text-gray-800 japanese-text">
            {getCurrentSectionName()}
          </div>
        </div>
        
        {/* 区切り線 */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-3"></div>
        
        {/* 次のアクションボタン */}
        {nextAction && (
          <button
            onClick={nextAction.action}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg japanese-text text-sm font-medium"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>{nextAction.label}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        )}
        
        {/* 章一覧ボタン（常に表示） */}
        <button
          onClick={() => {
            const element = document.getElementById('chapters')
            if (element) {
              const elementTop = element.getBoundingClientRect().top + window.scrollY
              window.scrollTo({ top: elementTop - 75, behavior: 'smooth' })
            }
          }}
          className="w-full mt-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg transition-all duration-300 japanese-text text-xs"
        >
          章一覧を見る
        </button>
      </div>
    </div>
  )
}
