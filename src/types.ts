import type { LucideIcon } from 'lucide-react'

export type Feature = {
  id: string
  name: string
  description: string
  icon: LucideIcon
  accent: string
}

export type TodaySummary = {
  date: Date
  weight: number | null
  gym: string | null
  scheduleCount: number
}
