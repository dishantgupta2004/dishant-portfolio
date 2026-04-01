'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, FileText, Github, Linkedin, Mail } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-hero">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="gradient-text">Dishant Gupta</span>
            </motion.h1>

            <motion.h2 
              className="text-xl md:text-2xl lg:text-3xl text-primary-400 font-heading font-semibold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Computational Physics & AI Researcher
            </motion.h2>

            <motion.p 
              className="text-dark-300 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Co-founder at <strong className="text-white">Unisole Empower</strong> – 
              building AI solutions for agriculture and education alongside research in 
              Artificial Intelligence, Machine Learning, and Computational Modeling for 
              solving complex scientific challenges.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/projects" className="btn btn-primary">
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/publications" className="btn btn-secondary">
                <FileText className="w-4 h-4" />
                <span>Research Publications</span>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <a
                href="https://github.com/dishantgupta2004"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center
                         text-dark-300 hover:bg-primary-500 hover:text-white hover:-translate-y-1
                         transition-all duration-300"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/dishant-gupta-44067926a/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center
                         text-dark-300 hover:bg-primary-500 hover:text-white hover:-translate-y-1
                         transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:22bph016@nith.ac.in"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center
                         text-dark-300 hover:bg-primary-500 hover:text-white hover:-translate-y-1
                         transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-3xl opacity-20 animate-pulse-glow" />
              
              {/* Image container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl animate-float">
                <Image
                  src="/images/profile.jpg"
                  alt="Dishant Gupta"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
