import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { HttpPostClientMock } from "../test/mock-http-client";
import { RemoteAuthenticateUser } from "./RemoteAuthenticateUser";
import { mockAuthenticationParams } from "@/domain/test/mock-authentication";

const makeSut = (url = faker.internet.url()) => {
  const httpPostClientSpy = new HttpPostClientMock();
  const sut = new RemoteAuthenticateUser(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy
  }
}

describe("RemoteAuthenticateUser", () => {
  it("should call HttpPostClient with correct URL and body", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    const authenticationParams = mockAuthenticationParams();
    await sut.auth(authenticationParams);

    expect(httpPostClientSpy.url).toBe(url);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });
});