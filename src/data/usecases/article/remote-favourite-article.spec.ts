import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { RemoteFavouriteArticle } from "./remote-favourite-article";

type SutTypes = {
  sut: RemoteFavouriteArticle
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteFavouriteArticle(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
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
})