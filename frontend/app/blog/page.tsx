import { Metadata } from 'next'
import { BlogContent } from '@/components/sections/BlogContent'
import { api } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles and insights on Physics-Informed Neural Networks, AI, and Computational Science by Dishant Gupta',
}

export const revalidate = 3600

export default async function BlogPage() {
  const { posts, pages, total } = await api.getBlogPosts(1, 10)
  return <BlogContent initialPosts={posts} initialTotalPages={pages} initialTotal={total} />
}