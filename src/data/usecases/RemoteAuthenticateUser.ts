import { HttpStatusCode, type HttpPostClient } from '../protocols'

import type { HttpRemoteResponse } from '../protocols/http/HttpRemoteResponse'
import type { AuthenticateUserModel } from '@/domain/models'
import type {
  AuthenticateUserUseCase,
  AuthParams,
} from '@/domain/usecases/AuthenticateUserUseCase'

import {
  InternalServerError,
  InvalidCredentialsError,
  NotFoundError,
  UnexpectedError,
} from '@/domain/errors'

export class RemoteAuthenticateUser implements AuthenticateUserUseCase {
  private readonly url: string
  private readonly httpClient: HttpPostClient

  constructor(url: string, httpClient: HttpPostClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async auth(
    authenticationParams: AuthParams,
  ): Promise<HttpRemoteResponse<AuthenticateUserModel>> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: authenticationParams,
    })

    const { status, data } = httpResponse

    switch (status) {
      case HttpStatusCode.ok:
        return {
          statusCode: status,
          data: data as AuthenticateUserModel,
        }
      case HttpStatusCode.unauthorized:
        return {
          statusCode: status,
          error: new InvalidCredentialsError().message,
        }
      case HttpStatusCode.notFound:
        return {
          statusCode: status,
          error: new NotFoundError('Usuário não encontrado').message,
        }
      case HttpStatusCode.serverError:
        return {
          statusCode: status,
          error: new InternalServerError().message,
        }
      default:
        return {
          statusCode: status,
          error: new UnexpectedError().message,
        }
    }
  }
}
