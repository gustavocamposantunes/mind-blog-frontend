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
});