import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'

import { RemoteDeleteArticleById } from './remote-delete-article-by-id'

import { HttpDeleteClientSpy } from '@/data/test/mock-http-client'

describe('RemoteDeleteArticleById', () => {
  it('should call HttpDeleteClient with correct URL', async () => {
    const url = faker.internet.url()
    const httpDeleteClientSpy = new HttpDeleteClientSpy()
    const sut = new RemoteDeleteArticleById(url, httpDeleteClientSpy)
    const articleId = faker.string.uuid()

    await sut.deleteById(articleId)

    expect(httpDeleteClientSpy.url).toBe(`${url}/${articleId}`)
  })
})
