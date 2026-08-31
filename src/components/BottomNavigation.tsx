import { BarChart3, Compass, Home, PenLine, Settings } from 'lucide-react'

const items = [
  { name: 'ホーム', icon: Home }, { name: '記録', icon: PenLine }, { name: '分析', icon: BarChart3 },
  { name: '発見', icon: Compass }, { name: '設定', icon: Settings },
]

export function BottomNavigation({ onSelect }: { onSelect: (name: string) => void }) {
  return <nav className="bottom-nav" aria-label="メインナビゲーション">
    <div className="nav-inner">{items.map(({ name, icon: Icon }, i) => <button key={name} className={i === 0 ? 'active' : ''} onClick={() => i > 0 && onSelect(name)} aria-current={i === 0 ? 'page' : undefined}>
      <Icon size={21} strokeWidth={i === 0 ? 2.3 : 1.8} /><span>{name}</span>
    </button>)}</div>
  </nav>
}
