'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Mail, Phone, GraduationCap, Calendar, Award } from 'lucide-react'
import { ExperienceSection } from './ExperienceSection'
import { api, Education, SkillsGrouped } from '@/lib/api'

export function AboutContent() {
  const [education, setEducation] = useState<Education[]>([])
  const [skills, setSkills] = useState<SkillsGrouped>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [eduData, skillsData] = await Promise.all([
          api.getEducation(),
          api.getSkills(),
        ])
        setEducation(eduData)
        setSkills(skillsData)
      } catch (err) {
        console.error('Failed to load about data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {/* Header Section */}
      <section className="section bg-dark-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-heading gradient-text mb-4">
              About Me
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-2xl opacity-20" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                  <Image
                    src="/images/profile.jpg"
                    alt="Dishant Gupta"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-2">
                Dishant Gupta
              </h2>
              <p className="text-primary-400 text-lg mb-4">
                B.Tech in Engineering Physics, NIT Hamirpur
              </p>
              
              <p className="text-dark-300 leading-relaxed mb-4">
                I am a computational physics researcher specializing in Physics-Informed Neural Networks (PINNs), 
                Machine Learning, and Semiconductor Research. With a passion for combining AI with physics principles, 
                I develop innovative solutions for complex scientific problems.
              </p>
              
              <p className="text-dark-300 leading-relaxed mb-6">
                <strong className="text-white">Co-Founder & CTO at Unisole Empower</strong> - 
                Building AI solutions for agriculture and education.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-dark-400">
                <p className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  Hoshiarpur, Punjab, India
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <a href="mailto:22bph016@nith.ac.in" className="hover:text-primary-400 transition-colors">
                    22bph016@nith.ac.in
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <a href="tel:+917087328423" className="hover:text-primary-400 transition-colors">
                    +91-7087328423
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Objective */}
      <section className="section">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="section-title mb-8">Professional Objective</h2>
            <p className="text-dark-300 text-lg leading-relaxed">
              Seeking a challenging position in Computational Physics, AI for Science, and Semiconductor Research 
              to leverage my expertise in Physics-Informed Neural Networks, Machine Learning, and Computational Modelling. 
              Aiming to contribute to innovative projects at the intersection of AI and Physics, Semiconductor Device 
              Simulations and practical problem-solving in fields such as Quantum Materials and MEMS Design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <ExperienceSection />

      {/* Education Section */}
      <section className="section">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Education</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {isLoading ? (
              // Skeleton
              Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="h-6 bg-dark-700 rounded w-1/2 mb-3" />
                  <div className="h-4 bg-dark-700 rounded w-1/3 mb-2" />
                  <div className="h-4 bg-dark-700 rounded w-1/4" />
                </div>
              ))
            ) : (
              education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card p-6 flex gap-6"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 
                                  flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white font-heading">
                        {edu.degree}
                      </h3>
                      <span className="flex items-center gap-1.5 text-sm text-primary-400">
                        <Calendar className="w-4 h-4" />
                        {edu.start_year} - {edu.end_year || 'Present'}
                      </span>
                    </div>
                    <p className="text-dark-400 mb-1">{edu.institution}</p>
                    {edu.location && (
                      <p className="text-dark-500 text-sm flex items-center gap-1.5 mb-2">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </p>
                    )}
                    {edu.gpa && (
                      <p className="flex items-center gap-1.5 text-secondary-400 text-sm">
                        <Award className="w-4 h-4" />
                        {edu.gpa}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section bg-dark-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Skills & Expertise</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {Object.entries(skills).map(([category, categorySkills], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center"
              >
                <h3 className="text-lg font-bold text-white mb-4 font-heading">
                  {category}
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {categorySkills.map((skill) => (
                    <span key={skill.id} className="tag text-sm">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
