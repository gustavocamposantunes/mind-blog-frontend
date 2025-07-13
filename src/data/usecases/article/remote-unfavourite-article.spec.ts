import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteUnfavouriteArticle } from './remote-unfavourite-article'

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
})
