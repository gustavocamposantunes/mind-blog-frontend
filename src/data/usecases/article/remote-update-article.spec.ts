import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteUpdateArticle } from './remote-update-article'

import { HttpPutClientSpy } from '@/data/test/mock-http-client'

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
    const body = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(10),
    }

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
      data: { message: 'Erro interno do servidor' },
    }

    const response = await sut.update(faker.string.uuid(), {
      image: faker.image.urlLoremFlickr(),
    })

    expect(response.statusCode).toBe(500)
    expect(response.error).toBe('Erro interno do servidor')
  })
})
