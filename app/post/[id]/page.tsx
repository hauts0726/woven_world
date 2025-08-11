import { prisma } from '../../../lib/prisma'
import { notFound } from 'next/navigation'

export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id: Number(id) } })
  if (!post) return notFound()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">
        {new Date(post.createdAt).toLocaleDateString('ja-JP')}
      </p>
      <div className="whitespace-pre-wrap text-gray-700">{post.content}</div>
    </div>
  )
}
