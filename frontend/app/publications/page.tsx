import { Metadata } from 'next'
import { PublicationsContent } from '@/components/sections/PublicationsContent'

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Research publications and papers by Dishant Gupta in Physics-Informed Neural Networks and Computational Physics',
}

export default function PublicationsPage() {
  return <PublicationsContent />
}
