import type { AuthenticateUserModel } from '@/domain/models'

import { UnexpectedError } from '@/domain/errors'

const decodeAccessTokenPayload = (accessToken: string) => {
  if (!accessToken) {
    throw new UnexpectedError()
  }

  const payloadPart = accessToken.split('.')[1] ?? accessToken
  const normalizedPayload = payloadPart.replace(/-/g, '+').replace(/_/g, '/')
  const paddedPayload = normalizedPayload.padEnd(
    normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
    '=',
  )

  let decodedPayload: string

  try {
    decodedPayload =
      typeof atob === 'function'
        ? atob(paddedPayload)
        : Buffer.from(paddedPayload, 'base64').toString('utf8')
  } catch {
    throw new UnexpectedError()
  }

  try {
    return JSON.parse(decodedPayload) as {
      sub: number | string
      email: string
      fullName: string
      image?: string
    }
  } catch {
    throw new UnexpectedError()
  }
}

export const buildAuthenticateUserModel = (
  accessToken: string,
): AuthenticateUserModel => {
  const payload = decodeAccessTokenPayload(accessToken)

  return {
    accessToken,
    user: {
      id: Number(payload.sub),
      email: payload.email,
      fullName: payload.fullName,
      image: payload.image,
    },
  }
}
