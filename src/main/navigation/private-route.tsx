import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuthStore } from '@/presentation/store/auth-store'

interface IPrivateRoute {
  children: ReactNode
}

export const PrivateRoute = ({ children }: IPrivateRoute) => {
  const { isHydrated, accessToken } = useAuthStore((state) => state)

  if (!isHydrated) {
    return <div>...carregando</div>
  }

  if (!accessToken) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}
