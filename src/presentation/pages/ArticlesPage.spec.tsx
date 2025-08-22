import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import {
  FavouriteArticleSpy,
  ListArticlesSpy,
  renderArticlesPageWithRouter,
} from '../test'
import { cleanup, fireEvent, screen } from '../test/test-utils'
import { formatDateToShortMonth } from '../utils/dateFormatter'

import { UnexpectedError } from '@/domain/errors'
import { mockArticlesList, mockAuthenticateUserModel } from '@/domain/test'

let useSearchParamsMock = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
  useSearchParams: (...args: unknown[]) => useSearchParamsMock(...args),
}))

useSearchParamsMock = vi.fn()

vi.mock('../store/auth-store', async () => ({
  useAuthStore: () => mockAuthenticateUserModel(),
}))

vi.mock('react-responsive', async () => {
  return {
    useMediaQuery: vi.fn(),
  }
})

const useMediaQueryMock = vi.mocked(
  await import('react-responsive').then((mod) => mod.useMediaQuery),
)

type SutTypes = {
  listArticlesListSpy: ListArticlesSpy
  favouriteArticleSpy: FavouriteArticleSpy
  rerender: () => void
}

const makeSut = (
  listArticlesListSpy = new ListArticlesSpy(),
  favouriteArticleSpy = new FavouriteArticleSpy(),
): SutTypes => {
  const { rerender } = renderArticlesPageWithRouter(
    listArticlesListSpy,
    favouriteArticleSpy,
  )

  return {
    listArticlesListSpy,
    favouriteArticleSpy,
    rerender,
  }
}
let currentParams: Record<string, string> = {}
let setSearchParamsMock: Mock
describe('ArticlesPage', () => {
  beforeEach(() => {
    cleanup()

    currentParams = { page: '1', limit: '10' }

    setSearchParamsMock = vi.fn((newParams: Record<string, string>) => {
      currentParams = {
        ...currentParams,
        ...newParams,
      }
    })
    useSearchParamsMock.mockImplementation(() => [
      new URLSearchParams(currentParams),
      setSearchParamsMock,
    ])
  })

  const setupAssertSkeletons = async () => {
    const skeletons = await screen.findAllByTestId('custom-skeleton')

    expect(skeletons).toBeTruthy()
    expect(skeletons.length).toBe(6)
  }

  describe('List', () => {
    it('should render skeletons while is loading', async () => {
      makeSut()

      await setupAssertSkeletons()
    })

    it('should render a error message if there is an error', async () => {
      const listArticlesListSpy = new ListArticlesSpy()

      const error = new UnexpectedError()

      vi.spyOn(listArticlesListSpy, 'listAll').mockRejectedValueOnce(error)

      makeSut(listArticlesListSpy)

      const errorMessage = await screen.findByTestId('error-message')

      expect(errorMessage).toBeInTheDocument()
      expect(errorMessage.textContent).toBe(error.message)
    })

    it('should render the articles', async () => {
      const { listArticlesListSpy } = makeSut()

      const firstArticleTitle = await screen.findByText(
        listArticlesListSpy.articlesList.articles[0].title,
      )
      const firstArticleContent = await screen.findByText(
        listArticlesListSpy.articlesList.articles[0].content,
      )
      const firstArticleDate = await screen.findAllByTestId('published-at')
      const firstArticleImage = (await screen.findByAltText(
        listArticlesListSpy.articlesList.articles[0].title,
      )) as HTMLImageElement

      expect(firstArticleTitle).toBeTruthy()
      expect(firstArticleContent).toBeTruthy()
      expect(firstArticleDate[0].textContent).toEqual(
        expect.stringContaining(
          formatDateToShortMonth(
            listArticlesListSpy.articlesList.articles[0].publishedAt,
          ),
        ),
      )
      expect(firstArticleImage).toBeTruthy()
      expect(firstArticleImage.src).toEqual(
        listArticlesListSpy.articlesList.articles[0].image,
      )
    })

    it('should render the pencil icon when an article is from the auth user', async () => {
      const { listArticlesListSpy } = makeSut()

      await screen.findByTestId(
        `card-article-${listArticlesListSpy.articlesList.articles[1].id}`,
      )

      const pencilIcon = await screen.findByTestId('pencil-icon')

      expect(pencilIcon).toBeTruthy()
    })

    it('should redirect to the article edit page when the pencil icon is clicked', async () => {
      makeSut()

      const pencilIcon = await screen.findByTestId('pencil-icon')

      fireEvent.click(pencilIcon)

      const editArticlePageMock = await screen.findByTestId(
        'edit-article-page-mock',
      )

      expect(editArticlePageMock).toBeTruthy()
    })
  })

  describe('Favourite', () => {
    it('should render a favorite heart icon on article', async () => {
      makeSut()

      const favoriteHeartIcon = await screen.findAllByTestId(
        'favorite-heart-icon',
      )

      expect(favoriteHeartIcon).toBeTruthy()
    })

    const setupFavouriteError = async () => {
      const favouriteArticleSpy = new FavouriteArticleSpy()
      const mockedError = new UnexpectedError()
      vi.spyOn(favouriteArticleSpy, 'favorite').mockRejectedValueOnce(
        mockedError,
      )
      makeSut(undefined, favouriteArticleSpy)

      const [favoriteHeartIcon] = await screen.findAllByTestId(
        'favorite-heart-icon',
      )

      fireEvent.click(favoriteHeartIcon)

      return {
        mockedError,
        favoriteHeartIcon,
      }
    }

    it('should render a toast.error when heart icon is clicked and returns an error from api', async () => {
      const { mockedError } = await setupFavouriteError()

      const error = await screen.findByText(mockedError.message)

      expect(error).toBeTruthy()
    })

    it('should mantain the heart icon fill white if an error occur', async () => {
      const { mockedError, favoriteHeartIcon } = await setupFavouriteError()

      await screen.findByText(mockedError.message)

      expect(favoriteHeartIcon.getAttribute('fill')).toBe('white')
    })

    it('should change favorite heart icon color on success', async () => {
      makeSut()

      const [favoriteHeartIcon] = await screen.findAllByTestId(
        'favorite-heart-icon',
      )

      expect(favoriteHeartIcon.getAttribute('fill')).toBe('white')

      fireEvent.click(favoriteHeartIcon)

      await screen.findByText('Artigo adicionado aos favoritos')

      expect(favoriteHeartIcon.getAttribute('fill')).toBe('red')
    })

    const setupFavouritedArticle = async () => {
      makeSut()

      const favoriteHeartIcon = await screen.findAllByTestId(
        'favorite-heart-icon',
      )

      return {
        favoriteHeartIcon: favoriteHeartIcon[1],
      }
    }

    it('should init the article favourited', async () => {
      const { favoriteHeartIcon } = await setupFavouritedArticle()

      expect(favoriteHeartIcon.getAttribute('fill')).toBe('red')
    })

    it('should not render add to favourite toast when article is already added', async () => {
      const { favoriteHeartIcon } = await setupFavouritedArticle()

      fireEvent.click(favoriteHeartIcon)

      expect(favoriteHeartIcon.getAttribute('fill')).toBe('red')

      expect(
        await screen
          .findByText('Artigo adicionado aos favoritos')
          .then((el) => el)
          .catch(() => null),
      ).toBeFalsy()
    })
  })

  describe('Pagination', () => {
    beforeEach(() => {
      useMediaQueryMock.mockImplementation(({ maxWidth }) => {
        return maxWidth === 1279
      })
    })

    it('should render the pagination correctly after data is loaded', async () => {
      makeSut()

      const pagination = await screen.findByTestId('pagination')
      expect(pagination).toBeTruthy()
    })

    it('should not render the pagination if there is only one page', async () => {
      const listArticlesListSpy = new ListArticlesSpy(mockArticlesList(5))
      makeSut(listArticlesListSpy)

      await screen.findByText(
        listArticlesListSpy.articlesList.articles[0].title,
      )

      const pagination = screen.queryByTestId('pagination')
      expect(pagination).not.toBeInTheDocument()
    })

    it('should render the first 10 articles after data is loaded', async () => {
      const { listArticlesListSpy } = makeSut()

      await screen.findByTestId('pagination')

      listArticlesListSpy.articlesList.articles.forEach((props) => {
        expect(screen.getByTestId(`card-article-${props.id}`)).toBeTruthy()
      })
    })

    it('should render correct number of pages', async () => {
      makeSut()

      await screen.findByTestId('pagination')

      const totalPages = await screen.findByTestId('total-pages')

      const paginationPreviousNext = 1
      const paginationQuantity = 2

      expect(totalPages.childElementCount).toBe(
        paginationPreviousNext + paginationQuantity,
      )
    })

    it('should render the first page as current on init', async () => {
      makeSut()

      await screen.findByTestId('pagination')

      const firstPage = await screen.findByTestId('page-1')
      expect(firstPage).toHaveAttribute('data-active', 'true')
    })

    const setupChangeToSecondPage = async () => {
      const secondPage = await screen.findByTestId('page-2')
      fireEvent.click(secondPage)
    }

    it('should change to second page as current on click', async () => {
      const { rerender } = makeSut()

      await setupChangeToSecondPage()

      rerender()

      const secondPage = await screen.findByTestId('page-2')
      expect(secondPage).toHaveAttribute('data-active', 'true')
    })

    it('should reload when current page is changed', async () => {
      const { rerender } = makeSut()

      await setupChangeToSecondPage()

      rerender()

      await setupAssertSkeletons()
    })

    it('should not render PreviousPage toggle if first page is the current', async () => {
      makeSut()

      await screen.findByTestId('page-1')

      const previousPageToggle = screen.queryByTestId('previous-page-toogle')
      expect(previousPageToggle).toBeFalsy()
    })

    it('should not render the NextPage toggle if the current page is the latest', async () => {
      const { rerender } = makeSut()

      await setupChangeToSecondPage()

      rerender()

      const secondPage = await screen.findByTestId('page-2')
      expect(secondPage).toHaveAttribute('data-active', 'true')

      const nextPageToggle = screen.queryByTestId('next-page-toogle')
      expect(nextPageToggle).toBeFalsy()
    })

    const setupChangeToNextPage = async () => {
      const { rerender } = makeSut()

      const firstPage = await screen.findByTestId('page-1')
      expect(firstPage).toHaveAttribute('data-active', 'true')

      const nextPageToogle = await screen.findByTestId('next-page-toogle')
      fireEvent.click(nextPageToogle)

      rerender()

      return {
        rerender: () => rerender(),
      }
    }

    it('should change to NextPage when toogle is clicked', async () => {
      await setupChangeToNextPage()

      const secondPage = await screen.findByTestId('page-2')
      expect(secondPage).toHaveAttribute('data-active', 'true')
    })

    it('should change to PreviousPage when toogle is clicked', async () => {
      const { rerender } = await setupChangeToNextPage()

      const previousPageToogle = await screen.findByTestId(
        'previous-page-toogle',
      )
      fireEvent.click(previousPageToogle)

      rerender()

      const firstPage = await screen.findByTestId('page-1')
      expect(firstPage).toHaveAttribute('data-active', 'true')
    })

    const setupRenderSixPages = async () => {
      const listArticlesListSpy = new ListArticlesSpy(mockArticlesList(60))
      makeSut(listArticlesListSpy)

      await screen.findByTestId('pagination')
    }

    it('should always show the first and last page', async () => {
      await setupRenderSixPages()

      const firstPage = screen.getByTestId('page-1')
      const lastPage = screen.getByTestId('page-6')

      expect(firstPage).toHaveAttribute('data-first')
      expect(lastPage).toHaveAttribute('data-last')
    })

    it('should render at most five numbered pages and include ellipsis if needed', async () => {
      await setupRenderSixPages()

      const numberedPages = screen.getAllByTestId(/^page-/)
      const ellipses = screen.queryAllByTestId('pagination-ellipsis')

      expect(numberedPages.length).toBeLessThanOrEqual(5)
      expect(ellipses.length).toBeLessThanOrEqual(2)
    })

    it('should define the page and limit based in search params', async () => {
      useMediaQueryMock.mockImplementation(({ maxWidth }) => {
        return maxWidth === 1024
      })

      useSearchParamsMock.mockImplementation(() => [
        new URLSearchParams('page=2&limit=5'),
        vi.fn(),
      ])

      const { listArticlesListSpy } = makeSut()

      const secondPage = await screen.findByTestId('page-2')
      expect(secondPage).toHaveAttribute('data-active', 'true')
      expect(listArticlesListSpy.page).toBe(2)
      expect(listArticlesListSpy.limit).toBe(5)
    })

    it('should change the search param limit based on screen size', async () => {
      const setSearchParamsMock = vi.fn()
      useSearchParamsMock.mockImplementation(() => [
        new URLSearchParams('page=1&limit=10'),
        setSearchParamsMock,
      ])

      useMediaQueryMock.mockImplementation(({ maxWidth }) => {
        return maxWidth === 1024
      })

      const { listArticlesListSpy } = makeSut()

      const articlesLink = screen.getByRole('link', {
        name: /artigos/i,
      })

      expect(articlesLink).toHaveAttribute(
        'href',
        `/articles?page=1&limit=${listArticlesListSpy.limit}`,
      )

      expect(setSearchParamsMock).toHaveBeenCalledWith({
        page: '1',
        limit: String(listArticlesListSpy.limit),
      })

      expect(listArticlesListSpy.limit).toBe(5)
    })
  })
})
