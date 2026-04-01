'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, ExternalLink, Mail, CheckCircle, Loader2, Brain, Atom, Cpu, Cloud } from 'lucide-react'
import { api, Publication } from '@/lib/api'

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  published: { bg: 'bg-secondary-500/20', text: 'text-secondary-400', label: 'Published' },
  in_review: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'In Review' },
  in_development: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'In Development' },
}

const researchInterests = [
  {
    icon: Brain,
    title: 'Physics-Informed Neural Networks',
    description: 'Developing novel PINN architectures for solving complex PDEs and inverse problems',
    gradient: 'from-blue-500 to-violet-500',
  },
  {
    icon: Atom,
    title: 'Computational Physics',
    description: 'Numerical methods, FEM, and simulation techniques for physical systems',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Cpu,
    title: 'Semiconductor Research',
    description: 'Computational models for CVD and semiconductor device physics',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Cloud,
    title: 'Meteorological AI',
    description: 'AI-driven systems for weather prediction and agricultural applications',
    gradient: 'from-cyan-500 to-blue-500',
  },
]

function PublicationCard({ publication, index }: { publication: Publication; index: number }) {
  const status = statusColors[publication.status || 'in_development']

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card p-6 lg:p-8 border-l-4 border-primary-500"
    >
      {/* Type Badge */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 
                         text-white text-xs font-semibold rounded-full capitalize">
          {publication.publication_type || 'Research Paper'}
        </span>
        <span className={`px-3 py-1 ${status.bg} ${status.text} text-xs font-medium rounded-full flex items-center gap-1.5`}>
          {publication.status === 'in_development' && <Loader2 className="w-3 h-3 animate-spin" />}
          {status.label}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-xl lg:text-2xl font-bold text-white font-heading mb-3 leading-tight">
        {publication.title}
      </h2>

      {/* Meta */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-dark-400">
        <span className="flex items-center gap-1.5">
          <span className="text-primary-400">Authors:</span>
          {publication.authors}
        </span>
        {publication.year && (
          <span className="flex items-center gap-1.5">
            <span className="text-primary-400">Year:</span>
            {publication.year}
          </span>
        )}
      </div>

      {/* Abstract */}
      {publication.abstract && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-primary-400 mb-2">Abstract</h3>
          <p className="text-dark-300 leading-relaxed">
            {publication.abstract}
          </p>
        </div>
      )}

      {/* Highlights */}
      {publication.highlights && publication.highlights.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-primary-400 mb-3">Research Highlights</h3>
          <ul className="space-y-2">
            {publication.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2 text-dark-300 text-sm">
                <CheckCircle className="w-4 h-4 text-secondary-400 flex-shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
        {publication.pdf_url && (
          <a
            href={publication.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary text-sm py-2.5"
          >
            <FileText className="w-4 h-4" />
            <span>View Abstract</span>
          </a>
        )}
        <a
          href={`/contact?subject=Access request: ${encodeURIComponent(publication.title.slice(0, 50))}`}
          className="btn btn-primary text-sm py-2.5"
        >
          <Mail className="w-4 h-4" />
          <span>Request Full Access</span>
        </a>
      </div>
    </motion.article>
  )
}

function PublicationSkeleton() {
  return (
    <div className="card p-6 lg:p-8 border-l-4 border-dark-600 animate-pulse">
      <div className="flex gap-3 mb-4">
        <div className="h-6 bg-dark-700 rounded-full w-24" />
        <div className="h-6 bg-dark-700 rounded-full w-28" />
      </div>
      <div className="h-7 bg-dark-700 rounded w-3/4 mb-4" />
      <div className="h-4 bg-dark-700 rounded w-1/3 mb-4" />
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-dark-700 rounded w-full" />
        <div className="h-4 bg-dark-700 rounded w-5/6" />
        <div className="h-4 bg-dark-700 rounded w-4/6" />
      </div>
      <div className="flex gap-3">
        <div className="h-10 bg-dark-700 rounded-full w-32" />
        <div className="h-10 bg-dark-700 rounded-full w-40" />
      </div>
    </div>
  )
}

export function PublicationsContent() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPublications() {
      try {
        const data = await api.getPublications()
        setPublications(data || [])
      } catch (err) {
        console.error('Failed to load publications:', err)
        setPublications([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchPublications()
  }, [])

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
              Publications & Research
            </h1>
            <p className="text-dark-400 max-w-xl mx-auto">
              Advancing knowledge at the intersection of physics and artificial intelligence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Publications List */}
      <section className="section pt-0">
        <div className="container mx-auto px-6">
          <div className="space-y-8 max-w-4xl mx-auto">
            {isLoading ? (
              <>
                <PublicationSkeleton />
                <PublicationSkeleton />
              </>
            ) : publications.length > 0 ? (
              publications.map((publication, index) => (
                <PublicationCard key={publication.id} publication={publication} index={index} />
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-dark-400">No publications found.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section className="section bg-dark-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Research Interests</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {researchInterests.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${interest.gradient}
                                flex items-center justify-center shadow-lg
                                group-hover:scale-110 transition-transform duration-300`}>
                  <interest.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading mb-2">
                  {interest.title}
                </h3>
                <p className="text-dark-400 text-sm">
                  {interest.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}