import { describe, expect, it, vi, beforeEach } from 'vitest'

import { GetNewsSpy, ListArticlesSpy, renderHomePageWithRouter } from '../test'

import { UnexpectedError } from '@/domain/errors'
import { mockMostFavouritedsArticlesList } from '@/domain/test'
import { cleanup, screen } from '@/presentation/test/test-utils'

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
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
  getNewsSpy: GetNewsSpy
  listArticlesSpy: ListArticlesSpy
}

const makeSut = (
  getNewsSpy = new GetNewsSpy(),
  listArticlesSpy = new ListArticlesSpy(mockMostFavouritedsArticlesList()),
): SutTypes => {
  renderHomePageWithRouter(getNewsSpy, listArticlesSpy)

  return {
    getNewsSpy,
    listArticlesSpy,
  }
}

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    cleanup()
  })
  describe('Header', () => {
    it.each([
      [1024, 5, 'mobile'],
      [1279, 10, 'large'],
      [0, 12, 'extra large'],
    ])(
      'should render /articles with page=1 and limit=%i when screen is %s',
      (mockWidth, expectedLimit) => {
        useMediaQueryMock.mockImplementation(({ maxWidth }) => {
          return maxWidth === mockWidth
        })

        makeSut()

        const articlesLink = screen.getByRole('link', {
          name: /artigos/i,
        })

        expect(articlesLink).toHaveAttribute(
          'href',
          `/articles?page=1&limit=${expectedLimit}`,
        )
      },
    )
  })

  describe('Featured Articles', () => {
    describe(`Favourites Slider`, () => {
      it('should render a slider skeleton before render the Favourites Slider', async () => {
        makeSut()

        const skeletonSlider = await screen.findByTestId('skeleton-slider')

        expect(skeletonSlider).toBeInTheDocument()
      })
    })
    describe('Most Favourited Articles', () => {
      it('should render a error message if most favouriteds articles fails', async () => {
        const listArticlesSpy = new ListArticlesSpy()

        const error = new UnexpectedError()
        vi.spyOn(listArticlesSpy, 'listAll').mockRejectedValueOnce(error)

        makeSut(undefined, listArticlesSpy)

        const errorMessage = await screen.findByTestId('error-message')

        expect(errorMessage).toBeInTheDocument()
        expect(errorMessage.textContent).toBe(error.message)
      })

      it('should render skeletons while the most favouriteds is loading', async () => {
        makeSut()

        const skeletons = await screen.findAllByTestId('skeleton-favourits')

        expect(skeletons.length).toBe(3)
      })

      it('should render the most favouriteds after load', async () => {
        const { listArticlesSpy } = makeSut()

        await screen.findByTestId(
          `card-article-${listArticlesSpy.articlesList.articles[0].id}`,
        )

        listArticlesSpy.articlesList.articles.map(({ id }) => {
          expect(screen.getByTestId(`card-article-${id}`)).toBeInTheDocument()
        })
      })
    })

    describe('News', () => {
      it('should render a skeleton while promise is pending', () => {
        makeSut()

        const skeletonNews = screen.getByTestId('skeleton-news')

        expect(skeletonNews).toBeTruthy()
      })

      it('should render a list of articles after load', async () => {
        makeSut()

        const listArticles = await screen.findByTestId('list-news')

        expect(listArticles).toBeTruthy()
        expect(listArticles.querySelectorAll('article').length).toBe(7)
      })
    })
  })
})
