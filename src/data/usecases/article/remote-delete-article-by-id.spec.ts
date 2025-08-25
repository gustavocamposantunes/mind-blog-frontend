import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'

import { RemoteDeleteArticleById } from './remote-delete-article-by-id'

import { HttpDeleteClientSpy } from '@/data/test/mock-http-client'
import { NotFoundError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteDeleteArticleById
  httpDeleteClientSpy: HttpDeleteClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpDeleteClientSpy = new HttpDeleteClientSpy()
  const sut = new RemoteDeleteArticleById(url, httpDeleteClientSpy)

  return {
    sut,
    httpDeleteClientSpy,
  }
}

describe('RemoteDeleteArticleById', () => {
  it('should call HttpDeleteClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpDeleteClientSpy } = makeSut(url)
    const articleId = faker.string.uuid()

    await sut.deleteById(articleId)

    expect(httpDeleteClientSpy.url).toBe(`${url}/${articleId}`)
  })

  it('should throw NotFoundError if HttpDeleteClient returns 404', async () => {
    const { sut, httpDeleteClientSpy } = makeSut()
    httpDeleteClientSpy.response = {
      status: 404,
    }

    const articleId = faker.string.uuid()
    const promise = sut.deleteById(articleId)

    await expect(promise).rejects.toThrow(new NotFoundError())
  })

  it('should throw UnexpectedError for other status codes', async () => {
    const { sut, httpDeleteClientSpy } = makeSut()
    httpDeleteClientSpy.response = {
      status: 502,
    }

    const articleId = faker.string.uuid()
    const promise = sut.deleteById(articleId)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
