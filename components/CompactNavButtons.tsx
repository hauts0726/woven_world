'use client'

import { useState, useEffect } from 'react'
import chapters from '@/data/chapters.json'
import { Chapter } from '@/types'

export default function CompactNavButtons() {
  const [mounted, setMounted] = useState(false)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  
  // セクション定義
  const sections = [
    { id: 'top', name: 'TOP' },
    { id: 'intro', name: 'はじめに' },
    ...((chapters as Chapter[]).map(chapter => ({ 
      id: `chapter-${chapter.id}`, 
      name: `第${chapter.id}章` 
    }))),
    { id: 'events', name: 'イベント' }
  ]

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      // 100px以上スクロールしたら表示
      setIsVisible(scrollY > 100)
      
      // 現在のセクションを判定
      const sectionElements = sections.map(section => {
        const element = document.getElementById(section.id)
        if (element) {
          return {
            id: section.id,
            offsetTop: element.offsetTop,
            offsetHeight: element.offsetHeight
          }
        }
        return null
      }).filter(Boolean)
      
      const scrollPosition = scrollY + window.innerHeight / 2
      
      let foundIndex = 0
      for (let i = 0; i < sectionElements.length; i++) {
        const element = sectionElements[i]
        if (element && scrollPosition >= element.offsetTop) {
          foundIndex = i
        }
      }
      
      setCurrentSectionIndex(foundIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (index: number) => {
    if (index < 0 || index >= sections.length) return
    
    const section = sections[index]
    
    // TOPセクションの場合は一番上に戻る
    if (section.id === 'top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      return
    }
    
    const element = document.getElementById(section.id)
    
    if (element) {
      const offsetTop = element.offsetTop
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  const goToPreviousSection = () => {
    const prevIndex = Math.max(0, currentSectionIndex - 1)
    scrollToSection(prevIndex)
  }

  const goToNextSection = () => {
    const nextIndex = Math.min(sections.length - 1, currentSectionIndex + 1)
    scrollToSection(nextIndex)
  }

  if (!mounted) return null

  const canGoPrevious = currentSectionIndex > 0
  const canGoNext = currentSectionIndex < sections.length - 1

  return (
    <div 
      className={`fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 transition-all duration-500 z-50 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16 pointer-events-none'
      }`}
    >
      {/* 上矢印ボタン（前のセクションへ） */}
      <button
        onClick={goToPreviousSection}
        disabled={!canGoPrevious}
        className={`w-12 h-12 rounded-full backdrop-blur-md shadow-lg transition-all duration-700 flex items-center justify-center group ${
          canGoPrevious
            ? 'bg-white/20 hover:bg-white/30 text-gray-700 hover:text-gray-900 border border-white/30 hover:border-white/50 hover:shadow-lg hover:scale-105'
            : 'bg-gray-100/20 text-gray-400 border border-gray-200/30 cursor-not-allowed opacity-50'
        }`}
        title={canGoPrevious ? `${sections[currentSectionIndex - 1]?.name}へ` : '最初のセクションです'}
      >
        <svg 
          className={`w-5 h-5 transition-transform duration-300 ${canGoPrevious ? 'group-hover:-translate-y-0.5' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* 下矢印ボタン（次のセクションへ） */}
      <button
        onClick={goToNextSection}
        disabled={!canGoNext}
        className={`w-12 h-12 rounded-full backdrop-blur-md shadow-lg transition-all duration-700 flex items-center justify-center group ${
          canGoNext
            ? 'bg-white/20 hover:bg-white/30 text-gray-700 hover:text-gray-900 border border-white/30 hover:border-white/50 hover:shadow-lg hover:scale-105'
            : 'bg-gray-100/20 text-gray-400 border border-gray-200/30 cursor-not-allowed opacity-50'
        }`}
        title={canGoNext ? `${sections[currentSectionIndex + 1]?.name}へ` : '最後のセクションです'}
      >
        <svg 
          className={`w-5 h-5 transition-transform duration-300 ${canGoNext ? 'group-hover:translate-y-0.5' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 現在のセクション表示 */}
      <div className="mt-2 text-center">
        <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 border border-white/30">
          <span className="text-xs text-gray-700 font-medium">
            {sections[currentSectionIndex]?.name}
          </span>
        </div>
      </div>
    </div>
  )
}
