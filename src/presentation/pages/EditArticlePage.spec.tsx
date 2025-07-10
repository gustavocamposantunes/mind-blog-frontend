import { describe, it, vi } from 'vitest'

import { GetArticleByIdSpy, renderEditArticlePage } from '../test'
import { screen } from '../test/test-utils'

import { NotFoundError } from '@/domain/errors'

type SutTypes = {
  getArticleByIdSpy: GetArticleByIdSpy
}

const makeSut = (getArticleByIdSpy = new GetArticleByIdSpy()): SutTypes => {
  renderEditArticlePage(getArticleByIdSpy)

  return {
    getArticleByIdSpy,
  }
}

describe('EditArticlePage', () => {
  it('should render an error if article is not found', async () => {
    const getArticleByIdSpy = new GetArticleByIdSpy()

    const error = new NotFoundError()
    vi.spyOn(getArticleByIdSpy, 'getById').mockRejectedValueOnce(error)

    makeSut(getArticleByIdSpy)

    await screen.findByText('Erro ao buscar artigo')
  })
})
