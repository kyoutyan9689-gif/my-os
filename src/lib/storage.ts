import { useEffect, useState } from 'react'

export function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) as T : initial
    } catch { return initial }
  })
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)) }, [key, value])
  return [value, setValue] as const
}

export const today = () => new Date().toLocaleDateString('sv-SE')
export const makeId = () => crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
