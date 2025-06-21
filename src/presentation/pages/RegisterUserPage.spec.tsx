import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "../test/test-utils";
import { RegisterUserPage } from "./RegisterUserPage";
import { RegisterUserSpy } from "../test";
import { UnexpectedError } from "@/domain/errors";
import { faker } from "@faker-js/faker";

const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => ({
  ...await vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate
}))

describe("RegisterUserPage", () => {
  beforeEach(cleanup)

  const setupSubmit = () => {
    const nameInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const password = screen.getByPlaceholderText(/digite sua senha/i);
    const passwordConfirmation = screen.getByPlaceholderText(/confirme sua senha/i);

    const fakePassowrd = faker.internet.password()
    fireEvent.change(nameInput, { target: { value: faker.person.firstName() } });
    fireEvent.change(emailInput, { target: { value: faker.internet.email() } });
    fireEvent.change(password, { target: { value: fakePassowrd } });
    fireEvent.change(passwordConfirmation, { target: { value: fakePassowrd } });

    const submitButton = screen.getByRole('button', {
      name: /criar conta/i
    });

    fireEvent.click(submitButton);
  }
  it("should render a toast.error when submit fails", async () => {
    const registerUserSpy = new RegisterUserSpy();

    const error = new UnexpectedError();
    vi.spyOn(registerUserSpy, "register").mockRejectedValueOnce(error);

    render(
      <RegisterUserPage registerUser={registerUserSpy} />
    );

    setupSubmit();

    const errorToastMessage = await screen.findByText(error.message);

    expect(errorToastMessage).toBeTruthy();
  });
});