import { HttpStatusCode, type HttpPostClient } from '../../protocols'
import { buildAuthenticateUserModel } from '../auth/build-authenticate-user-model'

import type { AuthenticateUserModel } from '@/domain/models'
import type {
  RegisterUserParams,
  RegisterUserUseCase,
} from '@/domain/usecases/user/register-user.usecase'

import {
  BadRequestError,
  InternalServerError,
  UnexpectedError,
} from '@/domain/errors'

export class RemoteRegisterUser implements RegisterUserUseCase {
  private readonly url: string
  private readonly httpClient: HttpPostClient

  constructor(url: string, httpClient: HttpPostClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async register(registerUserParams: RegisterUserParams): Promise<{
    statusCode: number
    data?: AuthenticateUserModel
    error?: string
  }> {
    const { status, data, error } = await this.httpClient.post({
      url: this.url,
      body: registerUserParams,
    })

    switch (status) {
      case HttpStatusCode.created:
        return {
          statusCode: status,
          data: buildAuthenticateUserModel(extractAccessToken(data)),
        }
      case HttpStatusCode.serverError:
        throw new InternalServerError()
      case HttpStatusCode.badRequest:
        throw new BadRequestError(error?.message)
      default:
        throw new UnexpectedError()
    }
  }
}

const extractAccessToken = (data: unknown): string => {
  if (typeof data === 'string') {
    return data
  }

  if (data && typeof data === 'object') {
    const accessToken = (data as { accessToken?: unknown }).accessToken

    if (typeof accessToken === 'string') {
      return accessToken
    }
  }

  throw new UnexpectedError()
}
