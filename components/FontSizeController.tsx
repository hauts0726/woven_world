'use client'

import { useState, useEffect } from 'react'

interface FontSizeControllerProps {
  onFontSizeChange: (size: number) => void
  initialSize?: number
}

export default function FontSizeController({ onFontSizeChange, initialSize = 1 }: FontSizeControllerProps) {
  const [fontSize, setFontSize] = useState(initialSize)

  useEffect(() => {
    // ローカルストレージから保存された文字サイズを読み込み
    const savedSize = localStorage.getItem('fontSizeMultiplier')
    if (savedSize) {
      const size = parseFloat(savedSize)
      setFontSize(size)
      onFontSizeChange(size)
    }
  }, [onFontSizeChange])

  const handleSizeChange = (newSize: number) => {
    setFontSize(newSize)
    onFontSizeChange(newSize)
    // ローカルストレージに保存
    localStorage.setItem('fontSizeMultiplier', newSize.toString())
    
    // CSS変数を設定してグローバルに適用
    document.documentElement.style.setProperty('--font-size-multiplier', newSize.toString())
  }

  const presetSizes = [
    { label: '小', value: 0.8 },
    { label: '標準', value: 1.0 },
    { label: '大', value: 1.2 },
    { label: '特大', value: 1.5 },
    { label: '最大', value: 2.0 }
  ]

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-gray-200">
      <div className="text-sm font-medium text-gray-700 mb-3 japanese-text">
        文字サイズ調整
      </div>
      
      {/* プリセットボタン */}
      <div className="flex flex-wrap gap-2 mb-3">
        {presetSizes.map((preset) => (
          <button
            key={preset.value}
            onClick={() => handleSizeChange(preset.value)}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              fontSize === preset.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* スライダー */}
      <div className="space-y-2">
        <input
          type="range"
          min="0.5"
          max="3.0"
          step="0.1"
          value={fontSize}
          onChange={(e) => handleSizeChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="text-xs text-gray-600 text-center">
          {Math.round(fontSize * 100)}%
        </div>
      </div>

      {/* リセットボタン */}
      <button
        onClick={() => handleSizeChange(1.0)}
        className="w-full mt-3 px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
      >
        リセット
      </button>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  )
}
