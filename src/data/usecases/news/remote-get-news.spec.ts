import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteGetNews } from './remote-get-news'

import { HttpGetClientSpy } from '@/data/test/mock-http-client'

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
})
