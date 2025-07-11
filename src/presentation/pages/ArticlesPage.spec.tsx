import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ListArticlesSpy, renderArticlesPageWithRouter } from '../test'
import { cleanup, fireEvent, screen } from '../test/test-utils'
import { formatDateToShortMonth } from '../utils/dateFormatter'

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
}

const makeSut = (listArticlesListSpy = new ListArticlesSpy()): SutTypes => {
  renderArticlesPageWithRouter(listArticlesListSpy)

  return {
    listArticlesListSpy,
  }
}

describe('ArticlesPage', () => {
  beforeEach(cleanup)
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

  it('should render a favorite heart icon on article', async () => {
    makeSut()

    const favoriteHeartIcon = await screen.findByTestId('favorite-heart-icon')

    expect(favoriteHeartIcon).toBeTruthy()
  })

  it('should change favorite heart icon color on click', async () => {
    makeSut()

    const favoriteHeartIcon = await screen.findByTestId('favorite-heart-icon')

    expect(favoriteHeartIcon.getAttribute('fill')).toBe('white')

    fireEvent.click(favoriteHeartIcon)

    expect(favoriteHeartIcon.getAttribute('fill')).toBe('red')
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
