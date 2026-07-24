export type AccessTokenUser = {
  id: number
  fullName: string
  email: string
  image?: string
}

export const getUserFromAccessToken = (
  accessToken: string,
): AccessTokenUser | null => {
  if (!accessToken) {
    return null
  }

  const payloadPart = accessToken.split('.')[1] ?? accessToken
  const normalizedPayload = payloadPart.replace(/-/g, '+').replace(/_/g, '/')
  const paddedPayload = normalizedPayload.padEnd(
    normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
    '=',
  )

  try {
    const decodedPayload =
      typeof atob === 'function'
        ? atob(paddedPayload)
        : Buffer.from(paddedPayload, 'base64').toString('utf8')
    const payload = JSON.parse(decodedPayload) as {
      sub: number | string
      email: string
      fullName: string
      image?: string
    }

    return {
      id: Number(payload.sub),
      email: payload.email,
      fullName: payload.fullName,
      image: payload.image,
    }
  } catch {
    return null
  }
}
