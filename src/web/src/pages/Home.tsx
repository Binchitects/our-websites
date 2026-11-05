import { ArgusSpotlight } from '@/components/home/ArgusSpotlight'
import { CodeArenaSpotlight } from '@/components/home/CodeArenaSpotlight'
import { CompareSection } from '@/components/home/CompareSection'
import { DeploySection } from '@/components/home/DeploySection'
import { EditionsSection } from '@/components/home/EditionsSection'
import { FaqSection } from '@/components/home/FaqSection'
import { Hero } from '@/components/home/Hero'
import { Suite } from '@/components/home/Suite'
import { TrustSection } from '@/components/home/TrustSection'
import { CtaBand } from '@/components/ui/CtaBand'
import { useSeo } from '@/lib/seo'
import { routeMeta } from '@/lib/route-meta'

export function Home() {
  useSeo({ ...routeMeta('/'), path: '/' })

  return (
    <>
      <Hero />
      <Suite />
      <CodeArenaSpotlight />
      <ArgusSpotlight />
      <DeploySection />
      <TrustSection />
      <CompareSection />
      <EditionsSection />
      <FaqSection />
      <CtaBand />
    </>
  )
}
