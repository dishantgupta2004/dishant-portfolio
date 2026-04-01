'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, ExternalLink, Briefcase, GraduationCap, FlaskConical, Users } from 'lucide-react'
import { api, Experience } from '@/lib/api'
import { formatDateRange, cn } from '@/lib/utils'

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  work: Briefcase,
  internship: GraduationCap,
  research: FlaskConical,
  leadership: Users,
}

const categoryColors: Record<string, string> = {
  work: 'from-primary-500 to-primary-600',
  internship: 'from-secondary-500 to-secondary-600',
  research: 'from-violet-500 to-violet-600',
  leadership: 'from-amber-500 to-amber-600',
}

interface ExperienceCardProps {
  experience: Experience
  index: number
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const Icon = categoryIcons[experience.category] || Briefcase
  const gradientColor = categoryColors[experience.category] || 'from-primary-500 to-primary-600'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="timeline-item"
    >
      {/* Timeline dot with icon */}
      <div className={cn(
        'absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center',
        'transform -translate-x-1/2 border-4 border-dark-950 bg-gradient-to-br',
        gradientColor
      )}>
        <Icon className="w-4 h-4 text-white" />
      </div>

      {/* Card Content */}
      <div className="ml-6 card p-6 hover:border-primary-500/30">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xl font-bold text-white font-heading">
              {experience.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {experience.company_url ? (
                <a
                  href={experience.company_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors"
                >
                  {experience.company}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-primary-400">{experience.company}</span>
              )}
            </div>
          </div>

          {experience.is_current && (
            <span className="px-3 py-1 bg-secondary-500/20 text-secondary-400 rounded-full text-xs font-medium border border-secondary-500/30">
              Current
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-dark-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary-400" />
            {formatDateRange(experience.start_date, experience.end_date)}
          </span>
          {experience.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary-400" />
              {experience.location}
            </span>
          )}
        </div>

        {/* Description */}
        {experience.description && (
          <p className="text-dark-300 mb-4 leading-relaxed">
            {experience.description}
          </p>
        )}

        {/* Highlights */}
        {experience.highlights && experience.highlights.length > 0 && (
          <ul className="space-y-2 mb-4">
            {experience.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2 text-dark-300 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {/* Technologies */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
            {experience.technologies.map((tech) => (
              <span key={tech} className="tag text-xs">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function ExperienceSkeleton() {
  return (
    <div className="timeline-item animate-pulse">
      <div className="ml-6 card p-6">
        <div className="h-6 bg-dark-700 rounded w-2/3 mb-3" />
        <div className="h-4 bg-dark-700 rounded w-1/3 mb-4" />
        <div className="flex gap-4 mb-4">
          <div className="h-4 bg-dark-700 rounded w-24" />
          <div className="h-4 bg-dark-700 rounded w-32" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-dark-700 rounded w-full" />
          <div className="h-3 bg-dark-700 rounded w-5/6" />
          <div className="h-3 bg-dark-700 rounded w-4/6" />
        </div>
      </div>
    </div>
  )
}

export function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const data = await api.getExperiences()
        setExperiences(data || [])
      } catch (err) {
        setError('Failed to load experiences')
        console.error(err)
        setExperiences([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  return (
    <section className="section bg-dark-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Experience</h2>
          <p className="text-dark-400 max-w-2xl mx-auto mt-4">
            My professional journey in research, technology, and entrepreneurship
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-primary-500/20" />
            
            <div className="space-y-8">
              {isLoading ? (
                <>
                  <ExperienceSkeleton />
                  <ExperienceSkeleton />
                  <ExperienceSkeleton />
                </>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-400">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 btn btn-secondary"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                experiences.map((experience, index) => (
                  <ExperienceCard 
                    key={experience.id} 
                    experience={experience} 
                    index={index}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}