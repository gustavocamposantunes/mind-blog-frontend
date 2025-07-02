import { LogOut, UserPen } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import logoDark from '../../assets/logo-dark.svg'
import { MenuItem } from '../atoms/MenuItem'

import { CustomAvatar } from '@/presentation/components/molecules/CustomAvatar'
import { Button } from '@/presentation/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu'
import { useAuthStore } from '@/presentation/store/auth-store'

export const Header: React.FC = () => {
  const navigate = useNavigate()

  const { accessToken, clearCurrentUser, user } = useAuthStore()

  const isLoggedIn = !!accessToken

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

          {isLoggedIn ? (
            <MenuItem
              className="border-l-2 border-l-stone-700 pl-6"
              redirect="/article/new"
            >
              Publicar
            </MenuItem>
          ) : (
            <MenuItem
              className="border-l-2 border-l-stone-700 pl-6"
              redirect="/login"
            >
              Entrar
            </MenuItem>
          )}
        </ul>
        {isLoggedIn ? (
          <span className="ml-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-white!">
                <CustomAvatar src={user.image} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <UserPen />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    clearCurrentUser()
                    navigate('/')
                  }}
                >
                  <LogOut />
                  Desconectar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        ) : (
          <Button
            onClick={() => navigate('/register')}
            className="action-btn ml-6"
          >
            Registrar
          </Button>
        )}
      </nav>
    </header>
  )
}
