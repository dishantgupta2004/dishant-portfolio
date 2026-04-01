import { Metadata } from 'next'
import { ContactContent } from '@/components/sections/ContactContent'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Dishant Gupta for research collaborations, projects, or inquiries',
}

export default function ContactPage() {
  return <ContactContent />
}
