import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteGetProfile } from './RemoteGetProfile'

import { HttpGetClientSpy } from '@/data/test/mock-http-client'
import { mockUser } from '@/domain/test'

type SutTypes = {
  sut: RemoteGetProfile
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteGetProfile(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy,
  }
}

describe('RemoteGetProfile', () => {
  it('should call HttpGetClient with correct URL and headers', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    const token = faker.string.uuid()

    await sut.getProfile(token)

    expect(httpGetClientSpy.url).toBe(url)
    expect(httpGetClientSpy.headers).toEqual({
      Authorization: `Bearer ${token}`,
    })
  })

  it('should returns an InternalServerError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      status: 500,
      data: { message: 'Erro interno do servidor' },
    }

    const response = await sut.getProfile(faker.string.uuid())

    expect(response.statusCode).toBe(500)
    expect(response.error).toBe('Erro interno do servidor')
  })

  it('should return an UnexpectedError for other status codes', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      status: 502,
      data: { message: 'Erro inesperado' },
    }

    const response = await sut.getProfile(faker.string.uuid())

    expect(response.statusCode).toBe(502)
    expect(response.error).toBe('Erro inesperado')
  })

  it('should return an UserModel if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const user = mockUser()

    httpGetClientSpy.response = {
      status: 200,
      data: user,
    }

    const response = await sut.getProfile(faker.string.uuid())

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(user)
  })
})
