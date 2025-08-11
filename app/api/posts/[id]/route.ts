import { prisma } from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { title, content } = await req.json()
  const updated = await prisma.post.update({
    where: { id: Number(params.id) },
    data: { title, content }
  })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.post.delete({ where: { id: Number(params.id) } })
  return NextResponse.json({ message: '削除完了' })
}
