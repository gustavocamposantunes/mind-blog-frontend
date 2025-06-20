import { faker } from "@faker-js/faker";
import { HttpGetClientSpy } from "../test/mock-http-client";
import { RemoteListArticles } from "./RemoteListArticles";
import { describe, expect, it } from "vitest";

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
});