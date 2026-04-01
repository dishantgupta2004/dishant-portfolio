'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Tag, BookOpen } from 'lucide-react'
import { api, BlogPost } from '@/lib/api'
import { formatDate, cn } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
  index: number
  featured?: boolean
}

function BlogCard({ post, index, featured = false }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn('card overflow-hidden group', featured && 'md:col-span-2')}
    >
      <div className={cn('grid', featured && 'md:grid-cols-2')}>
        {/* Image */}
        <div className={cn(
          'relative bg-gradient-to-br from-primary-500/20 via-secondary-500/10 to-primary-500/20',
          featured ? 'min-h-[250px]' : 'h-[200px]'
        )}>
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 
                              flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta */}
          <div className="flex flex-wrap gap-4 mb-3 text-sm text-dark-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary-400" />
              {formatDate(post.published_at || post.created_at)}
            </span>
            {post.reading_time && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary-400" />
                {post.reading_time} min read
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className={cn(
            'font-bold text-white font-heading mb-3 group-hover:text-primary-400 transition-colors',
            featured ? 'text-2xl' : 'text-xl'
          )}>
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className={cn(
            'text-dark-300 mb-4',
            featured ? 'line-clamp-3' : 'line-clamp-2'
          )}>
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="flex items-center gap-1 text-xs text-primary-400 bg-primary-500/10 
                                          px-2 py-1 rounded-full">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Read More */}
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-primary-400 font-medium group/link"
          >
            Read More
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

function BlogSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div className={cn('card overflow-hidden animate-pulse', featured && 'md:col-span-2')}>
      <div className={cn('grid', featured && 'md:grid-cols-2')}>
        <div className={cn('bg-dark-700', featured ? 'min-h-[250px]' : 'h-[200px]')} />
        <div className="p-6">
          <div className="flex gap-4 mb-3">
            <div className="h-4 bg-dark-700 rounded w-24" />
            <div className="h-4 bg-dark-700 rounded w-20" />
          </div>
          <div className="h-7 bg-dark-700 rounded w-3/4 mb-3" />
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-dark-700 rounded w-full" />
            <div className="h-3 bg-dark-700 rounded w-5/6" />
          </div>
          <div className="flex gap-2 mb-4">
            <div className="h-6 bg-dark-700 rounded-full w-16" />
            <div className="h-6 bg-dark-700 rounded-full w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function BlogContent() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await api.getBlogPosts(currentPage, 10)
        setPosts(data.posts || [])
        setTotalPages(data.pages || 1)
      } catch (err) {
        console.error('Failed to load blog posts:', err)
        // Show empty state
        setPosts([])
        setTotalPages(1)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [currentPage])

  return (
    <>
      {/* Header */}
      <section className="section bg-dark-900/50 pb-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-heading gradient-text mb-4">
              Blog
            </h1>
            <p className="text-dark-400 max-w-xl mx-auto">
              Thoughts on Physics, AI, Research, and the intersection of Science and Technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="section pt-0">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <BlogSkeleton featured />
              <BlogSkeleton />
              <BlogSkeleton />
            </div>
          ) : !posts || posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 max-w-md mx-auto"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 
                              flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-primary-400" />
              </div>
              <h2 className="text-xl font-bold text-white font-heading mb-3">
                Blog Coming Soon
              </h2>
              <p className="text-dark-400 mb-6">
                I'm working on some exciting articles about Physics-Informed Neural Networks, 
                Computational Physics, and AI research. Check back soon!
              </p>
              <Link href="/publications" className="btn btn-primary">
                View Publications
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {posts.map((post, index) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    index={index}
                    featured={index === 0}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        'w-10 h-10 rounded-lg font-medium transition-colors',
                        page === currentPage
                          ? 'bg-primary-500 text-white'
                          : 'bg-white/5 text-dark-300 hover:bg-white/10'
                      )}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section bg-dark-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-white font-heading mb-4">
              Stay Updated
            </h2>
            <p className="text-dark-400 mb-6">
              Follow my research and get notified about new articles and publications.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://www.linkedin.com/in/dishant-gupta-44067926a/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Follow on LinkedIn
              </a>
              <Link href="/contact" className="btn btn-secondary">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}