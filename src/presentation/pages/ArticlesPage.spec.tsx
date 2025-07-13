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
import { mockAuthenticateUserModel } from '@/domain/test'

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
  beforeEach(cleanup)

  describe('List', () => {
    it('should render skeletons while is loading', async () => {
      makeSut()

      const skeletons = await screen.findAllByTestId('custom-skeleton')

      expect(skeletons).toBeTruthy()
      expect(skeletons.length).toBe(6)
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
  })
})
