import { describe, it, vi, beforeEach, expect } from 'vitest'

import { GetArticleByIdSpy, renderEditArticlePage } from '../test'
import { cleanup, screen, waitFor } from '../test/test-utils'

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

  it('should render the edit article form when data is loaded', async () => {
    makeSut()

    await screen.findByRole('form')
  })

  it('should render the form header', async () => {
    makeSut()

    await screen.findByTestId('form-header')
  })

  it('should render the title input filled', async () => {
    const { getArticleByIdSpy } = makeSut()

    const textAreaTitle = await screen.findByTestId('textaread-title')

    await waitFor(() => {
      expect(textAreaTitle).toHaveProperty('value', getArticleByIdSpy.data.title)
    })
  })

  it('should render the content input filled', async () => {
    const { getArticleByIdSpy } = makeSut()

    const textAreaContent = await screen.findByTestId('textaread-content')

    await waitFor(() => {
      expect(textAreaContent).toHaveProperty('value', getArticleByIdSpy.data.content)
    })
  })

  it('should render the article image', async () => {
    const { getArticleByIdSpy } = makeSut()

    const articleImage = await screen.findByTestId('selected-image')

    await waitFor(() => {
      expect(articleImage).toHaveProperty('src', getArticleByIdSpy.data.image)
    })
  })
})
