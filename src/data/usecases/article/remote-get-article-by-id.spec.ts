import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'

import { RemoteGetArticleById } from './remote-get-article-by-id'

import { HttpGetClientSpy } from '@/data/test/mock-http-client'
import { InternalServerError, NotFoundError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteGetArticleById
  httpClientSpy: HttpGetClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpGetClientSpy()
  const sut = new RemoteGetArticleById(url, httpClientSpy)
  return {
    sut,
    httpClientSpy,
  }
}

describe('RemoteGetArticleById', () => {
  it('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const articleId = faker.string.uuid()
    await sut.getById(articleId)

    expect(httpClientSpy.url).toBe(`${url}/${articleId}`)
  })

  it('should returs NotFoundError if HttpGetClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      status: 404,
    }

    const articleId = faker.string.uuid()
    const promise = sut.getById(articleId)

    await expect(promise).rejects.toThrow(new NotFoundError())
  })

  it('should returns an InternalServerError if HttpGetClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      status: 500,
    }

    const articleId = faker.string.uuid()
    const promise = sut.getById(articleId)

    await expect(promise).rejects.toThrow(new InternalServerError())
  })

  it('should returns UnexpectedError for other status codes', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      status: 502,
    }

    const articleId = faker.string.uuid()
    const promise = sut.getById(articleId)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should returns an ArticleModel if HttpGetClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const articleId = faker.string.uuid()
    const articleData = {
      id: articleId,
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
    }
    httpClientSpy.response = {
      status: 200,
      data: articleData,
    }

    const response = await sut.getById(articleId)
    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(articleData)
  })
})
