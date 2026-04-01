'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, GraduationCap, Clock, Signal, CheckCircle, Users, Award, Smartphone, Mail } from 'lucide-react'
import Link from 'next/link'
import { api, Course } from '@/lib/api'

interface CourseCardProps {
  course: Course
  index: number
}

function CourseCard({ course, index }: CourseCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card overflow-hidden group relative"
    >
      {/* Featured Badge */}
      {course.is_featured && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 
                        rounded-full text-white text-xs font-semibold flex items-center gap-1">
          <Award className="w-3 h-3" />
          Featured
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary-500/20 via-secondary-500/10 to-violet-500/20 
                      flex items-center justify-center overflow-hidden">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 
                        flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-12 h-12 border border-white/10 rounded-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border border-white/10 rounded" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-dark-400">
          {course.level && (
            <span className="flex items-center gap-1.5">
              <Signal className="w-4 h-4 text-primary-400" />
              {course.level}
            </span>
          )}
          {course.duration && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary-400" />
              {course.duration}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white font-heading mb-3 group-hover:text-primary-400 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-dark-300 mb-4 line-clamp-2">
          {course.short_description}
        </p>

        {/* Features */}
        {course.features && course.features.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm text-primary-400 font-medium mb-2">What's Included:</h4>
            <ul className="space-y-1.5">
              {course.features.slice(0, 4).map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-dark-400 text-sm">
                  <CheckCircle className="w-4 h-4 text-secondary-400 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
              {course.features.length > 4 && (
                <li className="text-primary-400 text-sm italic">
                  + {course.features.length - 4} more features
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-dark-500 text-sm">{course.price}</span>
          {course.url && (
            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-sm py-2 px-4"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Enroll Now</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function CourseSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="h-48 bg-dark-700" />
      <div className="p-6">
        <div className="flex gap-4 mb-4">
          <div className="h-4 bg-dark-700 rounded w-20" />
          <div className="h-4 bg-dark-700 rounded w-24" />
        </div>
        <div className="h-6 bg-dark-700 rounded w-3/4 mb-3" />
        <div className="h-4 bg-dark-700 rounded w-full mb-2" />
        <div className="h-4 bg-dark-700 rounded w-5/6 mb-6" />
        <div className="space-y-2 mb-6">
          <div className="h-3 bg-dark-700 rounded w-2/3" />
          <div className="h-3 bg-dark-700 rounded w-1/2" />
        </div>
      </div>
    </div>
  )
}

const benefits = [
  {
    icon: Users,
    title: 'Expert Instruction',
    description: 'Learn from researchers and practitioners with real industry experience in AI, ML, and Data Science.',
  },
  {
    icon: GraduationCap,
    title: 'Hands-on Projects',
    description: 'Build a portfolio with real-world projects that demonstrate your skills to potential employers.',
  },
  {
    icon: Award,
    title: 'Certification',
    description: 'Earn certificates upon completion to showcase your achievements and boost your resume.',
  },
]

export function CoursesContent() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await api.getCourses()
        setCourses(data)
      } catch (err) {
        console.error('Failed to load courses:', err)
        // Fallback to static data
        setCourses([
          {
            id: 1,
            title: 'Python Programming',
            short_description: 'Complete Python programming course from basics to advanced concepts with hands-on projects.',
            url: 'https://classplusapp.com/w/unisole-empower/courses/751561',
            price: 'Contact for pricing',
            duration: 'Self-paced',
            level: 'Beginner to Advanced',
            features: ['Complete Python fundamentals', 'Object-Oriented Programming', 'Data structures & algorithms', 'Real-world projects', 'Certificate of completion'],
            is_featured: true,
            order: 1,
            description: null,
            image: null
          },
          {
            id: 2,
            title: 'Full Stack Data Science Pro',
            short_description: 'Comprehensive Data Science course covering ML, DL, NLP, Computer Vision, and industry deployment practices.',
            url: 'https://classplusapp.com/w/unisole-empower/courses/723989',
            price: 'Contact for pricing',
            duration: 'Self-paced',
            level: 'Intermediate to Advanced',
            features: ['Machine Learning fundamentals', 'Deep Learning with TensorFlow/PyTorch', 'Natural Language Processing', 'Computer Vision projects', 'MLOps and deployment', 'Placement assistance'],
            is_featured: true,
            order: 2,
            description: null,
            image: null
          }
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
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
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-heading gradient-text mb-4">
              Courses
            </h1>
            <p className="text-dark-400 max-w-xl mx-auto">
              Learn Data Science, Machine Learning & Python with industry-relevant curriculum
            </p>
          </motion.div>

          {/* Unisole Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card p-8 flex flex-col md:flex-row items-center gap-6 max-w-4xl mx-auto"
          >
            <div className="flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 
                            flex items-center justify-center shadow-glow-sm">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-primary-400 font-heading mb-2">
                Unisole Empower
              </h2>
              <p className="text-dark-300">
                As <strong className="text-white">Co-Founder & CTO</strong> of Unisole Empower, I'm committed to 
                providing quality AI education and building a community of learners. Our courses bridge the gap 
                between academic knowledge and industry requirements.
              </p>
              <div className="flex flex-wrap gap-8 mt-4 justify-center md:justify-start">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-primary-400">100+</span>
                  <span className="text-dark-500 text-sm">Students</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-primary-400">2</span>
                  <span className="text-dark-500 text-sm">Courses</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-primary-400">24/7</span>
                  <span className="text-dark-500 text-sm">Support</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section pt-0">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-title mb-12"
          >
            Available Courses
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {isLoading ? (
              <>
                <CourseSkeleton />
                <CourseSkeleton />
              </>
            ) : (
              courses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-dark-900/50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title mb-12"
          >
            Why Learn with Us?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-8 text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 
                                flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading mb-3">
                  {benefit.title}
                </h3>
                <p className="text-dark-400 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-dark-400 mb-8">
              Join our growing community of learners and take the first step towards a career in Data Science and AI.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://clpsheldon.page.link/mEpf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <Smartphone className="w-4 h-4" />
                <span>Download the App</span>
              </a>
              <Link href="/contact" className="btn btn-secondary">
                <Mail className="w-4 h-4" />
                <span>Contact Us</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
