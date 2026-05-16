import { Link } from 'react-router-dom'

import { BrandLogo } from '../atoms'
import ThemeToggle from '../atoms/ThemeToggle'

import type { ReactNode } from 'react'

import { useResponsiveLimit } from '@/presentation/hooks/useResponsiveLimit'

interface IHeader {
  children?: ReactNode
}

export const Header: React.FC<IHeader> = ({ children }) => {
  const limit = useResponsiveLimit()

  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-4 md:px-10 lg:px-14">
      <Link to="/" className="flex items-center gap-3">
        <BrandLogo className="items-start" />
      </Link>

      <nav className="flex items-center gap-6 text-sm text-foreground">
        <Link
          className="text-foreground transition-colors hover:text-foreground"
          to="/"
        >
          Home
        </Link>
        <Link
          className="text-foreground transition-colors hover:text-foreground"
          to={`/articles?page=1&limit=${limit}`}
        >
          Artigos
        </Link>
        {children}
        <span>
          <ThemeToggle variant="auth" />
        </span>
      </nav>
    </header>
  )
}
