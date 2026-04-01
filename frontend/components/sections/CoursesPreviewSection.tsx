'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, GraduationCap, Code, BarChart3 } from 'lucide-react'

const courses = [
  {
    title: 'Python Programming',
    description: 'From basics to advanced concepts with hands-on projects',
    icon: Code,
    url: 'https://classplusapp.com/w/unisole-empower/courses/751561',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Full Stack Data Science Pro',
    description: 'ML, DL, NLP, Computer Vision & Industry Deployment',
    icon: BarChart3,
    url: 'https://classplusapp.com/w/unisole-empower/courses/723989',
    gradient: 'from-violet-500 to-purple-500',
  },
]

export function CoursesPreviewSection() {
  return (
    <section className="section bg-dark-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Learn with Me</h2>
          <p className="text-dark-400 max-w-xl mx-auto mt-4">
            As Co-Founder of Unisole Empower, I offer comprehensive courses in Data Science and Python Programming
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
          {courses.map((course, index) => (
            <motion.a
              key={course.title}
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="card p-8 text-center group cursor-pointer"
            >
              {/* Icon */}
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${course.gradient}
                              flex items-center justify-center shadow-lg
                              group-hover:scale-110 transition-transform duration-300`}>
                <course.icon className="w-10 h-10 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 font-heading group-hover:text-primary-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-dark-400 mb-6">
                {course.description}
              </p>

              {/* CTA */}
              <span className="inline-flex items-center gap-2 text-primary-400 font-medium group-hover:gap-3 transition-all">
                Enroll Now
                <ExternalLink className="w-4 h-4" />
              </span>
            </motion.a>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/courses" className="btn btn-primary">
            <GraduationCap className="w-4 h-4" />
            <span>View All Courses</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
