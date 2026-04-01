'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, ExternalLink, Calendar, CheckCircle } from 'lucide-react'
import { api, Project } from '@/lib/api'
import { formatDateRange } from '@/lib/utils'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card overflow-hidden group"
    >
      <div className="grid lg:grid-cols-5">
        {/* Image */}
        <div className="lg:col-span-2 relative min-h-[200px] lg:min-h-[300px] bg-gradient-to-br from-primary-500/20 via-secondary-500/10 to-primary-500/20 overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 
                              flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
          )}
          
          {/* Featured badge */}
          {project.is_featured && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 
                            rounded-full text-xs font-semibold text-white shadow-lg">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 p-6 lg:p-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-dark-400">
            {project.start_date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary-400" />
                {formatDateRange(project.start_date, project.end_date)}
              </span>
            )}
            {project.category && (
              <span className="px-2 py-0.5 bg-primary-500/10 text-primary-400 rounded text-xs capitalize">
                {project.category}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-xl lg:text-2xl font-bold text-white font-heading mb-3 
                         group-hover:text-primary-400 transition-colors">
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-dark-300 mb-4 line-clamp-3">
            {project.short_description || project.description}
          </p>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <ul className="space-y-2 mb-4">
              {project.highlights.slice(0, 3).map((highlight, i) => (
                <li key={i} className="flex items-start gap-2 text-dark-400 text-sm">
                  <CheckCircle className="w-4 h-4 text-secondary-400 flex-shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span key={tech} className="tag text-xs">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary text-sm py-2.5"
              >
                <Github className="w-4 h-4" />
                <span>View Code</span>
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary text-sm py-2.5"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="grid lg:grid-cols-5">
        <div className="lg:col-span-2 min-h-[200px] lg:min-h-[300px] bg-dark-700" />
        <div className="lg:col-span-3 p-6 lg:p-8">
          <div className="h-4 bg-dark-700 rounded w-1/4 mb-4" />
          <div className="h-6 bg-dark-700 rounded w-3/4 mb-4" />
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-dark-700 rounded w-full" />
            <div className="h-4 bg-dark-700 rounded w-5/6" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 bg-dark-700 rounded w-20" />
            <div className="h-8 bg-dark-700 rounded w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Tech cloud data
const technologies = [
  'Python', 'TensorFlow', 'PyTorch', 'DeepXDE', 'NumPy', 'SciPy',
  'Pandas', 'OpenFOAM', 'MATLAB', 'C++', 'Flask', 'PostgreSQL'
]

export function ProjectsContent() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await api.getProjects()
        setProjects(data || [])
      } catch (err) {
        console.error('Failed to load projects:', err)
        setProjects([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
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
              Projects
            </h1>
            <p className="text-dark-400 max-w-xl mx-auto">
              Exploring the intersection of Physics, AI, and Computational Science
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section pt-0">
        <div className="container mx-auto px-6">
          <div className="space-y-8 max-w-5xl mx-auto">
            {isLoading ? (
              <>
                <ProjectSkeleton />
                <ProjectSkeleton />
                <ProjectSkeleton />
              </>
            ) : projects.length > 0 ? (
              projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-dark-400">No projects found.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Technologies Cloud */}
      <section className="section bg-dark-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Technologies & Tools</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
          >
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="tag"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}