import { HeroSection } from '@/components/sections/HeroSection'
import { HighlightsSection } from '@/components/sections/HighlightsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { FeaturedProjectSection } from '@/components/sections/FeaturedProjectSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { CoursesPreviewSection } from '@/components/sections/CoursesPreviewSection'
import { AnnouncementBanner } from '@/components/sections/AnnouncementBanner'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AnnouncementBanner />
      <HighlightsSection />
      <ExperienceSection />
      <FeaturedProjectSection />
      <CoursesPreviewSection />
      <SkillsSection />
    </>
  )
}
