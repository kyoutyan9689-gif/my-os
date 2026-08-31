import { ArrowUpRight, Sparkles } from 'lucide-react'

export function NowCard({ message, onOpen }: { message: string; onOpen: () => void }) {
  return <button className="card now-card" onClick={onOpen}>
    <span className="now-icon"><Sparkles size={19} /></span>
    <span><span className="now-label">NOW</span><strong>{message}</strong></span>
    <ArrowUpRight className="now-arrow" size={20} />
  </button>
}
