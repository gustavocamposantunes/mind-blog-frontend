import { describe, it, vi, beforeEach } from 'vitest'

import { GetArticleByIdSpy, renderEditArticlePage } from '../test'
import { cleanup, screen } from '../test/test-utils'

import { NotFoundError } from '@/domain/errors'

type SutTypes = {
  getArticleByIdSpy: GetArticleByIdSpy
}

const makeSut = (getArticleByIdSpy = new GetArticleByIdSpy()): SutTypes => {
  renderEditArticlePage(getArticleByIdSpy)

  return {
    getArticleByIdSpy,
  }
}

const setupNotFoundArticle = (): SutTypes => {
  const getArticleByIdSpy = new GetArticleByIdSpy()

  const error = new NotFoundError()
  vi.spyOn(getArticleByIdSpy, 'getById').mockRejectedValueOnce(error)

  return {
    getArticleByIdSpy
  }
}
describe('EditArticlePage', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })
  it('should render an error if article is not found', async () => {
    const { getArticleByIdSpy } = setupNotFoundArticle()

    makeSut(getArticleByIdSpy)

    await screen.findByText('Erro ao buscar artigo')
  })

  it('should redirect to HomePage if article is not found', async () => {
    const { getArticleByIdSpy } = setupNotFoundArticle()

    makeSut(getArticleByIdSpy)

    await screen.findByTestId('home-page-mock')
  })

  it('should render an skeleton group when the article is not loaded yet', async () => {
    makeSut()

    await screen.findByTestId('skeleton-group')
  })
})
