import type { Metadata } from 'next'
import { Poppins, Open_Sans, Fira_Code } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

// Font configurations
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

// Metadata
export const metadata: Metadata = {
  title: {
    default: 'Dishant Gupta - Physics & AI Researcher',
    template: '%s | Dishant Gupta',
  },
  description: 'Computational Physics & AI Researcher specializing in Physics-Informed Neural Networks, Machine Learning, and Semiconductor Research. Co-Founder at Unisole Empower.',
  keywords: [
    'Dishant Gupta',
    'Physics-Informed Neural Networks',
    'PINNs',
    'Machine Learning',
    'Computational Physics',
    'AI Researcher',
    'NIT Hamirpur',
    'Deep Learning',
    'Unisole Empower',
  ],
  authors: [{ name: 'Dishant Gupta', url: 'https://github.com/dishantgupta2004' }],
  creator: 'Dishant Gupta',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Dishant Gupta - Physics & AI Researcher',
    description: 'Computational Physics & AI Researcher specializing in Physics-Informed Neural Networks',
    siteName: 'Dishant Gupta Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dishant Gupta - Physics & AI Researcher',
    description: 'Computational Physics & AI Researcher specializing in Physics-Informed Neural Networks',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${poppins.variable} ${openSans.variable} ${firaCode.variable}`}
    >
      <body className="min-h-screen bg-dark-950 text-dark-100 font-body antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
