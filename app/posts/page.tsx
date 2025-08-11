'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  content: string
  createdAt: string
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const response = await fetch('/api/posts')
    const data = await response.json()
    setPosts(data)
  }

  const handleDelete = async (id: number) => {
    if (confirm('この投稿を削除しますか？')) {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' })
      fetchPosts() // リストを再取得
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">投稿一覧</h1>
        <Link 
          href="/admin/post" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          新規投稿
        </Link>
      </div>
      
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center py-8">投稿がありません</p>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <Link href={`/post/${post.id}`} className="flex-1">
                  <h2 className="text-xl font-semibold hover:text-blue-600 cursor-pointer">
                    {post.title}
                  </h2>
                </Link>
                <div className="flex gap-2 ml-4">
                  <Link 
                    href={`/admin/edit/${post.id}`} 
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    編集
                  </Link>
                  <button 
                    onClick={() => handleDelete(post.id)} 
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    削除
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">
                {new Date(post.createdAt).toLocaleDateString('ja-JP')}
              </p>
              
              <p className="text-gray-700 line-clamp-3">
                {post.content.length > 200 
                  ? post.content.substring(0, 200) + '...' 
                  : post.content
                }
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
