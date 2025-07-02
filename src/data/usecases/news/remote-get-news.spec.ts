import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteGetNews } from './remote-get-news'

import { HttpGetClientSpy } from '@/data/test/mock-http-client'
import { mockNews } from '@/domain/test'

type SutTypes = {
  sut: RemoteGetNews
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteGetNews(url, httpGetClientSpy)
  return {
    httpGetClientSpy,
    sut,
  }
}

describe('RemoteGetNews', () => {
  it('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)

    await sut.getNews()

    expect(httpGetClientSpy.url).toBe(url)
  })

  it('should return an InternalServerError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    httpGetClientSpy.response = {
      status: 500,
      data: { message: 'Erro interno do servidor' },
    }

    const response = await sut.getNews()

    expect(response.statusCode).toBe(500)
    expect(response.error).toBe('Erro interno do servidor')
  })

  it('should return an UnexpectedError for other status codes', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      status: 502,
      data: { message: 'Erro inesperado' },
    }

    const response = await sut.getNews()

    expect(response.statusCode).toBe(502)
    expect(response.error).toBe('Erro inesperado')
  })

  it('should return an NewsModel if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const news = mockNews()

    httpGetClientSpy.response = {
      status: 200,
      data: news,
    }

    const response = await sut.getNews()

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(news)
  })
})
