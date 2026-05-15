import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useThemeStore } from '@/presentation/store/theme-store'

export const ThemeToggle: React.FC = () => {
  const theme = useThemeStore((s) => s.theme)
  const toggle = useThemeStore((s) => s.toggle)

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-transparent p-0"
    >
      {theme === 'dark' ? (
        <Moon className="h-4 w-4 text-white" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4 text-black" aria-hidden="true" />
      )}
    </button>
  )
}

export default ThemeToggle
