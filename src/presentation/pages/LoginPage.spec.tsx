import { describe, it, vi } from "vitest";

import { LoginPage } from "./LoginPage";
import { UnexpectedError } from "@/domain/errors";
import { faker } from "@faker-js/faker";
import { fireEvent, render, screen } from "../test/test-utils";
import { AuthenticateUserSpy } from "../test/mock-authenticate-user";

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))



describe("LoginPage", () => {
  it("should render a tooltip.error with a message if the authentication fails", async () => {
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