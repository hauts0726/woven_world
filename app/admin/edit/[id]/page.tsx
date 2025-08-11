'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditPostPage() {
  const router = useRouter()
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch(`/api/posts`).then(res => res.json()).then(data => {
      const target = data.find((p: any) => p.id.toString() === id)
      if (target) {
        setTitle(target.title)
        setContent(target.content)
      }
    })
  }, [id])

  const handleUpdate = async () => {
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
    router.push('/')
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">投稿編集</h1>
      <input 
        className="border p-2 w-full mb-2" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
      />
      <textarea 
        className="border p-2 w-full mb-4 h-32" 
        value={content} 
        onChange={e => setContent(e.target.value)} 
      />
      <button 
        className="bg-green-600 text-white px-4 py-2 rounded" 
        onClick={handleUpdate}
      >
        更新
      </button>
    </div>
  )
}
