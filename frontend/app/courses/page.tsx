import { Metadata } from 'next'
import { CoursesContent } from '@/components/sections/CoursesContent'

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Learn Data Science, Machine Learning & Python with Dishant Gupta at Unisole Empower',
}

export default function CoursesPage() {
  return <CoursesContent />
}
