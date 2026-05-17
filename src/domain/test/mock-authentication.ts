import { faker } from '@faker-js/faker'

import type { AuthenticateUserModel } from '../models'
import type { AuthParams } from '../usecases'

type AccessTokenPayload = {
  sub: number
  email: string
  fullName: string
  image?: string
}

const toBase64Url = (value: string) =>
  Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')

const buildAccessToken = (payload: AccessTokenPayload) => {
  const header = toBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = toBase64Url(JSON.stringify(payload))

  return `${header}.${body}.signature`
}

export const mockAuthenticationParams = (): AuthParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})

const mockUser = (): AuthenticateUserModel['user'] => ({
  id: 5,
  email: faker.internet.email(),
  fullName: faker.person.fullName(),
  image: faker.image.avatar(),
})

export const mockAuthenticateUserModel = (): AuthenticateUserModel => {
  const user = mockUser()

  return {
    accessToken: buildAccessToken({
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
      image: user.image,
    }),
    user,
  }
}
