'use client'

import { motion } from 'framer-motion'
import { Brain, Cpu, CloudRain } from 'lucide-react'

const highlights = [
  {
    icon: Brain,
    title: 'Physics-Informed Neural Networks',
    description: 'Developing novel PINN architectures for solving complex PDEs and inverse problems in physics with unprecedented accuracy.',
    gradient: 'from-blue-500 to-violet-500',
  },
  {
    icon: Cpu,
    title: 'Semiconductor Research',
    description: 'Exploring computational models for chemical vapor deposition and semiconductor physics to advance manufacturing processes.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: CloudRain,
    title: 'Meteorological AI',
    description: 'Creating AI-driven systems for hailstorm prediction and agricultural risk management using real-time weather data analysis.',
    gradient: 'from-orange-500 to-red-500',
  },
]

export function HighlightsSection() {
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
          <h2 className="section-title">Research Highlights</h2>
          <p className="text-dark-400 max-w-2xl mx-auto mt-4">
            Key areas where I'm pushing the boundaries of physics and AI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-8 text-center group relative overflow-hidden"
            >
              {/* Gradient top border */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`} />
              
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.gradient}
                           flex items-center justify-center shadow-lg`}
              >
                <item.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 font-heading">
                {item.title}
              </h3>
              <p className="text-dark-300 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
