import { HttpStatusCode, type HttpPostClient } from '../../protocols'

import type { HttpRemoteResponse } from '../../protocols/http/http-remote-response'
import type { AuthenticateUserModel } from '@/domain/models'
import type {
  AuthenticateUserUseCase,
  AuthParams,
} from '@/domain/usecases/auth/authenticate-user.usecase'

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
        throw new InvalidCredentialsError()
      case HttpStatusCode.notFound:
        throw new NotFoundError('Usuário não encontrado')
      case HttpStatusCode.serverError:
        throw new InternalServerError()
      default:
        throw new UnexpectedError()
    }
  }
}
