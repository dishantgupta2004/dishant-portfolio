import { Metadata } from 'next'
import { ProjectsContent } from '@/components/sections/ProjectsContent'
import { api } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore projects at the intersection of Physics, AI, and Computational Science by Dishant Gupta',
}

// Revalidate this page once per hour. Vercel serves it from the edge cache
// the rest of the time, so visitors never wait on a Flask cold start.
export const revalidate = 3600

export default async function ProjectsPage() {
  // Fetch on the server. With ISR + a 4s timeout + static fallback,
  // this resolves fast even on a cold backend.
  const projects = await api.getProjects()
  return <ProjectsContent initialProjects={projects} />
}