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

  it("should throw an InvalidCredentialsError if HttpPostClient returns 401", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      status: 401,
      data: { message: "Credenciais inválidas" }
    };

    const authenticationParams = mockAuthenticationParams();
    const response = await sut.auth(authenticationParams);

    expect(response.statusCode).toBe(401);
    expect(response.error).toBe("Credenciais inválidas");
  });

  it("should throw a NotFoundError if HttpPostClient returns 404", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      status: 404,
      data: { message: "Usuário não encontrado" }
    };

    const authenticationParams = mockAuthenticationParams();
    const response = await sut.auth(authenticationParams);

    expect(response.statusCode).toBe(404);
    expect(response.error).toBe("Usuário não encontrado");
  });

  it("should throw an UnexpectedError for other status codes", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      status: 500,
      data: { message: "Erro inesperado" }
    };

    const authenticationParams = mockAuthenticationParams();
    const response = await sut.auth(authenticationParams);

    expect(response.statusCode).toBe(500);
    expect(response.error).toBe("Erro inesperado");
  });
});