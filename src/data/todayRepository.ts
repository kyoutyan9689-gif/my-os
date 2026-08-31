import type { TodaySummary } from '../types'

// 将来 API に差し替えやすいよう、仮データも UI から分離しています。
export async function getTodaySummary(): Promise<TodaySummary> {
  return { date: new Date(), weight: 56.4, gym: null, scheduleCount: 3 }
}
