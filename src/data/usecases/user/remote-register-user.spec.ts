import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteRegisterUser } from './remote-register-user'

import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { InternalServerError, UnexpectedError } from '@/domain/errors'
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
    }
    const registerUserParams = mockAuthenticationParams()
    const promise = sut.register(registerUserParams)

    await expect(promise).rejects.toThrow(new InternalServerError())
  })

  it('should returns an UnexpectedError for other status codes', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      status: 502,
    }

    const registerUserParams = mockAuthenticationParams()
    const promise = sut.register(registerUserParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should returns a valid AuthenticateUserModel on success', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const registerUserParams = mockAuthenticationParams()
    const authenticateUserModel = mockAuthenticateUserModel()

    httpPostClientSpy.response = {
      status: 201,
      data: authenticateUserModel,
    }

    const response = await sut.register(registerUserParams)

    expect(response.statusCode).toBe(201)
    expect(response.data).toEqual(authenticateUserModel)
  })
})
