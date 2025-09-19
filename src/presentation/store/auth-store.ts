import { create } from 'zustand'

import type { AuthenticateUserModel } from '@/domain/models/authenticate-user-model'

import { LocalManageUserSession } from '@/data/usecases/auth/local-manage-user-session'

const manageUserSession = new LocalManageUserSession()

type AuthState = {
  accessToken: string
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
    image?: string
  }
}

export type AuthStore = AuthState & {
  setCurrentUser: (account: AuthenticateUserModel) => void
  clearCurrentUser: () => void
  hydrate: () => void
  isHydrated: boolean
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: '',
  user: { id: 0, firstName: '', lastName: '', email: '', image: '' },
  isHydrated: false,

  setCurrentUser: (account) => {
    manageUserSession.set(account)
    set({ accessToken: account.accessToken, user: account.user })
  },

  clearCurrentUser: () => {
    manageUserSession.clear()
    set({
      accessToken: '',
      user: { id: 0, firstName: '', lastName: '', email: '', image: '' },
    })
  },

  hydrate: () => {
    const account = manageUserSession.get()
    if (account) {
      set({
        accessToken: account.accessToken,
        user: account.user,
        isHydrated: true,
      })
    } else {
      set({ isHydrated: true })
    }
  },
}))
