'use client'

import { Chapter, Artist } from '@/types'

interface ChapterSummaryProps {
  chapter?: Chapter
  artists?: Artist[]
}

export default function ChapterSummary({ chapter, artists }: ChapterSummaryProps) {
  // 常に何も表示しない
  return null
}
