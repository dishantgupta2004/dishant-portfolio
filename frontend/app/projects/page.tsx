import { Metadata } from 'next'
import { ProjectsContent } from '@/components/sections/ProjectsContent'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore projects at the intersection of Physics, AI, and Computational Science by Dishant Gupta',
}

export default function ProjectsPage() {
  return <ProjectsContent />
}
