import { faker } from "@faker-js/faker";
import { RemoteGetArticleById } from "./RemoteGetArticleById";
import { HttpGetClientSpy } from "../test/mock-http-client";
import { describe, it, expect } from "vitest";

const makeSut = (url = faker.internet.url()) => {
  const httpClientSpy = new HttpGetClientSpy();
  const sut = new RemoteGetArticleById(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
}

describe("RemoteGetArticleById", () => {
  it("should call HttpGetClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    const articleId = faker.string.uuid();
    await sut.getById(articleId);

    expect(httpClientSpy.url).toBe(`${url}/${articleId}`);
  });
});