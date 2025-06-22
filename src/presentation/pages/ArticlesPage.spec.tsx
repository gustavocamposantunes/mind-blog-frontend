import { beforeEach, describe, expect, it, vi } from "vitest";

import { ListArticlesSpy } from "../test";
import { cleanup, render, screen } from "../test/test-utils";
import { formatDateToShortMonth } from "../utils/dateFormatter";

import { ArticlesPage } from "./ArticlesPage";

vi.mock("react-router-dom", async () => ({
  ...await vi.importActual("react-router-dom"),
  useNavigate: () => vi.fn()
}))

type SutTypes = {
  listArticlesListSpy: ListArticlesSpy
}

const makeSut = (): SutTypes => {
  const listArticlesListSpy = new ListArticlesSpy();

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
    const firstArticleDate = await screen.findByTestId("published-at");
    const firstArticleImage = await screen.findByAltText(listArticlesListSpy.articlesList.articles[0].title) as HTMLImageElement;

    expect(firstArticleTitle).toBeTruthy();
    expect(firstArticleContent).toBeTruthy();
    expect(firstArticleDate.textContent).toEqual(expect.stringContaining(formatDateToShortMonth(listArticlesListSpy.articlesList.articles[0].publishedAt)));
    expect(firstArticleImage).toBeTruthy();
    expect(firstArticleImage.src).toEqual(listArticlesListSpy.articlesList.articles[0].image);
  });
});