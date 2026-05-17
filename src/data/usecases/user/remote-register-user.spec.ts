import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteRegisterUser } from './remote-register-user'

import type { AuthenticateUserModel } from '@/domain/models'

import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import {
  BadRequestError,
  InternalServerError,
  UnexpectedError,
} from '@/domain/errors'
import { mockAuthenticateUserModel, mockRegisterUser } from '@/domain/test'

type SutTypes = {
  sut: RemoteRegisterUser
  httpPostClientSpy: HttpPostClientSpy
  authenticateUserModel: AuthenticateUserModel
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const authenticateUserModel = mockAuthenticateUserModel()
  httpPostClientSpy.response = {
    status: 201,
    data: {
      accessToken: authenticateUserModel.accessToken,
    },
  }
  const sut = new RemoteRegisterUser(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy,
    authenticateUserModel,
  }
}

describe('RemoteRegisterUser', () => {
  it('should call HttpPostClient with correct URL and body', async () => {
    const url = faker.internet.url()
    const { httpPostClientSpy, sut } = makeSut(url)

    const registerUserParams = mockRegisterUser()

    await sut.register(registerUserParams)

    expect(httpPostClientSpy.url).toBe(url)
    expect(httpPostClientSpy.body).toEqual(registerUserParams)
  })

  it('should returns an InternalServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      status: 500,
    }
    const registerUserParams = mockRegisterUser()
    const promise = sut.register(registerUserParams)

    await expect(promise).rejects.toThrow(new InternalServerError())
  })

  it('should return a BadRequestError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      status: 400,
      error: { message: 'Erro de validação' },
    }
    const registerUserParams = mockRegisterUser()
    const promise = sut.register(registerUserParams)

    await expect(promise).rejects.toThrow(new BadRequestError())
  })

  it('should returns an UnexpectedError for other status codes', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      status: 502,
    }

    const registerUserParams = mockRegisterUser()
    const promise = sut.register(registerUserParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should returns a valid AuthenticateUserModel on success', async () => {
    const { sut, authenticateUserModel } = makeSut()
    const registerUserParams = mockRegisterUser()

    const response = await sut.register(registerUserParams)

    expect(response.statusCode).toBe(201)
    expect(response.data).toEqual(authenticateUserModel)
  })

  it('should build the model when HttpPostClient returns a string token', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const registerUserParams = mockRegisterUser()
    const payload = btoa(
      JSON.stringify({
        sub: 1,
        email: 'john@example.com',
        fullName: 'John Doe',
      }),
    )

    httpPostClientSpy.response = {
      status: 201,
      data: `header.${payload}.signature`,
    }

    const response = await sut.register(registerUserParams)

    expect(response.statusCode).toBe(201)
    expect(response.data?.accessToken).toBe(`header.${payload}.signature`)
  })

  it('should throw UnexpectedError when the returned payload cannot be extracted', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const registerUserParams = mockRegisterUser()

    httpPostClientSpy.response = {
      status: 201,
      data: { foo: 'bar' },
    }

    await expect(sut.register(registerUserParams)).rejects.toThrow(
      new UnexpectedError(),
    )
  })
})
