import { LogIn, NotebookText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { MenuItem } from '../atoms'
import { Header } from '../molecules'
import { UserDropdownMenu } from '../organism'
import { Button } from '../ui/button'

import type { ReactNode } from 'react'

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
            <UserDropdownMenu
              user={user}
              onProfileNavigate={() => navigate('/profile')}
              onLogout={() => {
                clearCurrentUser()
                navigate('/')
              }}
            />
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
