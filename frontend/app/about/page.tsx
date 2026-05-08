import { Metadata } from 'next'
import { AboutContent } from '@/components/sections/AboutContent'
import { api } from '@/lib/api'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Dishant Gupta - Computational Physics & AI Researcher, Co-Founder at Unisole Empower',
}

export const revalidate = 3600

export default async function AboutPage() {
  // Fetch all three in parallel on the server
  const [education, skills, experiences] = await Promise.all([
    api.getEducation(),
    api.getSkills(),
    api.getExperiences(),
  ])
  return (
    <AboutContent
      initialEducation={education}
      initialSkills={skills}
      initialExperiences={experiences}
    />
  )
}