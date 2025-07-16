import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  FavouriteArticleSpy,
  ListArticlesSpy,
  renderArticlesPageWithRouter,
  UnfavouriteArticleSpy,
} from '../test'
import { cleanup, fireEvent, screen } from '../test/test-utils'
import { formatDateToShortMonth } from '../utils/dateFormatter'

import { UnexpectedError } from '@/domain/errors'
import { mockArticlesList, mockAuthenticateUserModel } from '@/domain/test'

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
}))

vi.mock('../store/auth-store', async () => ({
  useAuthStore: () => mockAuthenticateUserModel(),
}))

type SutTypes = {
  listArticlesListSpy: ListArticlesSpy
  favouriteArticleSpy: FavouriteArticleSpy
}

const makeSut = (
  listArticlesListSpy = new ListArticlesSpy(),
  favouriteArticleSpy = new FavouriteArticleSpy(),
  unfavouriteArticleSpy = new UnfavouriteArticleSpy(),
): SutTypes => {
  renderArticlesPageWithRouter(
    listArticlesListSpy,
    favouriteArticleSpy,
    unfavouriteArticleSpy,
  )

  return {
    listArticlesListSpy,
    favouriteArticleSpy,
  }
}

describe('ArticlesPage', () => {
  beforeEach(() => {
    cleanup()
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

  describe('Unfavourite', () => {
    const setupUnfavouriteError = async () => {
      const unfavouriteArticleSpy = new UnfavouriteArticleSpy()
      const mockedError = new UnexpectedError()
      vi.spyOn(unfavouriteArticleSpy, 'unfavourite').mockRejectedValueOnce(
        mockedError,
      )
      makeSut(undefined, undefined, unfavouriteArticleSpy)

      const favoriteHeartIcons = await screen.findAllByTestId(
        'favorite-heart-icon',
      )

      const favoriteHeartIcon = favoriteHeartIcons[1]
      fireEvent.click(favoriteHeartIcon)

      return {
        mockedError,
        favoriteHeartIcon,
      }
    }
    it('should render a toast.error when heart icon is clicked and returns an error from api', async () => {
      const { mockedError } = await setupUnfavouriteError()

      const error = await screen.findByText(mockedError.message)

      expect(error).toBeTruthy()
    })

    it('should mantain the heart icon fill red if an error occur', async () => {
      const { mockedError, favoriteHeartIcon } = await setupUnfavouriteError()

      await screen.findByText(mockedError.message)

      expect(favoriteHeartIcon.getAttribute('fill')).toBe('red')
    })

    it('should change favorite heart icon color on success', async () => {
      makeSut()

      const favoriteHeartIcons = await screen.findAllByTestId(
        'favorite-heart-icon',
      )

      const favoriteHeartIcon = favoriteHeartIcons[1]

      expect(favoriteHeartIcon.getAttribute('fill')).toBe('red')

      fireEvent.click(favoriteHeartIcon)

      await screen.findByText('Artigo removido dos favoritos')

      expect(favoriteHeartIcon.getAttribute('fill')).toBe('white')
    })
  })

  describe('Pagination', () => {
    it('should render the pagination correctly after data is loaded', async () => {
      makeSut()

      const pagination = await screen.findByTestId('pagination')
      expect(pagination).toBeTruthy()
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
      makeSut()

      await setupChangeToSecondPage()

      const secondPage = await screen.findByTestId('page-2')
      expect(secondPage).toHaveAttribute('data-active', 'true')
    })

    it('should reload when current page is changed', async () => {
      makeSut()

      await setupChangeToSecondPage()

      await setupAssertSkeletons()
    })

    it('should not render PreviousPage toggle if first page is the current', async () => {
      makeSut()

      await screen.findByTestId('page-1')

      const previousPageToggle = screen.queryByTestId('previous-page-toogle')
      expect(previousPageToggle).toBeFalsy()
    })

    it('should not render the NextPage toggle if the current page is the latest', async () => {
      makeSut()

      await setupChangeToSecondPage()

      const secondPage = await screen.findByTestId('page-2')
      expect(secondPage).toHaveAttribute('data-active', 'true')

      const nextPageToggle = screen.queryByTestId('next-page-toogle')
      expect(nextPageToggle).toBeFalsy()
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
  })
})
