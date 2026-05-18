import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { RemoteUpdateProfile } from './remote-update-profile'

import { HttpPutClientSpy } from '@/data/test/mock-http-client'
import { InternalServerError, UnexpectedError } from '@/domain/errors'
import { mockUser } from '@/domain/test'

type SutTypes = {
  sut: RemoteUpdateProfile
  httpPutClientSpy: HttpPutClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPutClientSpy = new HttpPutClientSpy()
  const sut = new RemoteUpdateProfile(url, httpPutClientSpy)
  return {
    sut,
    httpPutClientSpy,
  }
}

describe('RemoteUpdateProfile', () => {
  it('should call HttpPutClient with correct URL, body and headers', async () => {
    const url = faker.internet.url()
    const { sut, httpPutClientSpy } = makeSut(url)
    const token = faker.string.uuid()
    const body = {
      image: faker.image.url(),
      name: faker.person.fullName(),
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
    }

    const promise = sut.update(faker.string.uuid(), {
      image: faker.image.url(),
    })

    await expect(promise).rejects.toThrow(new InternalServerError())
  })

  it('should return an UnexpectedError for other status codes', async () => {
    const { sut, httpPutClientSpy } = makeSut()
    httpPutClientSpy.response = {
      status: 502,
    }

    const promise = sut.update(faker.string.uuid(), {
      image: faker.image.url(),
    })

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return an UserModel if HttpPutClient returns 200', async () => {
    const { sut, httpPutClientSpy } = makeSut()
    const user = mockUser()

    httpPutClientSpy.response = {
      status: 200,
      data: user,
    }

    const response = await sut.update(faker.string.uuid(), {
      image: faker.image.url(),
    })

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(user)
  })
})
