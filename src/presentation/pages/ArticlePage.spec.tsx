import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../test/test-utils";
import { ArticlePage } from "./ArticlePage";
import { GetArticleByIdSpy } from "../test";

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
  it("should render a skeleton group while the content is loading", async () => {
    makeSut();

    const skeletonGroup = await screen.findByTestId("skeleton-group")

    expect(skeletonGroup).toBeTruthy();
  });
});