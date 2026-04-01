'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Rocket, Smartphone, GraduationCap } from 'lucide-react'

export function AnnouncementBanner() {
  return (
    <section className="py-8 bg-gradient-to-r from-primary-500/10 via-secondary-500/5 to-primary-500/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
        >
          {/* Icon */}
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 
                          flex items-center justify-center shadow-glow-sm">
            <Rocket className="w-8 h-8 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg md:text-xl font-bold text-primary-400 font-heading mb-2">
              Unisole Empower – AI for Agriculture & Learning
            </h3>
            <p className="text-dark-300 text-sm md:text-base">
              Our <strong className="text-white">official app</strong> has been launched in partnership with{' '}
              <strong className="text-white">Classplus</strong>. Download now to explore AI-powered courses, 
              agricultural solutions, and research-driven learning.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="https://clpsheldon.page.link/mEpf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary whitespace-nowrap"
            >
              <Smartphone className="w-4 h-4" />
              <span>Get the App</span>
            </a>
            <Link href="/courses" className="btn btn-secondary whitespace-nowrap">
              <GraduationCap className="w-4 h-4" />
              <span>View Courses</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
