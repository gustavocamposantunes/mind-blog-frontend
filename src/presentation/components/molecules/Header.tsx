import { House, Newspaper } from 'lucide-react'
import { Link } from 'react-router-dom'

import { BrandLogo, MenuItem } from '../atoms'
import ThemeToggle from '../atoms/ThemeToggle'

import type { ReactNode } from 'react'

import { useResponsiveLimit } from '@/presentation/hooks/useResponsiveLimit'

interface IHeader {
  children: ReactNode
}

export const Header: React.FC<IHeader> = ({ children }) => {
  const limit = useResponsiveLimit()

  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between px-[5%] pt-4">
      <Link to="/">
        <BrandLogo className="items-center" />
      </Link>
      <nav className="flex pt-6 wraṕ">
        <ul className="flex gap-4 items-center flex-wrap justify-center">
          <MenuItem redirect="/" iconStart={<House />}>
            Home
          </MenuItem>
          <MenuItem
            className="pr-4"
            redirect={`/articles?page=1&limit=${limit}`}
            iconStart={<Newspaper />}
          >
            Artigos
          </MenuItem>

          {children}
          <li className="pl-4">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}
