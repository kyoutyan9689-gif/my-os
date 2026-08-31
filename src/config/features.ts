import { CalendarDays, CircleDollarSign, Dumbbell, Library, Music2, NotebookPen, Scale, ShoppingBag } from 'lucide-react'
import type { Feature } from '../types'

// タイルの追加・並べ替えはこの配列だけを編集します。
export const features: Feature[] = [
  { id: 'workout', name: '筋トレ', description: '記録・メニュー', icon: Dumbbell, accent: '#ff775f' },
  { id: 'notes', name: 'メモ', description: '思ったことを残す', icon: NotebookPen, accent: '#f4bf5f' },
  { id: 'wishlist', name: '欲しい物', description: '比較・検討・購入', icon: ShoppingBag, accent: '#db82e8' },
  { id: 'catalog', name: '自分図鑑', description: '好き・モノ・思い出', icon: Library, accent: '#68b7ff' },
  { id: 'music', name: '音楽', description: '好きな曲たち', icon: Music2, accent: '#f06d93' },
  { id: 'schedule', name: '予定', description: 'スケジュール管理', icon: CalendarDays, accent: '#6fcf97' },
  { id: 'body', name: '体重・体型', description: '推移をチェック', icon: Scale, accent: '#69c7d1' },
  { id: 'finance', name: '家計', description: 'お金の流れを把握', icon: CircleDollarSign, accent: '#a5ce6d' },
]
