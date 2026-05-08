import { Metadata } from 'next'
import { CoursesContent } from '@/components/sections/CoursesContent'
import { api } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Learn Data Science, Machine Learning & Python with Dishant Gupta at Unisole Empower',
}

export const revalidate = 3600

export default async function CoursesPage() {
  const courses = await api.getCourses()
  return <CoursesContent initialCourses={courses} />
}