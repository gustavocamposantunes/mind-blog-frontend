import type { HttpRemoteResponse } from '@/data/protocols'
import { HttpStatusCode } from '@/data/protocols'
import {
  InternalServerError,
  InvalidCredentialsError,
  NotFoundError,
  UnexpectedError,
} from '@/domain/errors'

type MappedHttpErrorOptions = {
  credentials?: boolean
  notFound?: boolean
}

export const buildRemoteResponse = <Data>(
  statusCode: HttpStatusCode,
  data: Data,
): HttpRemoteResponse<Data> => ({
  statusCode,
  data,
})

export const throwMappedHttpError = (
  status: HttpStatusCode,
  options: MappedHttpErrorOptions = {},
): never => {
  if (status === HttpStatusCode.serverError) {
    throw new InternalServerError()
  }

  if (options.notFound && status === HttpStatusCode.notFound) {
    throw new NotFoundError()
  }

  if (
    options.credentials &&
    (status === HttpStatusCode.unauthorized ||
      status === HttpStatusCode.forbidden)
  ) {
    throw new InvalidCredentialsError()
  }

  throw new UnexpectedError()
}
