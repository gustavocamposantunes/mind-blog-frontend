import { describe, it, expect, beforeEach } from 'vitest'

import { getUserFromAccessToken, useAuthStore } from './auth-store'

const mockUser = {
  id: 1,
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  image: '',
}

const toBase64Url = (value: string) =>
  btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')

const buildAccessToken = (user: typeof mockUser) => {
  const header = toBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = toBase64Url(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
      image: user.image,
    }),
  )

  return `${header}.${body}.signature`
}

const mockAccount = {
  accessToken: buildAccessToken(mockUser),
}

describe('useAuthStore', () => {
  beforeEach(() => {
    localStorage.clear()
    useAuthStore.getState().clearCurrentUser()
  })

  it('should set only the access token and derive current user from it', () => {
    useAuthStore.getState().setCurrentUser(mockAccount)

    const state = useAuthStore.getState()

    expect(state.accessToken).toBe(mockAccount.accessToken)
    expect('user' in state).toBe(false)
    expect(getUserFromAccessToken(state.accessToken)).toEqual(mockUser)
  })

  it('should clear current user', () => {
    const { setCurrentUser, clearCurrentUser } = useAuthStore.getState()
    setCurrentUser(mockAccount)
    clearCurrentUser()

    const { accessToken } = useAuthStore.getState()

    expect(accessToken).toBe('')
    expect(getUserFromAccessToken(accessToken)).toEqual(null)
  })

  it('should hydrate state from local storage', () => {
    useAuthStore.getState().setCurrentUser(mockAccount)

    useAuthStore.getState().hydrate()

    const state = useAuthStore.getState()
    expect(state.accessToken).toBe(mockAccount.accessToken)
    expect('user' in state).toBe(false)
    expect(getUserFromAccessToken(state.accessToken)).toEqual(mockUser)
  })

  it('should set isHydrated to true after hydration', () => {
    useAuthStore.getState().hydrate()

    const state = useAuthStore.getState()
    expect(state.isHydrated).toBe(true)
  })
})
