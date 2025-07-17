import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteUnfavouriteArticle } from './remote-unfavourite-article'

import type { FavouriteModel } from '@/domain/models'

import { HttpDeleteClientSpy } from '@/data/test/mock-http-client'
import {
  InternalServerError,
  InvalidCredentialsError,
  UnexpectedError,
} from '@/domain/errors'

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
    }

    const promise = sut.unfavourite(faker.number.int(), faker.string.uuid())

    await expect(promise).rejects.toThrow(new InternalServerError())
  })

  it('should returns an InvalidCredentialsError if HttpDeleteClient returns 403', async () => {
    const { sut, httpDeleteClientSpy } = makeSut()

    httpDeleteClientSpy.response = {
      status: 403,
    }

    const promise = sut.unfavourite(faker.number.int(), faker.string.uuid())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should returns an UnexpectedError when HttpDeleteClient returns other error status codes', async () => {
    const { sut, httpDeleteClientSpy } = makeSut()

    httpDeleteClientSpy.response = {
      status: 502,
      data: { message: 'Erro inesperado' },
    }

    const promise = sut.unfavourite(faker.number.int(), faker.string.uuid())

    await expect(promise).rejects.toThrow(new UnexpectedError())
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
