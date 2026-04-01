'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Github } from 'lucide-react'

export function FeaturedProjectSection() {
  const project = {
    title: 'AI-Driven Anti-Hailstorm System',
    description: 'Engineering a Physics-Informed Neural Network (PINN) model to solve inverse problems related to hailstorm prediction, using cutting-edge deep learning techniques integrated with physics-based modeling.',
    highlights: [
      'Developed a hailstorm impact mitigation system using real-time weather data',
      'Applied numerical methods to optimize anti-hail net deployment',
      'Integrated computational physics with deep learning for weather prediction',
    ],
    technologies: ['TensorFlow', 'DeepXDE', 'Python', 'OpenFOAM'],
    githubUrl: 'https://github.com/dishantgupta2004/Radar-Hail-Prediction-Model',
  }

  return (
    <section className="section">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Featured Project</h2>
          <p className="text-dark-400 max-w-2xl mx-auto mt-4">
            Solving real-world problems with physics and AI
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card overflow-hidden"
        >
          <div className="grid lg:grid-cols-2">
            {/* Image/Visual */}
            <div className="relative min-h-[300px] lg:min-h-[400px] bg-gradient-to-br from-primary-500/20 via-secondary-500/10 to-primary-500/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 
                                  flex items-center justify-center shadow-glow-md">
                    <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" />
                      <polyline points="13 11 9 17 15 17 11 23" />
                    </svg>
                  </div>
                  <p className="text-dark-300 text-sm px-4">
                    Real-time weather prediction using PINNs
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-20 h-20 border border-white/10 rounded-xl" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border border-white/10 rounded-lg" />
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-white font-heading mb-4">
                {project.title}
              </h3>
              
              <p className="text-dark-300 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-3 mb-6">
                {project.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-dark-300"
                  >
                    <CheckCircle className="w-5 h-5 text-secondary-400 flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tag text-sm">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <Github className="w-4 h-4" />
                  <span>View on GitHub</span>
                </a>
                <Link href="/projects" className="btn btn-secondary">
                  <span>All Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
