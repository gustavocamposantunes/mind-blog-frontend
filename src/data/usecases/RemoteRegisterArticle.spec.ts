import { faker } from "@faker-js/faker";
import { HttpPostClientMock } from "../test/mock-http-client";
import { RemoteRegisterArticle } from "./RemoteRegisterArticle";
import { describe, expect, it } from "vitest";
import type { RegisterArticleParams } from "@/domain/usecases";
import { mockRegisterArticleParams } from "../test";

type SutTypes = {
  sut: RemoteRegisterArticle;
  httpPostSpy: HttpPostClientMock;
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostSpy = new HttpPostClientMock();
  const sut = new RemoteRegisterArticle(url, httpPostSpy);
  return {
    sut,
    httpPostSpy
  };
}

describe("RemoteRegisterArticle", () => {
  it("should call HttpPostClient with correct URL and body", async () => {
    const url = faker.internet.url();
    const { sut, httpPostSpy } = makeSut(url);
    const params: RegisterArticleParams = mockRegisterArticleParams();
    const token = faker.string.uuid()
    await sut.register(params, token);
    expect(httpPostSpy.url).toBe(url);
    expect(httpPostSpy.body).toEqual(params);
    expect(httpPostSpy.headers).toEqual({
      Authorization: `Bearer ${token}`
    });
  });

  it("should returns an InternalServerError if HttpPostClient returns 500", async () => {
    const { sut, httpPostSpy } = makeSut();
    httpPostSpy.response = {
      status: 500,
      data: { message: "Erro interno do servidor" }
    };

    const response = await sut.register(mockRegisterArticleParams(), faker.string.uuid());

    expect(response.statusCode).toBe(500);
    expect(response.error).toBe("Erro interno do servidor");
  });

  it("should returns an UnexpectedError for other status codes", async () => {
    const { sut, httpPostSpy } = makeSut();
    httpPostSpy.response = {
      status: 502,
      data: { message: "Erro inesperado" }
    };

    const response = await sut.register(mockRegisterArticleParams(), faker.string.uuid());

    expect(response.statusCode).toBe(502);
    expect(response.error).toBe("Erro inesperado");
  });
});