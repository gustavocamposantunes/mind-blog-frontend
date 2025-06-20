import { faker } from "@faker-js/faker";
import { RemoteGetArticleById } from "./RemoteGetArticleById";
import { HttpGetClientSpy } from "../test/mock-http-client";
import { describe, it, expect } from "vitest";

type SutTypes = {
  sut: RemoteGetArticleById;
  httpClientSpy: HttpGetClientSpy;
}

const makeSut = (url = faker.internet.url()): SutTypes => {
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

  it("should throw NotFoundError if HttpGetClient returns 404", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      status: 404,
      data: { message: "Artigo não encontrado" }
    };

    const articleId = faker.string.uuid();
    const response = await sut.getById(articleId);

    expect(response.statusCode).toBe(404);
    expect(response.error).toBe("Artigo não encontrado");
  });

  it("should throw UnexpectedError for other status codes", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      status: 500,
      data: { message: "Erro inesperado" }
    };

    const articleId = faker.string.uuid();
    const response = await sut.getById(articleId);

    expect(response.statusCode).toBe(500);
    expect(response.error).toBe("Erro inesperado");
  });

  it("should return an ArticleModel if HttpGetClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const articleId = faker.string.uuid();
    const articleData = {
      id: articleId,
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
    }
    httpClientSpy.response = {
      status: 200,
      data: articleData
    };

    const response = await sut.getById(articleId);
    expect(response.statusCode).toBe(200);
    expect(response.data).toEqual(articleData);
  });
});