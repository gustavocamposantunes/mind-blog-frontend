import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteFavouriteArticle } from './remote-favourite-article'

import { HttpPostClientSpy } from '@/data/test/mock-http-client'

type SutTypes = {
  sut: RemoteFavouriteArticle
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteFavouriteArticle(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy,
  }
}

describe('RemoteFavouriteArticle', () => {
  it('should call HttpPostClient with correct URL and body', async () => {
    const url = faker.internet.url()

    const { sut, httpPostClientSpy } = makeSut(url)

    const id = faker.number.int()
    const token = faker.string.uuid()

    await sut.favorite(id, token)

    expect(httpPostClientSpy.url).toBe(url)
    expect(httpPostClientSpy.body).toStrictEqual({ id })
    expect(httpPostClientSpy.headers).toEqual({
      Authorization: `Bearer ${token}`,
    })
  })

  it('should returns an InternalServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      status: 500,
      data: { message: 'Erro interno do servidor' },
    }

    const response = await sut.favorite(faker.number.int(), faker.string.uuid())

    expect(response.statusCode).toBe(500)
    expect(response.error).toBe('Erro interno do servidor')
  })

  it('should returns an InvalidCredentialsError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      status: 403,
      data: { message: 'Credenciais inválidas' },
    }

    const response = await sut.favorite(faker.number.int(), faker.string.uuid())

    expect(response.statusCode).toBe(403)
    expect(response.error).toBe('Credenciais inválidas')
  })
})
