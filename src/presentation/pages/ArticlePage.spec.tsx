import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../test/test-utils";
import { ArticlePage } from "./ArticlePage";
import type { GetArticleByIdUseCase } from "@/domain/usecases";
import type { HttpRemoteResponse } from "@/data/protocols";
import type { ArticleModel } from "@/domain/models";
import { mockArticle } from "@/domain/test";

vi.mock("react-router-dom", async () => ({
  ...await vi.importActual("react-router-dom"),
  useNavigate: () => vi.fn()
}))

export class GetArticleByIdSpy implements GetArticleByIdUseCase {
  id: string = "0";
  async getById(id: string): Promise<HttpRemoteResponse<ArticleModel>> {
    this.id = id;
    return Promise.resolve({
      statusCode: 200,
      data: mockArticle()
    })
  }
}

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