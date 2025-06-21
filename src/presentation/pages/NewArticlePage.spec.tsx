import { cleanup, fireEvent, render, screen } from "../test/test-utils";
import { NewArticlePage } from "./NewArticlePage";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UnexpectedError } from "@/domain/errors";
import { faker } from "@faker-js/faker";
import { RegisterArticleSpy } from "../test";

vi.mock("react-router-dom", async () => ({
  ...await vi.importActual("react-router-dom"),
  useNavigate: () => vi.fn()
}))

type SutTypes = {
  registerArticleSpy: RegisterArticleSpy
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const makeSut = (): SutTypes => {
  const registerArticleSpy = new RegisterArticleSpy()

  render(
    <NewArticlePage registerArticle={registerArticleSpy} />
  );

  return {
    registerArticleSpy
  }
}

describe("NewArticlePage", () => {
  beforeEach(cleanup)
  
  const setupSubmit = () => {
    const titleInput = screen.getByLabelText(/título/i);
    const contentInput = screen.getByLabelText(/texto/i);

    const submitButton = screen.getByRole('button', { name: /salvar/i });

    fireEvent.change(titleInput, { target: { value: faker.lorem.sentence() } });
    fireEvent.change(contentInput, { target: { value: faker.lorem.paragraph() } });

    fireEvent.click(submitButton);
  }

  it("should render a toast.error when register fails ", async () => {
     const registerArticleSpy = new RegisterArticleSpy()

    const error = new UnexpectedError();
    
    vi.spyOn(registerArticleSpy, "register").mockRejectedValueOnce(error);

    render(
      <NewArticlePage registerArticle={registerArticleSpy} />
    );

    setupSubmit();

    const errorToastMessage = await screen.findByText(error.message);

    expect(errorToastMessage).toBeTruthy();
  });
});