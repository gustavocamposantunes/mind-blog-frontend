import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteFavouriteArticle } from './remote-favourite-article'

import type { FavouriteModel } from '@/domain/models'

import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { InternalServerError, InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteFavouriteArticle
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteFavouriteArticle(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy,
  }
}

describe('RemoteFavouriteArticle', () => {
  it('should call HttpPostClient with correct URL and body', async () => {
    const url = faker.internet.url()

    const { sut, httpPostClientSpy } = makeSut(url)

    const id = faker.number.int()
    const token = faker.string.uuid()

    await sut.favorite(id, token)

    expect(httpPostClientSpy.url).toBe(url)
    expect(httpPostClientSpy.body).toStrictEqual({ id })
    expect(httpPostClientSpy.headers).toEqual({
      Authorization: `Bearer ${token}`,
    })
  })

  it('should returns an InternalServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      status: 500,
    }

    const promise = sut.favorite(faker.number.int(), faker.string.uuid())

    await expect(promise).rejects.toThrow(new InternalServerError())
  })

  it('should returns an InvalidCredentialsError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      status: 403,
    }

    const promise = sut.favorite(faker.number.int(), faker.string.uuid())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should returns an UnexpectedError when HttpPostClient returns other error status codes', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      status: 502,
    }

    const promise = sut.favorite(faker.number.int(), faker.string.uuid())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should returns a FavouriteModel if HttpPostClient returns 201', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    const favouriteModel: FavouriteModel = {
      favouriteCount: faker.number.int(),
      favourited: true,
    }

    httpPostClientSpy.response = {
      status: 201,
      data: favouriteModel,
    }

    const response = await sut.favorite(faker.number.int(), faker.string.uuid())

    expect(response.statusCode).toBe(201)
    expect(response.data).toBe(favouriteModel)
  })
})
