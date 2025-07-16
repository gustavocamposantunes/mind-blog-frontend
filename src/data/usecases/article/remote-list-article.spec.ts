import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteListArticles } from './remote-list-articles'

import type { ArticleListModel } from '@/domain/models'

import { HttpStatusCode } from '@/data/protocols'
import { HttpGetClientSpy } from '@/data/test/mock-http-client'
import {
  InternalServerError,
  NotFoundError,
  UnexpectedError,
} from '@/domain/errors'
import {
  mockArticlesList,
  mockArticlesPaginationQueryParams,
} from '@/domain/test'

type SutTypes = {
  sut: RemoteListArticles
  httpClientSpy: HttpGetClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpGetClientSpy()
  const sut = new RemoteListArticles(url, httpClientSpy)
  return {
    sut,
    httpClientSpy,
  }
}

describe('RemoteListArticles', () => {
  it('should call HttpGetClient with correct URL and queryParams', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    const pagination = mockArticlesPaginationQueryParams()
    await sut.listAll(pagination)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.queryParams).toBe(pagination)
  })

  it('should returns NotFoundError if HttpGetClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      status: HttpStatusCode.notFound,
    }

    const promise = sut.listAll(mockArticlesPaginationQueryParams())

    await expect(promise).rejects.toThrow(new NotFoundError())
  })

  it('should returns an InternalServerError if HttpGetClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      status: HttpStatusCode.serverError,
    }

    const promise = sut.listAll(mockArticlesPaginationQueryParams())

    await expect(promise).rejects.toThrow(new InternalServerError())
  })

  it('should returns UnexpectedError for other status codes', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      status: 502,
    }

    const promise = sut.listAll(mockArticlesPaginationQueryParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should returns an ArticleListModel if HttpGetClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const articleList: ArticleListModel = mockArticlesList()
    httpClientSpy.response = {
      status: 200,
      data: articleList,
    }
    const response = await sut.listAll(mockArticlesPaginationQueryParams())
    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(articleList)
  })
})
