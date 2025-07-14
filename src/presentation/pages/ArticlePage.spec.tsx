import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  FavouriteArticleSpy,
  GetArticleByIdSpy,
  renderArticlePageWithRouter,
  UnfavouriteArticleSpy,
} from '../test'
import { cleanup, fireEvent, screen } from '../test/test-utils'
import { formatDateToShortMonth } from '../utils/dateFormatter'

import { UnexpectedError } from '@/domain/errors'
import { mockAuthenticateUserModel } from '@/domain/test'

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
}))

let mockAuthStore = mockAuthenticateUserModel()

vi.mock('../store/auth-store', async () => ({
  useAuthStore: () => mockAuthStore,
}))

type SutTypes = {
  getArticleByIdSpy: GetArticleByIdSpy
  favouriteArticleSpy: FavouriteArticleSpy
  unfavouriteArticleSpy: UnfavouriteArticleSpy
}

const makeSut = (
  getArticleByIdSpy = new GetArticleByIdSpy(),
  favouriteArticleSpy = new FavouriteArticleSpy(),
  unfavouriteArticleSpy = new UnfavouriteArticleSpy(),
): SutTypes => {
  renderArticlePageWithRouter(
    getArticleByIdSpy,
    favouriteArticleSpy,
    unfavouriteArticleSpy,
  )

  return {
    getArticleByIdSpy,
    favouriteArticleSpy,
    unfavouriteArticleSpy,
  }
}

describe('ArticlePage', () => {
  beforeEach(() => {
    cleanup()
    mockAuthStore = mockAuthenticateUserModel()
  })
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

    it('should render the favourite count', async () => {
      const { getArticleByIdSpy } = makeSut()

      const favouriteCount = await screen.findByTestId('favourite-count')

      expect(favouriteCount.textContent).toBe(
        getArticleByIdSpy.data.favouriteCount.toString(),
      )
    })

    it('should don´t render the favourite toogle if user is not logged in', async () => {
      mockAuthStore = {
        accessToken: '',
        user: {
          id: 0,
          name: '',
          email: '',
        },
      }

      const { getArticleByIdSpy } = makeSut()

      await screen.findByText(getArticleByIdSpy.data.title)

      const favouriteToogle = screen.queryByTestId('favourite-toogle')

      expect(favouriteToogle).toBeFalsy()
    })

    it('should don´t render the favourite toogle if logged user is the author', async () => {
      const getArticleByIdSpy = new GetArticleByIdSpy(
        false,
        mockAuthStore.user.id,
      )
      makeSut(getArticleByIdSpy)

      await screen.findByText(getArticleByIdSpy.data.title)

      const favouriteToogle = screen.queryByTestId('favourite-toogle')

      expect(favouriteToogle).toBeFalsy()
    })

    it('should render a toogle edit if logged user is the author', async () => {
      const getArticleByIdSpy = new GetArticleByIdSpy(
        false,
        mockAuthStore.user.id,
      )
      makeSut(getArticleByIdSpy)

      const toogleEdit = await screen.findByTestId('toogle-edit')

      expect(toogleEdit).toBeTruthy()
    })
  })

  const toogleFavourite = async () => {
    const favouriteToogle = await screen.findByTestId('favourite-toogle')

    fireEvent.click(favouriteToogle)

    return {
      favouriteToogle,
    }
  }

  const setupFavouriteError = async () => {
    const favouriteArticleSpy = new FavouriteArticleSpy()
    const mockedError = new UnexpectedError()
    vi.spyOn(favouriteArticleSpy, 'favorite').mockRejectedValueOnce(mockedError)
    makeSut(undefined, favouriteArticleSpy)

    const { favouriteToogle } = await toogleFavourite()

    const toastError = await screen.findByText(mockedError.message)

    return {
      toastError,
      favouriteToogle,
    }
  }

  describe('Favourite', () => {
    it('should render a toast.error if favourite article fails', async () => {
      const { toastError } = await setupFavouriteError()

      expect(toastError).toBeTruthy()
    })

    it('should mantain the heart icon fill white if an error occur', async () => {
      const { favouriteToogle } = await setupFavouriteError()

      expect(favouriteToogle.getAttribute('fill')).toBe('white')
    })

    it('should change favourite heart icon color on success', async () => {
      makeSut()

      const { favouriteToogle } = await toogleFavourite()

      await screen.findByText('Artigo adicionado aos favoritos')

      expect(favouriteToogle.getAttribute('fill')).toBe('red')
    })

    const favouritedArticleSetup = async () => {
      const getArticleByIdSpy = new GetArticleByIdSpy(true)
      makeSut(getArticleByIdSpy)

      const favouriteToogle = await screen.findByTestId('favourite-toogle')

      return {
        favouriteToogle,
      }
    }

    it('should init the article favourited', async () => {
      const { favouriteToogle } = await favouritedArticleSetup()

      expect(favouriteToogle.getAttribute('fill')).toBe('red')
    })

    it('should not render add to favourite toast when article is already added', async () => {
      const { favouriteToogle } = await favouritedArticleSetup()

      fireEvent.click(favouriteToogle)

      expect(
        await screen
          .findByText('Artigo adicionado aos favoritos')
          .then((el) => el)
          .catch(() => null),
      ).toBeFalsy()
    })
  })

  describe('Unfavourited', () => {
    const setupUnfavouriteError = async () => {
      const getArticleByIdSpy = new GetArticleByIdSpy(true)
      const unfavouriteArticleSpy = new UnfavouriteArticleSpy()
      const mockedError = new UnexpectedError()
      vi.spyOn(unfavouriteArticleSpy, 'unfavourite').mockRejectedValueOnce(
        mockedError,
      )

      makeSut(getArticleByIdSpy, undefined, unfavouriteArticleSpy)

      const favouriteToogle = await screen.findByTestId('favourite-toogle')

      fireEvent.click(favouriteToogle)

      return {
        mockedError,
        favouriteToogle,
      }
    }
    it('should render a toast.error when heart icon is clicked and returns an error from api', async () => {
      const { mockedError } = await setupUnfavouriteError()

      const error = await screen.findByText(mockedError.message)

      expect(error).toBeTruthy()
    })

    it('should mantain the heart icon fill red if an error occur', async () => {
      const { mockedError, favouriteToogle } = await setupUnfavouriteError()

      await screen.findByText(mockedError.message)

      expect(favouriteToogle.getAttribute('fill')).toBe('red')
    })

    it('should change favourite heart icon color on success', async () => {
      const getArticleByIdSpy = new GetArticleByIdSpy(true)

      makeSut(getArticleByIdSpy)

      const favouriteToogle = await screen.findByTestId('favourite-toogle')

      expect(favouriteToogle.getAttribute('fill')).toBe('red')

      fireEvent.click(favouriteToogle)

      await screen.findByText('Artigo removido dos favoritos')

      expect(favouriteToogle.getAttribute('fill')).toBe('white')
    })
  })
})
