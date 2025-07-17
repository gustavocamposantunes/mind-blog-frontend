import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteRegisterArticle } from './remote-register-article'

import type { RegisterArticleParams } from '@/domain/usecases'

import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { InternalServerError, UnexpectedError } from '@/domain/errors'
import { mockArticle, mockRegisterArticleParams } from '@/domain/test'

type SutTypes = {
  sut: RemoteRegisterArticle
  httpPostSpy: HttpPostClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostSpy = new HttpPostClientSpy()
  const sut = new RemoteRegisterArticle(url, httpPostSpy)
  return {
    sut,
    httpPostSpy,
  }
}

describe('RemoteRegisterArticle', () => {
  it('should call HttpPostClient with correct URL and body', async () => {
    const url = faker.internet.url()
    const { sut, httpPostSpy } = makeSut(url)
    const params: RegisterArticleParams = mockRegisterArticleParams()
    const token = faker.string.uuid()
    await sut.register(params, token)
    expect(httpPostSpy.url).toBe(url)
    expect(httpPostSpy.body).toEqual(params)
    expect(httpPostSpy.headers).toEqual({
      Authorization: `Bearer ${token}`,
    })
  })

  it('should returns an InternalServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPostSpy } = makeSut()
    httpPostSpy.response = {
      status: 500,
    }

    const promise = sut.register(
      mockRegisterArticleParams(),
      faker.string.uuid(),
    )

    await expect(promise).rejects.toThrow(new InternalServerError())
  })

  it('should returns an UnexpectedError for other status codes', async () => {
    const { sut, httpPostSpy } = makeSut()
    httpPostSpy.response = {
      status: 502,
      data: { message: 'Erro inesperado' },
    }

    const promise = sut.register(
      mockRegisterArticleParams(),
      faker.string.uuid(),
    )

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should returns an ArticleModel if HttpPostClient returns 201', async () => {
    const { sut, httpPostSpy } = makeSut()
    const article = mockArticle()
    httpPostSpy.response = {
      status: 201,
      data: article,
    }

    const response = await sut.register(
      mockRegisterArticleParams(),
      faker.string.uuid(),
    )

    expect(response.statusCode).toBe(201)
    expect(response.data).toEqual(article)
  })
})
