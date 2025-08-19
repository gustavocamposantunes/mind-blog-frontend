import { HttpStatusCode, type HttpPostClient } from '../../protocols'

import type { AuthenticateUserModel } from '@/domain/models'
import type {
  RegisterUserParams,
  RegisterUserUseCase,
} from '@/domain/usecases/user/register-user.usecase'

import { InternalServerError, UnexpectedError } from '@/domain/errors'

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
    const { status, data } = await this.httpClient.post({
      url: this.url,
      body: registerUserParams,
    })

    switch (status) {
      case HttpStatusCode.created:
        return {
          statusCode: status,
          data: data as AuthenticateUserModel,
        }
      case HttpStatusCode.serverError:
        throw new InternalServerError()
      default:
        throw new UnexpectedError()
    }
  }
}
