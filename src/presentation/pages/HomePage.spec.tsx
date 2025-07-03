import { describe, expect, it, vi } from 'vitest'

import { GetNewsSpy, renderHomePageWithRouter } from '../test'

import { screen } from '@/presentation/test/test-utils'

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
}))

type SutTypes = {
  getNewsSpy: GetNewsSpy
}

const makeSut = (timeout = 0): SutTypes => {
  const getNewsSpy = new GetNewsSpy(timeout)
  renderHomePageWithRouter(getNewsSpy)

  return {
    getNewsSpy,
  }
}

describe('HomePage', () => {
  it('should render a skeleton while promise is pending', () => {
    const timeout = 2000
    makeSut(timeout)

    const skeletonNews = screen.getByTestId('skeleton-news')

    expect(skeletonNews).toBeTruthy()
  })

  it('should render a list of articles after load', () => {
    makeSut()

    const listArticles = screen.getByTestId('list-news')
    const newArticleList = screen.getAllByTestId('new-article')

    expect(listArticles).toBeTruthy()
    expect(newArticleList.length).toBe(7)
  })
})
