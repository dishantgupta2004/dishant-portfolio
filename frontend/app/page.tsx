import { HeroSection } from '@/components/sections/HeroSection'
import { HighlightsSection } from '@/components/sections/HighlightsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { FeaturedProjectSection } from '@/components/sections/FeaturedProjectSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { CoursesPreviewSection } from '@/components/sections/CoursesPreviewSection'
import { AnnouncementBanner } from '@/components/sections/AnnouncementBanner'
import { api } from '@/lib/api'

export const revalidate = 3600

export default async function Home() {
  // Prefetch on the server in parallel — these resolve fast thanks to ISR + static fallback.
  const [experiences, skills] = await Promise.all([
    api.getExperiences(),
    api.getSkills(),
  ])

  return (
    <>
      <HeroSection />
      <AnnouncementBanner />
      <HighlightsSection />
      <ExperienceSection initialExperiences={experiences} />
      <FeaturedProjectSection />
      <CoursesPreviewSection />
      <SkillsSection initialSkills={skills} />
    </>
  )
}