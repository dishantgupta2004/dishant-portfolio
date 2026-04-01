'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Linkedin, Github, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { api } from '@/lib/api'

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: '22bph016@nith.ac.in',
    href: 'mailto:22bph016@nith.ac.in',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91-7087328423',
    href: 'tel:+917087328423',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Hoshiarpur, Punjab - 144207, India',
    href: null,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'LinkedIn Profile',
    href: 'https://www.linkedin.com/in/dishant-gupta-44067926a/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'GitHub Profile',
    href: 'https://github.com/dishantgupta2004',
  },
]

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const result = await api.submitContact(formData)
      if (result.success) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage('Failed to send message. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

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
              Contact Me
            </h1>
            <p className="text-dark-400 max-w-xl mx-auto">
              Let's connect to discuss research opportunities, collaborations, or projects
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section pt-0">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white font-heading mb-4">
                Get in Touch
              </h2>
              <p className="text-dark-300 mb-8 leading-relaxed">
                I'm always interested in discussing new research opportunities, 
                collaborations in computational physics, or innovative projects at 
                the intersection of physics and AI.
              </p>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-dark-500 text-sm">{method.label}</p>
                      {method.href ? (
                        <a
                          href={method.href}
                          target={method.href.startsWith('http') ? '_blank' : undefined}
                          rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-dark-200 hover:text-primary-400 transition-colors"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-dark-200">{method.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="card p-8">
                <h2 className="text-xl font-bold text-white font-heading mb-6">
                  Send Me a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-dark-300 text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-dark-300 text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-dark-300 text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g., Research Collaboration"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-dark-300 text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="form-input resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  {/* Status Messages */}
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-secondary-400 bg-secondary-500/10 p-4 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Message sent successfully! I'll get back to you soon.</span>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-400 bg-red-500/10 p-4 rounded-lg"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
