import { afterEach, describe, expect, it, vi } from 'vitest'

import { buildAuthenticateUserModel } from './build-authenticate-user-model'

import { UnexpectedError } from '@/domain/errors'

describe('buildAuthenticateUserModel', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should build the model from a valid JWT payload', () => {
    const payload = btoa(
      JSON.stringify({
        sub: 1,
        email: 'john@example.com',
        fullName: 'John Doe',
        image: 'avatar.png',
      }),
    )

    const result = buildAuthenticateUserModel(`header.${payload}.signature`)

    expect(result).toEqual({
      accessToken: `header.${payload}.signature`,
      user: {
        id: 1,
        email: 'john@example.com',
        fullName: 'John Doe',
        image: 'avatar.png',
      },
    })
  })

  it('should build the model when the token has no payload separator', () => {
    const payload = btoa(
      JSON.stringify({
        sub: 7,
        email: 'plain@example.com',
        fullName: 'Plain Token',
      }),
    )

    const result = buildAuthenticateUserModel(payload)

    expect(result).toEqual({
      accessToken: payload,
      user: {
        id: 7,
        email: 'plain@example.com',
        fullName: 'Plain Token',
        image: undefined,
      },
    })
  })

  it('should throw when the access token is empty', () => {
    expect(() => buildAuthenticateUserModel('')).toThrow(new UnexpectedError())
  })

  it('should throw when the access token cannot be decoded', () => {
    vi.spyOn(globalThis, 'atob').mockImplementation(() => {
      throw new Error('decode failed')
    })

    expect(() =>
      buildAuthenticateUserModel('header.invalid.signature'),
    ).toThrow(new UnexpectedError())
  })

  it('should throw when the decoded payload is not valid JSON', () => {
    const payload = btoa('not-json')

    expect(() =>
      buildAuthenticateUserModel(`header.${payload}.signature`),
    ).toThrow(new UnexpectedError())
  })

  it('should decode the payload using Buffer when atob is unavailable', () => {
    const payload = btoa(
      JSON.stringify({
        sub: 42,
        email: 'buffer@example.com',
        fullName: 'Buffer Branch',
      }),
    )
    const originalAtob = globalThis.atob

    Object.defineProperty(globalThis, 'atob', {
      configurable: true,
      value: undefined,
    })

    try {
      const result = buildAuthenticateUserModel(`header.${payload}.signature`)

      expect(result.user.id).toBe(42)
      expect(result.user.email).toBe('buffer@example.com')
    } finally {
      Object.defineProperty(globalThis, 'atob', {
        configurable: true,
        value: originalAtob,
      })
    }
  })
})
