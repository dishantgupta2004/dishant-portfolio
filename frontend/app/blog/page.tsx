import { Metadata } from 'next'
import { BlogContent } from '@/components/sections/BlogContent'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles and insights on Physics-Informed Neural Networks, AI, and Computational Science by Dishant Gupta',
}

export default function BlogPage() {
  return <BlogContent />
}
