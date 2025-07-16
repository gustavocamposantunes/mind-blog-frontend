import { describe, expect, it, vi, beforeEach } from 'vitest'

import { GetNewsSpy, renderHomePageWithRouter } from '../test'

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
}

const makeSut = (): SutTypes => {
  const getNewsSpy = new GetNewsSpy()
  renderHomePageWithRouter(getNewsSpy)

  return {
    getNewsSpy,
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
