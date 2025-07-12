import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { SkillsSection } from '@/components/skills-section'
import { ExperienceTimeline } from '@/components/experience-timeline'
import { ProjectsSection } from '@/components/projects-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { ParticleBackground } from '@/components/particle-background'
import { getSkills } from '@/lib/actions/skills'
import { getProjects } from '@/lib/actions/projects'
import { getExperiences } from '@/lib/actions/experiences'

export default async function Home() {
  const [skills, projects, experiences] = await Promise.all([
    getSkills(),
    getProjects(),
    getExperiences()
  ])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticleBackground />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection skills={skills} />
      <ExperienceTimeline experiences={experiences} />
      <ProjectsSection projects={projects} />
      <ContactSection />
      <Footer />
    </div>
  )
}