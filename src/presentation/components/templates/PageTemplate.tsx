import { useNavigate, Link } from 'react-router-dom'

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
        {isLoggedIn ? (
          <Link
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors hover:border-primary/60"
            to="/article/new"
          >
            Publicar
          </Link>
        ) : (
          <Link
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors hover:border-primary/60"
            to="/login"
          >
            Entrar
          </Link>
        )}
        {isLoggedIn ? (
          <span>
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
            className="action-btn text-white"
          >
            Registrar
          </Button>
        )}
      </Header>
      <main className="flex-1 px-4 md:px-[5%] mt-6">{children}</main>
    </>
  )
}
