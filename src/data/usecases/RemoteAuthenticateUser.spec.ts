import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { HttpPostClientSpy } from "../test/mock-http-client";
import { RemoteAuthenticateUser } from "./RemoteAuthenticateUser";
import { mockAuthenticateUserModel, mockAuthenticationParams } from "@/domain/test/mock-authentication";

const makeSut = (url = faker.internet.url()) => {
  const httpPostClientSpy = new HttpPostClientSpy();
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

  it("should returns an InvalidCredentialsError if HttpPostClient returns 401", async () => {
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

  it("should returns a NotFoundError if HttpPostClient returns 404", async () => {
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

  it("should returns an InternalServerError if HttpPostClient returns 500", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      status: 500,
      data: { message: "Erro interno do servidor" }
    };
    const authenticationParams = mockAuthenticationParams();
    const response = await sut.auth(authenticationParams);

    expect(response.statusCode).toBe(500);
    expect(response.error).toBe("Erro interno do servidor");
  });

  it("should returns an UnexpectedError for other status codes", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      status: 502,
      data: { message: "Erro inesperado" }
    };

    const authenticationParams = mockAuthenticationParams();
    const response = await sut.auth(authenticationParams);

    expect(response.statusCode).toBe(502);
    expect(response.error).toBe("Erro inesperado");
  });

  it("should returns a valid AuthenticateUserModel on success", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthenticationParams();
    const authenticateUserModel = mockAuthenticateUserModel();

    httpPostClientSpy.response = {
      status: 200,
      data: authenticateUserModel
    };

    const response = await sut.auth(authenticationParams);

    expect(response.statusCode).toBe(200);
    expect(response.data).toEqual(authenticateUserModel);
  });
});