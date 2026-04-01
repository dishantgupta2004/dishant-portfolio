'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft, Tag, Share2, Linkedin, Github } from 'lucide-react'
import { api, BlogPost } from '@/lib/api'
import { formatDate } from '@/lib/utils'

function BlogPostSkeleton() {
  return (
    <div className="animate-pulse max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="h-4 bg-dark-700 rounded w-32 mb-4" />
        <div className="h-10 bg-dark-700 rounded w-3/4 mb-4" />
        <div className="flex gap-4 mb-6">
          <div className="h-4 bg-dark-700 rounded w-24" />
          <div className="h-4 bg-dark-700 rounded w-20" />
        </div>
      </div>
      <div className="h-[400px] bg-dark-700 rounded-xl mb-8" />
      <div className="space-y-4">
        <div className="h-4 bg-dark-700 rounded w-full" />
        <div className="h-4 bg-dark-700 rounded w-full" />
        <div className="h-4 bg-dark-700 rounded w-5/6" />
        <div className="h-4 bg-dark-700 rounded w-full" />
        <div className="h-4 bg-dark-700 rounded w-4/6" />
      </div>
    </div>
  )
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string

  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await api.getBlogPost(slug)
        setPost(data)
      } catch (err) {
        setError('Post not found')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  if (isLoading) {
    return (
      <section className="section">
        <div className="container mx-auto px-6">
          <BlogPostSkeleton />
        </div>
      </section>
    )
  }

  if (error || !post) {
    return (
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="text-center py-16 max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-white font-heading mb-4">
              Post Not Found
            </h1>
            <p className="text-dark-400 mb-6">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/blog" className="btn btn-primary">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Header */}
      <section className="section bg-dark-900/50 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-heading mb-4"
            >
              {post.title}
            </motion.h1>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 text-dark-400"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-400" />
                {formatDate(post.published_at || post.created_at)}
              </span>
              {post.reading_time && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary-400" />
                  {post.reading_time} min read
                </span>
              )}
            </motion.div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-2 mt-4"
              >
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-sm text-primary-400 bg-primary-500/10 px-3 py-1 rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.cover_image && (
        <div className="container mx-auto px-6 -mt-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden"
          >
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      )}

      {/* Content */}
      <section className="section pt-0">
        <div className="container mx-auto px-6">
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto prose prose-invert prose-lg
                       prose-headings:font-heading prose-headings:text-white
                       prose-p:text-dark-300 prose-a:text-primary-400 
                       prose-strong:text-white prose-code:text-primary-300
                       prose-pre:bg-dark-800 prose-pre:border prose-pre:border-white/10"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />

          {/* Share */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-3xl mx-auto mt-12 pt-8 border-t border-white/10"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary-400" />
                Share this post
              </h3>
              <div className="flex gap-3">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    typeof window !== 'undefined' ? window.location.href : ''
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center
                           text-dark-300 hover:bg-primary-500 hover:text-white transition-all"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-3xl mx-auto mt-12"
          >
            <div className="card p-6 flex gap-6 items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary-500 to-secondary-500">
                <Image
                  src="/images/profile.jpg"
                  alt="Dishant Gupta"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white font-heading mb-1">
                  Dishant Gupta
                </h4>
                <p className="text-dark-400 text-sm mb-3">
                  Computational Physics & AI Researcher | Co-Founder, Unisole Empower
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/dishant-gupta-44067926a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="https://github.com/dishantgupta2004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
