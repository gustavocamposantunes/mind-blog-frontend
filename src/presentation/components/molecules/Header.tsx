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
      <nav className="flex items-center pt-6">
        <ul className="flex gap-4">
          <MenuItem redirect="/">Home</MenuItem>
          <MenuItem className="pr-4" redirect="/articles">
            Artigos
          </MenuItem>

          {children}
        </ul>
      </nav>
    </header>
  )
}
