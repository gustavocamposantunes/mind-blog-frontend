import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteListCommentsByArticleId } from './remote-list-comments-by-article-id'

import type { CommentModel } from '@/domain/models'

import { HttpStatusCode } from '@/data/protocols'
import { HttpGetClientSpy } from '@/data/test/mock-http-client'
import {
  InternalServerError,
  NotFoundError,
  UnexpectedError,
} from '@/domain/errors'

type SutTypes = {
  sut: RemoteListCommentsByArticleId
  httpClientSpy: HttpGetClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpGetClientSpy()
  const sut = new RemoteListCommentsByArticleId(url, httpClientSpy)
  return {
    sut,
    httpClientSpy,
  }
}

describe('RemoteListCommentsByArticleId', () => {
  it('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const articleId = faker.number.int()

    await sut.listByArticleId(articleId)

    expect(httpClientSpy.url).toBe(`${url}/${articleId}/comments`)
  })

  it('should returns NotFoundError if HttpGetClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      status: HttpStatusCode.notFound,
    }

    const promise = sut.listByArticleId(faker.number.int())

    await expect(promise).rejects.toThrow(new NotFoundError())
  })

  it('should returns an InternalServerError if HttpGetClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      status: HttpStatusCode.serverError,
    }

    const promise = sut.listByArticleId(faker.number.int())

    await expect(promise).rejects.toThrow(new InternalServerError())
  })

  it('should returns UnexpectedError for other status codes', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      status: 502,
    }

    const promise = sut.listByArticleId(faker.number.int())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should returns comments if HttpGetClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const comments: CommentModel[] = [
      {
        id: faker.number.int(),
        article_id: faker.number.int(),
        user_id: faker.number.int(),
        content: faker.lorem.sentence(),
        createdAt: faker.date.recent().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        user: {
          id: faker.number.int(),
          fullName: faker.person.fullName(),
          image: faker.image.avatar(),
        },
      },
    ]
    httpClientSpy.response = {
      status: HttpStatusCode.ok,
      data: comments,
    }

    const response = await sut.listByArticleId(faker.number.int())

    expect(response.statusCode).toBe(HttpStatusCode.ok)
    expect(response.data).toEqual(comments)
  })
})
