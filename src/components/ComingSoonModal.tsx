import { X } from 'lucide-react'

export function ComingSoonModal({ name, onClose }: { name: string | null; onClose: () => void }) {
  if (!name) return null
  return <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={e => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose} aria-label="閉じる"><X size={20} /></button>
      <span className="modal-mark">K</span>
      <p>COMING SOON</p>
      <h2 id="modal-title">{name}</h2>
      <span className="modal-copy">この機能は、これから少しずつ育てていきます。</span>
      <button className="modal-done" onClick={onClose}>ホームに戻る</button>
    </section>
  </div>
}
