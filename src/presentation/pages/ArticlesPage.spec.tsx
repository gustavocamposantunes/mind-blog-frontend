import { cleanup, render, screen } from "../test/test-utils";
import { ArticlesPage } from "./ArticlesPage";
import { beforeEach, describe, expect, it, vi } from "vitest";
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
  beforeEach(cleanup);
  it("should render skeletons while is loading", async () => {
    makeSut();

    const skeletons = await screen.findAllByTestId("custom-skeleton");

    expect(skeletons).toBeTruthy();
    expect(skeletons.length).toBe(6);
  });

  it("should render the articles", async () => {
    const { listArticlesListSpy } = makeSut();

    const firstArticleTitle = await screen.findByText(listArticlesListSpy.articlesList.articles[0].title);
    const firstArticleContent = await screen.findByText(listArticlesListSpy.articlesList.articles[0].content);

    expect(firstArticleTitle).toBeTruthy();
    expect(firstArticleContent).toBeTruthy();
  });
})