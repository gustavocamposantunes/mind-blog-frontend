import { Menu, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { BrandLogo } from '../atoms'
import ThemeToggle from '../atoms/ThemeToggle'

import { useResponsiveLimit } from '@/presentation/hooks/useResponsiveLimit'

interface IHeader {
  children?: ReactNode
  rightActions?: ReactNode
}

export const Header: React.FC<IHeader> = ({ children, rightActions }) => {
  const limit = useResponsiveLimit()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="relative border-b border-border px-4 py-3 md:px-10 md:py-4 lg:px-14">
      <div className="flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3">
          <BrandLogo className="items-start" />
        </Link>

        <nav className="hidden flex-1 items-center justify-end gap-6 text-sm text-foreground md:flex">
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

          <div className="flex items-center gap-2">
            {rightActions}
            <ThemeToggle variant="auth" />
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle variant="auth" />
          {rightActions}
          <button
            aria-expanded={isMobileMenuOpen}
            aria-label="Abrir menu"
            data-testid="mobile-menu-trigger"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
            type="button"
            onClick={() => {
              setIsMobileMenuOpen((current) => !current)
            }}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div
          className="mt-3 flex flex-col gap-2 rounded-2xl border border-border bg-background p-3 shadow-2xl md:hidden"
          data-testid="mobile-menu-panel"
        >
          <Link
            className="rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            to="/"
            onClick={() => {
              setIsMobileMenuOpen(false)
            }}
          >
            Home
          </Link>
          <Link
            className="rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            to={`/articles?page=1&limit=${limit}`}
            onClick={() => {
              setIsMobileMenuOpen(false)
            }}
          >
            Artigos
          </Link>

          {children ? <div className="my-1 h-px bg-border" /> : null}

          {children ? (
            <div className="flex flex-col gap-2">{children}</div>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
