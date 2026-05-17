import { describe, expect, it, vi, beforeEach } from 'vitest'
import { toast } from 'react-toastify'

import { ListArticlesSpy, renderHomePageWithRouter } from '../test'

import { UnexpectedError } from '@/domain/errors'
import { InternalServerError } from '@/domain/errors'
import { mockArticlesList } from '@/domain/test'
import { cleanup, screen } from '@/presentation/test/test-utils'


const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
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
  listArticlesSpy: ListArticlesSpy
}

const makeSut = (
  listArticlesSpy = new ListArticlesSpy(mockArticlesList()),
): SutTypes => {
  renderHomePageWithRouter(listArticlesSpy)

  return {
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

        const articlesLinks = screen.getAllByRole('link', { name: /artigos/i })
        const articlesLink = articlesLinks.find((l) =>
          l.getAttribute('href')?.includes('limit='),
        ) as HTMLAnchorElement

        expect(articlesLink).toHaveAttribute(
          'href',
          `/articles?page=1&limit=${expectedLimit}`,
        )
      },
    )
  })

  describe('Featured Articles', () => {
    const setupListArticlesError = () => {
      const listArticlesSpy = new ListArticlesSpy()

      const error = new UnexpectedError()
      vi.spyOn(listArticlesSpy, 'listAll').mockRejectedValue(error)

      makeSut(listArticlesSpy)

      return {
        error,
      }
    }

    it('should render a error message if featured articles fail', async () => {
      const { error } = setupListArticlesError()

      const skeletons = await screen.findAllByTestId('skeleton-favourits')

      expect(skeletons.length).toBe(3)
      expect(screen.queryByTestId('error-message')).toBeNull()
      expect(error.message).toBe('Erro inesperado')
    })

    it('should show a toast when featured error is internal server error', async () => {
      const listArticlesSpy = new ListArticlesSpy()

      const toastErrorSpy = vi.spyOn(toast, 'error').mockImplementation(() => {
        return undefined
      })

      vi.spyOn(listArticlesSpy, 'listAll').mockRejectedValue(
        new InternalServerError(),
      )

      makeSut(listArticlesSpy)

      await screen.findAllByTestId('skeleton-favourits')

      expect(toastErrorSpy).toHaveBeenCalledWith('Erro interno do servidor')
    })

    it('should render skeletons while featured articles are loading', async () => {
      makeSut()

      const skeletons = await screen.findAllByTestId('skeleton-favourits')

      expect(skeletons.length).toBe(3)
    })

    it('should render featured cards after load', async () => {
      const { listArticlesSpy } = makeSut()

      await screen.findAllByTestId(
        `custom-card-${listArticlesSpy.articlesList.articles[0].id}`,
      )
    })
  })

  describe('Recent Articles', () => {
    it('should render a slider skeleton while recent articles are loading', () => {
      makeSut()

      const skeletonRecent = screen.getByTestId('skeleton-recent')

      expect(skeletonRecent).toBeTruthy()
    })

    it('should render the recent articles swiper after load', async () => {
      makeSut()

      const recentSwiper = await screen.findByTestId('recent-articles-swiper')

      expect(recentSwiper).toBeInTheDocument()
    })

    it('should render the fallback block when an article has no image', async () => {
      const articlesList = mockArticlesList()
      articlesList.articles[0].image = ''

      makeSut(new ListArticlesSpy(articlesList))

      const recentSwiper = await screen.findByTestId('recent-articles-swiper')

      expect(recentSwiper).toBeInTheDocument()
    })

    it('should navigate to the article page when a featured card is clicked', async () => {
      const { listArticlesSpy } = makeSut()

      const articleId = listArticlesSpy.articlesList.articles[0].id
      const featuredCard = await screen.findByTestId(`custom-card-${articleId}`)

      featuredCard.click()

      expect(mockNavigate).toHaveBeenCalledWith(`/articles/${articleId}`)
    })
  })
})
