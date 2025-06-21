import { render, screen } from "../test/test-utils";
import { ArticlesPage } from "./ArticlesPage";
import { describe, expect, it, vi } from "vitest";
import { listArticlesSpy } from "../test";

vi.mock("react-router-dom", async () => ({
  ...await vi.importActual("react-router-dom"),
  useNavigate: () => vi.fn()
}))

type SutTypes = {
  listArticlesListSpy: listArticlesSpy
}

const makeSut = (): SutTypes => {
  const listArticlesListSpy = new listArticlesSpy();

  render(
    <ArticlesPage listArticles={listArticlesListSpy} />
  )
  return {
    listArticlesListSpy
  }
}

describe("ArticlesPage", () => {
  it("should render skeletons while is loading", async () => {
    makeSut();

    const skeletons = await screen.findAllByTestId("custom-skeleton");

    expect(skeletons).toBeTruthy();
    expect(skeletons.length).toBe(6);
  })
})