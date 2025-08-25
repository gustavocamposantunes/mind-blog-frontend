import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'

import { RemoteDeleteArticleById } from './remote-delete-article-by-id'

import { HttpDeleteClientSpy } from '@/data/test/mock-http-client'

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
})
