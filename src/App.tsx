import { useEffect, useMemo, useState } from 'react'
import { BottomNavigation } from './components/BottomNavigation'
import { ComingSoonModal } from './components/ComingSoonModal'
import { FeatureGrid } from './components/FeatureGrid'
import { Header } from './components/Header'
import { NowCard } from './components/NowCard'
import { TodayCard } from './components/TodayCard'
import { getTodaySummary } from './data/todayRepository'
import { getTimeContent } from './lib/timeContent'
import type { TodaySummary } from './types'

export default function App() {
  const [summary, setSummary] = useState<TodaySummary | null>(null)
  const [modal, setModal] = useState<string | null>(null)
  const content = useMemo(() => getTimeContent(), [])

  useEffect(() => { getTodaySummary().then(setSummary) }, [])
  useEffect(() => {
    if (!modal) return
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setModal(null)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [modal])

  return <>
    <main>
      <Header content={content} />
      <TodayCard summary={summary} />
      <FeatureGrid onSelect={setModal} />
      <NowCard message={content.nowMessage} onOpen={() => setModal('今日の振り返り')} />
      <footer>MADE FOR KYOHEI · VERSION 0.1</footer>
    </main>
    <BottomNavigation onSelect={setModal} />
    <ComingSoonModal name={modal} onClose={() => setModal(null)} />
  </>
}
