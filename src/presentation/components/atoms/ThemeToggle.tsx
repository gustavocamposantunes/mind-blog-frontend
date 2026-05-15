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
      className="p-2 rounded-md hover:bg-accent/10"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

export default ThemeToggle
