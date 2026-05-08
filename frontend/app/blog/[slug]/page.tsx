import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { api } from '@/lib/api'
import { BlogPostContent } from '@/components/sections/BlogPostContent'

interface PageProps {
  params: { slug: string }
}

export const revalidate = 3600

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await api.getBlogPost(params.slug)
  if (!post) {
    return { title: 'Post Not Found' }
  }
  return {
    title: post.title,
    description: post.excerpt ?? post.title,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await api.getBlogPost(params.slug)
  if (!post) {
    notFound()
  }
  return <BlogPostContent post={post} />
}