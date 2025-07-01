import { describe, expect, it } from 'vitest'

import { LocalManageUserSession } from './local-manage-user-session'

import { mockAuthenticateUserModel } from '@/domain/test'

type SutTypes = {
  sut: LocalManageUserSession
}

const makeSut = (): SutTypes => {
  const sut = new LocalManageUserSession()
  return {
    sut,
  }
}

describe('LocalManageUserSession', () => {
  it('should call LocalStorageCurrentUserAdapter.set with correct value', () => {
    const { sut } = makeSut()
    const account = mockAuthenticateUserModel()
    sut.set(account)
    const storedAccount = sut.get()
    expect(storedAccount).toEqual(account)
  })

  it('should call LocalStorageCurrentUserAdapter.get and return null if no user is stored', () => {
    const { sut } = makeSut()
    sut.clear()
    const storedAccount = sut.get()
    expect(storedAccount).toBeNull()
  })

  it('should call LocalStorageCurrentUserAdapter.clear and remove the stored user', () => {
    const { sut } = makeSut()
    const account = mockAuthenticateUserModel()
    sut.set(account)
    sut.clear()
    const storedAccount = sut.get()
    expect(storedAccount).toBeNull()
  })
})
