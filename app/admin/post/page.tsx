'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
    router.push('/')
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl mb-4 font-bold">新規投稿（管理者）</h1>
      <input 
        className="border p-2 w-full mb-2" 
        placeholder="タイトル" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
      />
      <textarea 
        className="border p-2 w-full mb-4 h-32" 
        placeholder="本文" 
        value={content} 
        onChange={e => setContent(e.target.value)} 
      />
      <button 
        className="bg-blue-600 text-white px-4 py-2 rounded" 
        onClick={handleSubmit}
      >
        投稿する
      </button>
    </div>
  )
}
