import { create } from 'zustand'

type Theme = 'light' | 'dark'

type ThemeStore = {
  theme: Theme
  setTheme: (t: Theme) => void
  toggle: () => void
  hydrate: () => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'dark',
  setTheme: (t) => {
    try {
      localStorage.setItem('theme', t)
    } catch {
      void 0
    }
    if (typeof document !== 'undefined') {
      if (t === 'dark') document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
    }
    set({ theme: t })
  },
  toggle: () =>
    set((s) => {
      const t: Theme = s.theme === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem('theme', t)
      } catch {
        void 0
      }
      if (typeof document !== 'undefined') {
        if (t === 'dark') document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
      }
      return { theme: t }
    }),
  hydrate: () => {
    let t: Theme = 'dark'
    try {
      const stored = localStorage.getItem('theme') as Theme | null
      if (stored) t = stored
    } catch {
      void 0
    }
    if (typeof document !== 'undefined') {
      if (t === 'dark') document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
    }
    set({ theme: t })
  },
}))
