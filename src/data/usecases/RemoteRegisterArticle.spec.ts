import { faker } from "@faker-js/faker";
import { HttpPostClientMock } from "../test/mock-http-client";
import { RemoteRegisterArticle } from "./RemoteRegisterArticle";
import { describe, expect, it } from "vitest";
import type { RegisterArticleParams } from "@/domain/usecases";

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
    const params: RegisterArticleParams = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      author_id: faker.number.int(),
    }
    const token = faker.string.uuid()
    await sut.register(params, token);
    expect(httpPostSpy.url).toBe(url);
    expect(httpPostSpy.body).toEqual(params);
    expect(httpPostSpy.headers).toEqual({
      Authorization: `Bearer ${token}`
    });
  });
});