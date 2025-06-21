import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "../test/test-utils";
import { ArticlePage } from "./ArticlePage";
import { GetArticleByIdSpy } from "../test";
import { UnexpectedError } from "@/domain/errors";

vi.mock("react-router-dom", async () => ({
  ...await vi.importActual("react-router-dom"),
  useNavigate: () => vi.fn()
}))

type SutTypes = {
  getArticleByIdSpy: GetArticleByIdSpy
}

const makeSut = (): SutTypes => {
  const getArticleByIdSpy = new GetArticleByIdSpy();

  render(
    <ArticlePage getArticletById={getArticleByIdSpy} />
  );

  return {
    getArticleByIdSpy
  }
}

describe("ArticlePage", () => {
  beforeEach(cleanup);
  it("should render a skeleton group while the content is loading", async () => {
    makeSut();

    const skeletonGroup = await screen.findByTestId("skeleton-group")

    expect(skeletonGroup).toBeTruthy();
  });

  it("should render an error message if throws", async () => {
    const getArticleByIdSpy = new GetArticleByIdSpy();

    const error = new UnexpectedError();
    vi.spyOn(getArticleByIdSpy, "getById").mockRejectedValueOnce(error);

    render(
      <ArticlePage getArticletById={getArticleByIdSpy} />
    );

    const errorWrapper = await screen.findByTestId("error-wrapper");
    expect(errorWrapper.textContent).toBe("Erro inesperado");
  });

  it("should render the article correctly", async () => {
    const { getArticleByIdSpy } = makeSut();

    const articleTitle = await screen.findByText(getArticleByIdSpy.data.title);
    const articleContent = await screen.findByText(getArticleByIdSpy.data.content);

    expect(articleTitle).toBeTruthy();
    expect(articleContent).toBeTruthy();
  })
});