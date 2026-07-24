import { toast } from 'react-toastify'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import {
  FavouriteArticleSpy,
  ListArticlesSpy,
  renderArticlesPageWithRouter,
} from '../test'
import { cleanup, fireEvent, screen, waitFor } from '../test/test-utils'
import { formatDateToShortMonth } from '../utils/dateFormatter'

import { UnexpectedError } from '@/domain/errors'
import { InternalServerError } from '@/domain/errors'
import { mockArticlesList, mockAuthenticateUserModel } from '@/domain/test'

let useSearchParamsMock = vi.fn()

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
  useSearchParams: (...args: unknown[]) => useSearchParamsMock(...args),
}))

useSearchParamsMock = vi.fn()

vi.mock('../store', async () => ({
  ...(await vi.importActual('../store')),
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

    setSearchParamsMock = vi.fn((newParams: unknown) => {
      if (newParams instanceof URLSearchParams) {
        currentParams = {}
        newParams.forEach((value, key) => {
          currentParams[key] = value
        })
      } else if (typeof newParams === 'object' && newParams !== null) {
        currentParams = { ...(newParams as Record<string, string>) }
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

      const skeletons = await screen.findAllByTestId('custom-skeleton')

      expect(skeletons.length).toBe(6)
      expect(screen.queryByTestId('error-message')).toBeNull()
      expect(error.message).toBe('Erro inesperado')
    })

    it('should show a toast when list error is internal server error', async () => {
      const listArticlesListSpy = new ListArticlesSpy()

      const toastErrorSpy = vi.spyOn(toast, 'error').mockReturnValue('toast-id')

      vi.spyOn(listArticlesListSpy, 'listAll').mockRejectedValueOnce(
        new InternalServerError(),
      )

      makeSut(listArticlesListSpy)

      await screen.findAllByTestId('custom-skeleton')

      await waitFor(() => {
        expect(toastErrorSpy).toHaveBeenCalledWith('Erro interno do servidor')
      })
    })

    it('should render the articles', async () => {
      const { listArticlesListSpy } = makeSut()

      const firstArticleTitle = await screen.findByText(
        listArticlesListSpy.articlesList.articles[0].title,
      )
      const firstArticleContent = await screen.findByText(
        listArticlesListSpy.articlesList.articles[0].resume,
      )
      const firstArticleDate = await screen.findAllByTestId('published-by-info')
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

    it('should call navigate with article/id when card is clicked', async () => {
      const { listArticlesListSpy } = makeSut()
      const articleId = listArticlesListSpy.articlesList.articles[0].id

      const customCard = await screen.findByTestId(`custom-card-${articleId}`)

      fireEvent.click(customCard)

      expect(mockNavigate).toHaveBeenCalledWith(`/articles/${articleId}`)
    })

    it('should update the filters and switch to list view', async () => {
      const { listArticlesListSpy, rerender } = makeSut()
      const firstArticle = listArticlesListSpy.articlesList.articles[0]

      const titleFilter = await screen.findByLabelText(/buscar por título/i)
      const categoryFilter = screen.getByLabelText(/^categoria$/i)

      fireEvent.change(titleFilter, {
        target: { value: 'react' },
      })

      fireEvent.change(categoryFilter, {
        target: { value: 'IA' },
      })

      rerender()

      const clearButton = await screen.findByRole('button', { name: /limpar/i })

      fireEvent.click(clearButton)

      rerender()

      const listViewButton = screen.getByTitle('Visualização em listagem')
      fireEvent.click(listViewButton)

      rerender()

      await screen.findByTestId(`article-list-card-${firstArticle.id}`)

      expect(currentParams.page).toBe('1')
      expect(currentParams.view).toBe('list')
      expect(currentParams.title).toBeUndefined()
      expect(currentParams.category).toBeUndefined()
    })

    it('should remove title and category filters when inputs are cleared', async () => {
      const { rerender } = makeSut()

      const titleFilter = await screen.findByLabelText(/buscar por título/i)
      const categoryFilter = screen.getByLabelText(/^categoria$/i)

      fireEvent.change(titleFilter, {
        target: { value: 'react' },
      })
      rerender()

      fireEvent.change(titleFilter, {
        target: { value: '' },
      })
      rerender()

      fireEvent.change(categoryFilter, {
        target: { value: 'IA' },
      })
      rerender()

      fireEvent.change(categoryFilter, {
        target: { value: '' },
      })
      rerender()

      expect(currentParams.title).toBeUndefined()
      expect(currentParams.category).toBeUndefined()
      expect(currentParams.page).toBe('1')
    })

    it('should default page to 1 when the page query param is missing', async () => {
      currentParams = { limit: '10' }

      const { rerender } = makeSut()

      const titleFilter = await screen.findByLabelText(/buscar por título/i)

      fireEvent.change(titleFilter, {
        target: { value: 'react' },
      })

      rerender()

      expect(currentParams.page).toBe('1')
      expect(currentParams.limit).toBeTruthy()
      expect(currentParams.title).toBe('react')
    })
  })

  describe('Favourite', () => {
    it('should render a favorite button on article', async () => {
      makeSut()

      const favoriteBtn = await screen.findAllByTestId('favorite-btn')

      expect(favoriteBtn).toBeTruthy()
    })

    const setupFavouriteError = async () => {
      const favouriteArticleSpy = new FavouriteArticleSpy()
      const mockedError = new UnexpectedError()
      const toastErrorSpy = vi.spyOn(toast, 'error').mockReturnValue('toast-id')
      vi.spyOn(favouriteArticleSpy, 'favorite').mockRejectedValueOnce(
        mockedError,
      )
      makeSut(undefined, favouriteArticleSpy)

      const [favoriteBtn] = await screen.findAllByTestId('favorite-btn')

      fireEvent.click(favoriteBtn)

      return {
        mockedError,
        toastErrorSpy,
        favoriteBtn,
      }
    }

    it('should render a toast.error when heart icon is clicked and returns an error from api', async () => {
      const { mockedError, toastErrorSpy } = await setupFavouriteError()

      await waitFor(() => {
        expect(toastErrorSpy).toHaveBeenCalledWith(mockedError.message)
      })
    })

    it('should mantain the heart icon fill white if an error occur', async () => {
      const { mockedError, toastErrorSpy } = await setupFavouriteError()

      await waitFor(() => {
        expect(toastErrorSpy).toHaveBeenCalledWith(mockedError.message)
      })

      const [favoriteIcon] = screen.getAllByTestId('favorite-icon')

      expect(favoriteIcon.getAttribute('fill')).toBe('white')
    })

    it('should change favorite heart icon color on success', async () => {
      makeSut()

      const [favoriteIcon] = await screen.findAllByTestId('favorite-icon')

      expect(favoriteIcon.getAttribute('fill')).toBe('white')

      const [favoriteBtn] = screen.getAllByTestId('favorite-btn')

      fireEvent.click(favoriteBtn)

      await screen.findByText('Artigo adicionado aos favoritos')

      expect(favoriteIcon.getAttribute('fill')).toBe('red')
    })

    const setupFavouritedArticle = async () => {
      makeSut()

      const favoriteIcon = await screen.findAllByTestId('favorite-icon')
      const favoriteButton = screen.getAllByTestId('favorite-btn')

      return {
        favoriteIcon: favoriteIcon[1],
        favoriteButton: favoriteButton[1],
      }
    }

    it('should init the article favourited', async () => {
      const { favoriteIcon } = await setupFavouritedArticle()

      expect(favoriteIcon.getAttribute('fill')).toBe('red')
    })

    it('should not render add to favourite toast when article is already added', async () => {
      const { favoriteIcon, favoriteButton } = await setupFavouritedArticle()

      fireEvent.click(favoriteButton)

      expect(favoriteIcon.getAttribute('fill')).toBe('red')

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
        expect(screen.getByTestId(`custom-card-${props.id}`)).toBeTruthy()
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

      const articlesLinks = screen.getAllByRole('link', { name: /artigos/i })
      const articlesLink = articlesLinks.find((l) =>
        l.getAttribute('href')?.includes('limit='),
      ) as HTMLAnchorElement

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
