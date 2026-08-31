import { useEffect, useState } from 'react'
import { CalendarDays, CloudSun, Dumbbell, Home, Music2, NotebookPen, ShoppingBag } from 'lucide-react'
import { HomePage } from './components/HomePage'
import { NotesPage } from './components/NotesPage'
import { WishlistPage } from './components/WishlistPage'
import { WorkoutPage } from './components/WorkoutPage'

export type Page = 'home' | 'workout' | 'notes' | 'wishlist'

export default function App() {
  const [page, setPage] = useState<Page>('home')

  useEffect(() => {
    const sync = () => {
      const next = location.hash.slice(1)
      setPage(next === 'workout' || next === 'notes' || next === 'wishlist' ? next : 'home')
    }
    sync()
    addEventListener('hashchange', sync)
    return () => removeEventListener('hashchange', sync)
  }, [])

  const navigate = (next: Page) => { location.hash = next === 'home' ? '' : next }

  return <>
    <main className="app-shell">
      {page === 'home' && <HomePage navigate={navigate} />}
      {page === 'workout' && <WorkoutPage onBack={() => navigate('home')} />}
      {page === 'notes' && <NotesPage onBack={() => navigate('home')} />}
      {page === 'wishlist' && <WishlistPage onBack={() => navigate('home')} />}
    </main>
    <nav className="bottom-nav" aria-label="メインナビゲーション">
      <button className={page === 'home' ? 'active' : ''} onClick={() => navigate('home')}><Home /><span>ホーム</span></button>
      <button className={page === 'workout' ? 'active' : ''} onClick={() => navigate('workout')}><Dumbbell /><span>筋トレ</span></button>
      <button className={page === 'notes' ? 'active' : ''} onClick={() => navigate('notes')}><NotebookPen /><span>メモ</span></button>
      <button className={page === 'wishlist' ? 'active' : ''} onClick={() => navigate('wishlist')}><ShoppingBag /><span>欲しいもの</span></button>
    </nav>
  </>
}

export const homeFeatures = [
  { id: 'workout', name: '筋トレ', detail: 'トレーニングを記録', icon: Dumbbell, color: '#ff806b' },
  { id: 'notes', name: 'メモ', detail: 'アイデアを残す', icon: NotebookPen, color: '#f2bd62' },
  { id: 'wishlist', name: '欲しいもの', detail: '気になるものを管理', icon: ShoppingBag, color: '#d98be8' },
  { id: 'music', name: '音楽', detail: 'Apple Musicを開く', icon: Music2, color: '#ff6683' },
  { id: 'schedule', name: '予定', detail: 'Google カレンダー', icon: CalendarDays, color: '#75d39b' },
  { id: 'weather', name: '東京', detail: '現在の天気', icon: CloudSun, color: '#73b9ff' },
] as const
