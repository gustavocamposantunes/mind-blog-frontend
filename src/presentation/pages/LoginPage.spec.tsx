import { describe, it, vi } from "vitest";

import { LoginPage } from "./LoginPage";
import type { AuthenticateUserUseCase, AuthParams } from "@/domain/usecases";
import type { HttpRemoteResponse } from "@/data/protocols";
import type { AuthenticateUserModel } from "@/domain/models";
import { mockAuthenticateUserModel } from "@/domain/test";
import { UnexpectedError } from "@/domain/errors";
import { faker } from "@faker-js/faker";
import { fireEvent, render, screen } from "../test/test-utils";

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))

export class AuthenticateUserSpy implements AuthenticateUserUseCase {
  authenticationParams: AuthParams | undefined;
  async auth(authenticationParams: AuthParams): Promise<HttpRemoteResponse<AuthenticateUserModel>> {
    this.authenticationParams = authenticationParams

    return Promise.resolve({
      statusCode: 200,
      data: mockAuthenticateUserModel()
    })
  }
}

describe("LoginPage", () => {
  it("Should render a tooltip.error with a message if the authentication fails", async () => {
    const authenticateUserSpy = new AuthenticateUserSpy()

    const error = new UnexpectedError();
    vi.spyOn(authenticateUserSpy, 'auth').mockRejectedValueOnce(error);

    render(
      <LoginPage authenticateUser={authenticateUserSpy}/>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: faker.internet.email() } });
    fireEvent.change(passwordInput, { target: { value: faker.internet.password() } });

    fireEvent.click(submitButton);

    await screen.findByText(error.message);
  });
});