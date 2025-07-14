import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  FavouriteArticleSpy,
  GetArticleByIdSpy,
  renderArticlePageWithRouter,
} from '../test'
import { cleanup, fireEvent, screen } from '../test/test-utils'
import { formatDateToShortMonth } from '../utils/dateFormatter'

import { UnexpectedError } from '@/domain/errors'

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
}))

type SutTypes = {
  getArticleByIdSpy: GetArticleByIdSpy
  favouriteArticleSpy: FavouriteArticleSpy
}

const makeSut = (
  getArticleByIdSpy = new GetArticleByIdSpy(),
  favouriteArticleSpy = new FavouriteArticleSpy(),
): SutTypes => {
  renderArticlePageWithRouter(getArticleByIdSpy, favouriteArticleSpy)

  return {
    getArticleByIdSpy,
    favouriteArticleSpy,
  }
}

describe('ArticlePage', () => {
  beforeEach(cleanup)
  describe('Article', () => {
    it('should render a skeleton group while the content is loading', async () => {
      makeSut()

      const skeletonGroup = await screen.findByTestId('skeleton-group')

      expect(skeletonGroup).toBeTruthy()
    })

    it('should render an error message if throws', async () => {
      const getArticleByIdSpy = new GetArticleByIdSpy()

      const error = new UnexpectedError()
      vi.spyOn(getArticleByIdSpy, 'getById').mockRejectedValueOnce(error)

      makeSut(getArticleByIdSpy, undefined)

      const errorWrapper = await screen.findByTestId('error-wrapper')
      expect(errorWrapper.textContent).toBe('Erro inesperado')
    })

    it('should render the article correctly', async () => {
      const { getArticleByIdSpy } = makeSut()

      const articleTitle = await screen.findByText(getArticleByIdSpy.data.title)
      const articleContent = await screen.findByTestId('article-content')
      const articleDate = await screen.findByTestId('published-at')
      const articleImage = (await screen.findByAltText(
        getArticleByIdSpy.data.title,
      )) as HTMLImageElement

      expect(articleTitle).toBeTruthy()
      expect(articleContent.textContent).toBe(getArticleByIdSpy.data.content)
      expect(articleDate.textContent).toEqual(
        expect.stringContaining(
          formatDateToShortMonth(getArticleByIdSpy.data.publishedAt),
        ),
      )
      expect(articleImage).toBeTruthy()
      expect(articleImage.src).toEqual(getArticleByIdSpy.data.image)
    })
  })

  const setupFavouriteError = async () => {
    const favouriteArticleSpy = new FavouriteArticleSpy()
    const mockedError = new UnexpectedError()
    vi.spyOn(favouriteArticleSpy, 'favorite').mockRejectedValueOnce(mockedError)
    makeSut(undefined, favouriteArticleSpy)

    const favouriteToogle = await screen.findByTestId('favourite-toogle')

    fireEvent.click(favouriteToogle)

    return {
      mockedError,
      favouriteToogle,
    }
  }

  describe('Favourite', () => {
    it('should render a toast.error if favourite article fails', async () => {
      const { mockedError } = await setupFavouriteError()

      const toastError = await screen.findByText(mockedError.message)

      expect(toastError).toBeTruthy()
    })
  })
})
