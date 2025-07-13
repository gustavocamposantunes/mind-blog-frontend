import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteUnfavouriteArticle } from './remote-unfavourite-article'

import type { FavouriteModel } from '@/domain/models'

import { HttpDeleteClientSpy } from '@/data/test/mock-http-client'

type SutTypes = {
  sut: RemoteUnfavouriteArticle
  httpDeleteClientSpy: HttpDeleteClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpDeleteClientSpy = new HttpDeleteClientSpy()
  const sut = new RemoteUnfavouriteArticle(url, httpDeleteClientSpy)

  return {
    sut,
    httpDeleteClientSpy,
  }
}

describe('RemoteUnfavouriteArticle', () => {
  it('should call HttpDeleteClient with correct URL and body', async () => {
    const url = faker.internet.url()

    const { sut, httpDeleteClientSpy } = makeSut(url)

    const id = faker.number.int()
    const token = faker.string.uuid()

    await sut.unfavourite(id, token)

    expect(httpDeleteClientSpy.url).toBe(url)
    expect(httpDeleteClientSpy.body).toStrictEqual({ id })
    expect(httpDeleteClientSpy.headers).toEqual({
      Authorization: `Bearer ${token}`,
    })
  })

  it('should returns an InternalServerError if HttpPostClient returns 500', async () => {
    const { sut, httpDeleteClientSpy } = makeSut()

    httpDeleteClientSpy.response = {
      status: 500,
      data: { message: 'Erro interno do servidor' },
    }

    const response = await sut.unfavourite(
      faker.number.int(),
      faker.string.uuid(),
    )

    expect(response.statusCode).toBe(500)
    expect(response.error).toBe('Erro interno do servidor')
  })

  it('should returns an InvalidCredentialsError if HttpDeleteClient returns 403', async () => {
    const { sut, httpDeleteClientSpy } = makeSut()

    httpDeleteClientSpy.response = {
      status: 403,
      data: { message: 'Credenciais inválidas' },
    }

    const response = await sut.unfavourite(
      faker.number.int(),
      faker.string.uuid(),
    )

    expect(response.statusCode).toBe(403)
    expect(response.error).toBe('Credenciais inválidas')
  })

  it('should returns an UnexpectedError when HttpDeleteClient returns other error status codes', async () => {
    const { sut, httpDeleteClientSpy } = makeSut()

    httpDeleteClientSpy.response = {
      status: 502,
      data: { message: 'Erro inesperado' },
    }

    const response = await sut.unfavourite(
      faker.number.int(),
      faker.string.uuid(),
    )

    expect(response.statusCode).toBe(502)
    expect(response.error).toBe('Erro inesperado')
  })

  it('should returns a FavouriteModel if HttpDeleteClient returns 200', async () => {
    const { sut, httpDeleteClientSpy } = makeSut()

    const favouriteModel: FavouriteModel = {
      favouriteCount: faker.number.int(),
      favourited: true,
    }

    httpDeleteClientSpy.response = {
      status: 200,
      data: favouriteModel,
    }

    const response = await sut.unfavourite(
      faker.number.int(),
      faker.string.uuid(),
    )

    expect(response.statusCode).toBe(200)
    expect(response.data).toBe(favouriteModel)
  })
})
