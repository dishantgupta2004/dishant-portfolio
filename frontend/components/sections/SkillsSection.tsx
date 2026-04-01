'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code, Cpu, Wrench } from 'lucide-react'
import { api, SkillsGrouped } from '@/lib/api'

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Programming': Code,
  'Computational Physics': Cpu,
  'Frameworks & Tools': Wrench,
}

const categoryGradients: Record<string, string> = {
  'Programming': 'from-blue-500 to-cyan-500',
  'Computational Physics': 'from-purple-500 to-pink-500',
  'Frameworks & Tools': 'from-emerald-500 to-teal-500',
}

export function SkillsSection() {
  const [skills, setSkills] = useState<SkillsGrouped>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchSkills() {
      try {
        const data = await api.getSkills()
        setSkills(data)
      } catch (err) {
        console.error('Failed to load skills:', err)
        // Fallback to static skills
        setSkills({
          'Programming': [
            { id: 1, name: 'Python', category: 'Programming', proficiency: 95, order: 1 },
            { id: 2, name: 'C++', category: 'Programming', proficiency: 80, order: 2 },
            { id: 3, name: 'MATLAB', category: 'Programming', proficiency: 85, order: 3 },
          ],
          'Computational Physics': [
            { id: 4, name: 'Machine Learning', category: 'Computational Physics', proficiency: 90, order: 1 },
            { id: 5, name: 'Deep Learning', category: 'Computational Physics', proficiency: 90, order: 2 },
            { id: 6, name: 'FEM', category: 'Computational Physics', proficiency: 80, order: 3 },
            { id: 7, name: 'PDE Solvers', category: 'Computational Physics', proficiency: 85, order: 4 },
          ],
          'Frameworks & Tools': [
            { id: 8, name: 'TensorFlow', category: 'Frameworks & Tools', proficiency: 90, order: 1 },
            { id: 9, name: 'DeepXDE', category: 'Frameworks & Tools', proficiency: 90, order: 2 },
            { id: 10, name: 'NumPy', category: 'Frameworks & Tools', proficiency: 95, order: 3 },
            { id: 11, name: 'SciPy', category: 'Frameworks & Tools', proficiency: 90, order: 4 },
            { id: 12, name: 'OpenFOAM', category: 'Frameworks & Tools', proficiency: 75, order: 5 },
          ],
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const categories = Object.keys(skills)

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
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="text-dark-400 max-w-2xl mx-auto mt-4">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loaders
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card p-8 animate-pulse">
                <div className="h-6 bg-dark-700 rounded w-1/2 mx-auto mb-6" />
                <div className="flex flex-wrap justify-center gap-3">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="h-10 bg-dark-700 rounded-full w-24" />
                  ))}
                </div>
              </div>
            ))
          ) : (
            categories.map((category, index) => {
              const Icon = categoryIcons[category] || Code
              const gradient = categoryGradients[category] || 'from-primary-500 to-secondary-500'

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card p-8 text-center group"
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 mx-auto mb-6 rounded-xl bg-gradient-to-br ${gradient} 
                                  flex items-center justify-center shadow-lg
                                  group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Category Title */}
                  <h3 className="text-xl font-bold text-white mb-6 font-heading relative inline-block">
                    {category}
                    <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 
                                    bg-gradient-to-r ${gradient} rounded-full`} />
                  </h3>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap justify-center gap-3">
                    {skills[category]?.map((skill) => (
                      <motion.span
                        key={skill.id}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="tag"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
