import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ListArticlesSpy, renderArticlesPageWithRouter } from '../test'
import { cleanup, screen } from '../test/test-utils'
import { formatDateToShortMonth } from '../utils/dateFormatter'
import { faker } from '@faker-js/faker'
import { mockAuthenticateUserModel } from '@/domain/test'

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
}))

vi.mock('../store/auth-store', async () => ({
  useAuthStore: () => mockAuthenticateUserModel()
}))

type SutTypes = {
  listArticlesListSpy: ListArticlesSpy
}

const makeSut = (): SutTypes => {
  const listArticlesListSpy = new ListArticlesSpy()

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
    const firstArticleDate = await screen.findByTestId('published-at')
    const firstArticleImage = (await screen.findByAltText(
      listArticlesListSpy.articlesList.articles[0].title,
    )) as HTMLImageElement

    expect(firstArticleTitle).toBeTruthy()
    expect(firstArticleContent).toBeTruthy()
    expect(firstArticleDate.textContent).toEqual(
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
})
