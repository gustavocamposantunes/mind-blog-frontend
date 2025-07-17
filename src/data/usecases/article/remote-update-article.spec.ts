import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteUpdateArticle } from './remote-update-article'

import { HttpPutClientSpy } from '@/data/test/mock-http-client'
import { mockArticle, mockUpdateArticleParams } from '@/domain/test'
import { InternalServerError, InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteUpdateArticle
  httpPutClientSpy: HttpPutClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPutClientSpy = new HttpPutClientSpy()
  const sut = new RemoteUpdateArticle(url, httpPutClientSpy)

  return {
    sut,
    httpPutClientSpy,
  }
}

describe('RemoteUpdateArticle', () => {
  it('should call HttpPutClient with correct URL, body and headers', async () => {
    const url = faker.internet.url()
    const { sut, httpPutClientSpy } = makeSut(url)
    const token = faker.string.uuid()
    const body = mockUpdateArticleParams()

    await sut.update(token, body)

    expect(httpPutClientSpy.url).toBe(url)
    expect(httpPutClientSpy.body).toBe(body)
    expect(httpPutClientSpy.headers).toEqual({
      Authorization: `Bearer ${token}`,
    })
  })

  it('should returns an InternalServerError if HttpPutClient returns 500', async () => {
    const { sut, httpPutClientSpy } = makeSut()
    httpPutClientSpy.response = {
      status: 500,
    }

    const promise = sut.update(
      faker.string.uuid(),
      mockUpdateArticleParams(),
    )

    await expect(promise).rejects.toThrow(new InternalServerError())
  })

  it('should returns an InvalidCredentialsError if HttpPutClient returns 403', async () => {
    const { sut, httpPutClientSpy } = makeSut()
    httpPutClientSpy.response = {
      status: 403,
      data: { message: 'Credenciais inválidas' },
    }

    const promise = sut.update(
      faker.string.uuid(),
      mockUpdateArticleParams(),
    )

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should return an UnexpectedError for other status codes', async () => {
    const { sut, httpPutClientSpy } = makeSut()
    httpPutClientSpy.response = {
      status: 502,
      data: { message: 'Erro inesperado' },
    }

    const promise = sut.update(
      faker.string.uuid(),
      mockUpdateArticleParams(),
    )

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return an ArticleModel if HttpPutClient returns 200', async () => {
    const { sut, httpPutClientSpy } = makeSut()
    const article = mockArticle()

    httpPutClientSpy.response = {
      status: 200,
      data: article,
    }

    const response = await sut.update(
      faker.string.uuid(),
      mockUpdateArticleParams(),
    )

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(article)
  })
})
