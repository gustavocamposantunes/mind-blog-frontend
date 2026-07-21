import { describe, expect, it } from 'vitest'

import {
  buildRemoteResponse,
  throwMappedHttpError,
} from './handle-http-response'

import { HttpStatusCode } from '@/data/protocols'
import {
  InternalServerError,
  InvalidCredentialsError,
  NotFoundError,
  UnexpectedError,
} from '@/domain/errors'

describe('HTTP use case response helpers', () => {
  it('builds a remote response with statusCode and data', () => {
    expect(buildRemoteResponse(HttpStatusCode.ok, { id: 1 })).toEqual({
      statusCode: HttpStatusCode.ok,
      data: { id: 1 },
    })
  })

  it('maps server errors', () => {
    expect(() => throwMappedHttpError(HttpStatusCode.serverError)).toThrow(
      InternalServerError,
    )
  })

  it('maps not found errors when enabled', () => {
    expect(() =>
      throwMappedHttpError(HttpStatusCode.notFound, {
        notFound: true,
      }),
    ).toThrow(NotFoundError)
  })

  it('maps unauthorized and forbidden errors when enabled', () => {
    expect(() =>
      throwMappedHttpError(HttpStatusCode.unauthorized, {
        credentials: true,
      }),
    ).toThrow(InvalidCredentialsError)

    expect(() =>
      throwMappedHttpError(HttpStatusCode.forbidden, {
        credentials: true,
      }),
    ).toThrow(InvalidCredentialsError)
  })

  it('maps unknown status codes to unexpected errors', () => {
    expect(() => throwMappedHttpError(HttpStatusCode.badRequest)).toThrow(
      UnexpectedError,
    )
  })
})
