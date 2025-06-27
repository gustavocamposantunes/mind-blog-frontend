import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteListArticles } from './RemoteListArticles'

import type { ArticleListModel } from '@/domain/models'

import { HttpGetClientSpy } from '@/data/test/mock-http-client'
import { mockArticlesList } from '@/domain/test'

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
  it('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.listAll()

    expect(httpClientSpy.url).toBe(url)
  })

  it('should returns NotFoundError if HttpGetClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      status: 404,
      data: { message: 'Artigo não encontrado' },
    }

    const response = await sut.listAll()

    expect(response.statusCode).toBe(404)
    expect(response.error).toBe('Artigo não encontrado')
  })

  it('should returns an InternalServerError if HttpGetClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      status: 500,
      data: { message: 'Erro interno do servidor' },
    }

    const response = await sut.listAll()

    expect(response.statusCode).toBe(500)
    expect(response.error).toBe('Erro interno do servidor')
  })

  it('should returns UnexpectedError for other status codes', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      status: 502,
      data: { message: 'Erro inesperado' },
    }

    const response = await sut.listAll()

    expect(response.statusCode).toBe(502)
    expect(response.error).toBe('Erro inesperado')
  })

  it('should returns an ArticleListModel if HttpGetClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const articleList: ArticleListModel = mockArticlesList()
    httpClientSpy.response = {
      status: 200,
      data: articleList,
    }
    const response = await sut.listAll()
    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(articleList)
  })
})
