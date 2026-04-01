import Link from 'next/link'
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/publications', label: 'Publications' },
  { href: '/courses', label: 'Courses' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/dishant-gupta-44067926a/',
    icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: 'https://github.com/dishantgupta2004',
    icon: Github,
    label: 'GitHub',
  },
  {
    href: 'mailto:22bph016@nith.ac.in',
    icon: Mail,
    label: 'Email',
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-dark-900 border-t border-white/5">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Info Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 font-heading">
              Dishant Gupta
            </h3>
            <p className="text-dark-300 mb-2">
              Computational Physics & AI Researcher
            </p>
            <p className="text-dark-400 text-sm mb-4">
              Co-Founder, Unisole Empower
            </p>
            
            <div className="space-y-2 text-sm text-dark-400">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-primary-400" />
                Hoshiarpur, Punjab, India
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-primary-400" />
                <a 
                  href="mailto:22bph016@nith.ac.in" 
                  className="hover:text-primary-400 transition-colors"
                >
                  22bph016@nith.ac.in
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-primary-400" />
                <a 
                  href="tel:+917087328423" 
                  className="hover:text-primary-400 transition-colors"
                >
                  +91-7087328423
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 font-heading relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-primary-500" />
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-400 hover:text-primary-400 hover:pl-1 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 font-heading relative inline-block">
              Connect
              <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-primary-500" />
            </h3>
            
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center
                           text-dark-300 hover:bg-primary-500 hover:text-white hover:-translate-y-1
                           transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            <div className="text-sm text-dark-400">
              <h4 className="font-medium text-dark-300 mb-1">Learn with Us</h4>
              <Link
                href="/courses"
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                Explore courses at Unisole Empower →
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/5 text-center text-dark-500 text-sm">
          <p>© {currentYear} Dishant Gupta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
