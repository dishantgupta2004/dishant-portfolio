import { Metadata } from 'next'
import { PublicationsContent } from '@/components/sections/PublicationsContent'
import { api } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Research publications and papers by Dishant Gupta in Physics-Informed Neural Networks and Computational Physics',
}

export const revalidate = 3600

export default async function PublicationsPage() {
  const publications = await api.getPublications()
  return <PublicationsContent initialPublications={publications} />
}