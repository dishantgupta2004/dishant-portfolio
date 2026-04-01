import { Metadata } from 'next'
import { AboutContent } from '@/components/sections/AboutContent'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Dishant Gupta - Computational Physics & AI Researcher, Co-Founder at Unisole Empower',
}

export default function AboutPage() {
  return <AboutContent />
}
