import { LogIn, LogOut, NotebookText, UserPen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { MenuItem } from '../atoms'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

import type { ReactNode } from 'react'

import { CustomAvatar, Header } from '@/presentation/components/molecules'
import { useAuthStore } from '@/presentation/store'

interface IPageTemplate {
  children: ReactNode
}

export const PageTemplate: React.FC<IPageTemplate> = ({ children }) => {
  const navigate = useNavigate()
  const { accessToken, clearCurrentUser, user } = useAuthStore()

  const isLoggedIn = !!accessToken

  return (
    <>
      <Header>
        <ul>
          {isLoggedIn ? (
            <MenuItem
              iconStart={<NotebookText />}
              className="border-l-2 border-l-stone-700 pl-6"
              redirect="/article/new"
            >
              Publicar
            </MenuItem>
          ) : (
            <MenuItem
              iconStart={<LogIn />}
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
      </Header>
      <main className="px-4 md:px-[10%] mt-6">{children}</main>
    </>
  )
}
