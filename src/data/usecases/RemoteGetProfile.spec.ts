import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";

import { HttpGetClientSpy } from "../test/mock-http-client";

import { RemoteGetProfile } from "./RemoteGetProfile";

type SutTypes = {
  sut: RemoteGetProfile;
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new RemoteGetProfile(url, httpGetClientSpy);
  return {
    sut,
    httpGetClientSpy
  };
}

describe("RemoteGetProfile", () => {
  it("should call HttpGetClient with correct URL and headers", async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    const token = faker.string.uuid()

    await sut.getProfile(token);

    expect(httpGetClientSpy.url).toBe(url);
    expect(httpGetClientSpy.headers).toEqual({
      Authorization: `Bearer ${token}`
    });
  });
})
