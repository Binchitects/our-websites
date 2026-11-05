import { ArgusChapter } from '@/components/home/ArgusChapter'
import { AssuranceChapter } from '@/components/home/AssuranceChapter'
import { CodeArenaChapter } from '@/components/home/CodeArenaChapter'
import { CompareChapter } from '@/components/home/CompareChapter'
import { DeployChapter } from '@/components/home/DeployChapter'
import { Hero } from '@/components/home/Hero'
import { LicenceChapter } from '@/components/home/LicenceChapter'
import { PublishersBand } from '@/components/home/PublishersBand'
import { QuestionsChapter } from '@/components/home/QuestionsChapter'
import { StackChapter } from '@/components/home/StackChapter'
import { Toc } from '@/components/home/Toc'
import { CtaBand } from '@/components/ui/CtaBand'
import { useSeo } from '@/lib/seo'
import { routeMeta } from '@/lib/route-meta'

export function Home() {
  useSeo({ ...routeMeta('/'), path: '/' })

  return (
    <>
      <Hero />
      <Toc />
      <StackChapter />
      <CodeArenaChapter />
      <ArgusChapter />
      <DeployChapter />
      <AssuranceChapter />
      <CompareChapter />
      <LicenceChapter />
      <PublishersBand />
      <QuestionsChapter />
      <CtaBand />
    </>
  )
}
