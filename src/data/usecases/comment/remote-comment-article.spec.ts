import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteCommentArticle } from './remote-comment-article'

import { HttpStatusCode } from '@/data/protocols'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import {
  InternalServerError,
  InvalidCredentialsError,
  UnexpectedError,
} from '@/domain/errors'

type SutTypes = {
  sut: RemoteCommentArticle
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteCommentArticle(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy,
  }
}

describe('RemoteCommentArticle', () => {
  it('should call HttpPostClient with correct URL, body, and headers', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    const params = {
      article_id: faker.number.int(),
      content: faker.lorem.sentence(),
    }
    const token = faker.string.uuid()

    await sut.comment(params, token)

    expect(httpPostClientSpy.url).toBe(url)
    expect(httpPostClientSpy.body).toStrictEqual(params)
    expect(httpPostClientSpy.headers).toEqual({
      Authorization: `Bearer ${token}`,
    })
  })

  it('should returns an InternalServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      status: HttpStatusCode.serverError,
    }

    const promise = sut.comment(
      { article_id: faker.number.int(), content: faker.lorem.sentence() },
      faker.string.uuid(),
    )

    await expect(promise).rejects.toThrow(new InternalServerError())
  })

  it('should returns an InvalidCredentialsError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      status: HttpStatusCode.forbidden,
    }

    const promise = sut.comment(
      { article_id: faker.number.int(), content: faker.lorem.sentence() },
      faker.string.uuid(),
    )

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should returns UnexpectedError when HttpPostClient returns other error status codes', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      status: 502,
    }

    const promise = sut.comment(
      { article_id: faker.number.int(), content: faker.lorem.sentence() },
      faker.string.uuid(),
    )

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should returns void if HttpPostClient returns 201', async () => {
    const { sut } = makeSut()

    const response = await sut.comment(
      { article_id: faker.number.int(), content: faker.lorem.sentence() },
      faker.string.uuid(),
    )

    expect(response.statusCode).toBe(HttpStatusCode.created)
    expect(response.data).toBeUndefined()
  })
})
