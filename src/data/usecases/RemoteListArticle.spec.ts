import { faker } from "@faker-js/faker";
import { HttpGetClientSpy } from "../test/mock-http-client";
import { RemoteListArticles } from "./RemoteListArticles";
import { describe, expect, it } from "vitest";
import type { ArticleListModel } from "@/domain/models";

type SutTypes = {
  sut: RemoteListArticles;
  httpClientSpy: HttpGetClientSpy;
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpGetClientSpy();
  const sut = new RemoteListArticles(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
}

describe("RemoteListArticles", () => {
  it("should call HttpGetClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    await sut.listAll();

    expect(httpClientSpy.url).toBe(url);
  });

  it("should return NotFoundError if HttpGetClient returns 404", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      status: 404,
      data: { message: "Artigo não encontrado" }
    };

    const response = await sut.listAll();

    expect(response.statusCode).toBe(404);
    expect(response.error).toBe("Artigo não encontrado");
  });

  it("should return UnexpectedError for other status codes", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      status: 500,
      data: { message: "Erro inesperado" }
    };

    const response = await sut.listAll();

    expect(response.statusCode).toBe(500);
    expect(response.error).toBe("Erro inesperado");
  });

  it("should return an ArticleListModel if HttpGetClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const articleList: ArticleListModel = {
      posts: [
        {
          id: faker.number.int(),
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(3),
          author_id: faker.number.int(),
          publishedAt: faker.date.past().toISOString(),
          updatedAt: faker.date.recent().toISOString()
        }
      ],
      limit: 10,
      page: 1,
      total: 1
    };
    httpClientSpy.response = {
      status: 200,
      data: articleList
    };
    const response = await sut.listAll();
    expect(response.statusCode).toBe(200);
    expect(response.data).toEqual(articleList);
  });
});