import { create } from 'zustand'

import type { AuthenticateUserModel } from '@/domain/models/authenticate-user-model'

import { LocalManageUserSession } from '@/data/usecases/auth/local-manage-user-session'
export { getUserFromAccessToken } from '@/data/usecases/auth/access-token-user'

const manageUserSession = new LocalManageUserSession()

type AuthState = {
  accessToken: string
}

export type AuthStore = AuthState & {
  setCurrentUser: (account: AuthenticateUserModel) => void
  clearCurrentUser: () => void
  hydrate: () => void
  isHydrated: boolean
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: '',
  isHydrated: false,

  setCurrentUser: (account) => {
    manageUserSession.set(account)
    set({ accessToken: account.accessToken })
  },

  clearCurrentUser: () => {
    manageUserSession.clear()
    set({
      accessToken: '',
    })
  },

  hydrate: () => {
    const account = manageUserSession.get()
    if (account) {
      set({
        accessToken: account.accessToken,
        isHydrated: true,
      })
    } else {
      set({ isHydrated: true })
    }
  },
}))
