import { beforeEach, describe, expect, it, vi } from "vitest";

import { LoginPage } from "./LoginPage";
import { UnexpectedError } from "@/domain/errors";
import { faker } from "@faker-js/faker";
import { cleanup, fireEvent, render, screen, waitFor } from "../test/test-utils";
import { AuthenticateUserSpy } from "../test/mock-authenticate-user";

const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => ({
  ...await vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate
}))

type SutTypes = {
  authenticateUserSpy: AuthenticateUserSpy
}

const makeSut = (): SutTypes => {
  const authenticateUserSpy = new AuthenticateUserSpy();

  render(
    <LoginPage authenticateUser={authenticateUserSpy} />
  );

  return {
    authenticateUserSpy
  }
}

describe("LoginPage", () => {
  beforeEach(cleanup)
  const setupSubmit = () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: faker.internet.email() } });
    fireEvent.change(passwordInput, { target: { value: faker.internet.password() } });

    fireEvent.click(submitButton);
  }

  it("should render a tooltip.error with a message if the authentication fails", async () => {
    const authenticateUserSpy = new AuthenticateUserSpy();

    const error = new UnexpectedError();
    vi.spyOn(authenticateUserSpy, 'auth').mockRejectedValueOnce(error);

    render(
      <LoginPage authenticateUser={authenticateUserSpy} />
    );

    setupSubmit();

    await screen.findByText(error.message);
  });

  it("should redirects to HomePage on authentication success", async () => {
    makeSut();
    setupSubmit();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});