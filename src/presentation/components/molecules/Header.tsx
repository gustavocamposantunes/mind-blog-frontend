import { House, Newspaper } from 'lucide-react'
import { Link } from 'react-router-dom'

import logoDark from '../../assets/logo-dark.svg'
import { MenuItem } from '../atoms/MenuItem'

import type { ReactNode } from 'react'

interface IHeader {
  children: ReactNode
}

export const Header: React.FC<IHeader> = ({ children }) => {
  return (
    <header className="w-full flex flex-col md:flex-row items-center md:items-start justify-between px-[10%] pt-4">
      <Link to="/">
        <img src={logoDark} alt="logo" />
      </Link>
      <nav className="flex pt-6">
        <ul className="flex gap-4 items-center">
          <MenuItem redirect="/" iconStart={<House />}>
            Home
          </MenuItem>
          <MenuItem
            className="pr-4"
            redirect="/articles"
            iconStart={<Newspaper />}
          >
            Artigos
          </MenuItem>

          {children}
        </ul>
      </nav>
    </header>
  )
}
