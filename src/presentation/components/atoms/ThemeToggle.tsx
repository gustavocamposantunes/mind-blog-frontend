import { Sun, Moon } from 'lucide-react'
import React from 'react'

import { useThemeStore } from '@/presentation/store/theme-store'

type ThemeToggleVariant = 'default' | 'auth'

interface ThemeToggleProps {
  variant?: ThemeToggleVariant
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'default',
}) => {
  const theme = useThemeStore((s) => s.theme)
  const toggle = useThemeStore((s) => s.toggle)

  const isAuthVariant = variant === 'auth'
  const buttonClassName = isAuthVariant
    ? theme === 'light'
      ? 'grid h-9 w-9 place-items-center rounded-full border border-border bg-white p-0 text-primary transition-colors'
      : 'grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/10 p-0 text-white transition-colors'
    : 'grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-transparent p-0 transition-colors'

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className={buttonClassName}
      style={isAuthVariant ? { backgroundColor: theme === 'light' ? '#fff' : undefined } : undefined}
    >
      {theme === 'dark' ? (
        <Moon className="h-4 w-4 text-current" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4 text-current" aria-hidden="true" />
      )}
    </button>
  )
}

export default ThemeToggle
