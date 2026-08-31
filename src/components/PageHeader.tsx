import { ChevronLeft } from 'lucide-react'

export function PageHeader({ title, onBack, action }: { title: string; onBack: () => void; action?: React.ReactNode }) {
  return <header className="page-header"><button className="icon-button" onClick={onBack} aria-label="ホームに戻る"><ChevronLeft /></button><h1>{title}</h1><div className="header-action">{action}</div></header>
}
