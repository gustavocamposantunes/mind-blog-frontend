import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteRegisterUser } from './RemoteRegisterUser'

import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import {
  mockAuthenticateUserModel,
  mockAuthenticationParams,
} from '@/domain/test'

type SutTypes = {
  sut: RemoteRegisterUser
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteRegisterUser(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy,
  }
}

describe('RemoteRegisterUser', () => {
  it('should call HttpPostClient with correct URL and body', async () => {
    const url = faker.internet.url()
    const { httpPostClientSpy, sut } = makeSut(url)

    const registerUserParams = mockAuthenticationParams()

    await sut.register(registerUserParams)

    expect(httpPostClientSpy.url).toBe(url)
    expect(httpPostClientSpy.body).toEqual(registerUserParams)
  })

  it('should returns an InternalServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      status: 500,
      data: { message: 'Erro interno do servidor' },
    }
    const registerUserParams = mockAuthenticationParams()
    const response = await sut.register(registerUserParams)

    expect(response.statusCode).toBe(500)
    expect(response.error).toBe('Erro interno do servidor')
  })

  it('should returns an UnexpectedError for other status codes', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      status: 502,
      data: { message: 'Erro inesperado' },
    }

    const registerUserParams = mockAuthenticationParams()
    const response = await sut.register(registerUserParams)

    expect(response.statusCode).toBe(502)
    expect(response.error).toBe('Erro inesperado')
  })

  it('should returns a valid AuthenticateUserModel on success', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const registerUserParams = mockAuthenticationParams()
    const authenticateUserModel = mockAuthenticateUserModel()

    httpPostClientSpy.response = {
      status: 200,
      data: authenticateUserModel,
    }

    const response = await sut.register(registerUserParams)

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(authenticateUserModel)
  })
})
