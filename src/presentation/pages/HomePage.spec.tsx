import { beforeEach } from 'node:test'

import { describe, expect, it, vi } from 'vitest'

import { GetNewsSpy, renderHomePageWithRouter } from '../test'

import { cleanup, screen } from '@/presentation/test/test-utils'

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
}))

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
