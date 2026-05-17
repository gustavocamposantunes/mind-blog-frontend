import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  DeleteArticleSpy,
  ListArticlesSpy,
  renderDashboardPageWithRouter,
} from '../test'
import { cleanup, fireEvent, screen, waitFor, within } from '../test/test-utils'

import { mockAuthenticateUserModel } from '@/domain/test'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
  useSearchParams: () => [new URLSearchParams('page=1&limit=10'), vi.fn()],
}))

vi.mock('../store/auth-store', async () => ({
  useAuthStore: () => mockAuthenticateUserModel(),
}))

vi.mock('react-responsive', async () => ({
  useMediaQuery: vi.fn(() => false),
}))

describe('DashboardPage', () => {
  beforeEach(() => {
    cleanup()
    mockNavigate.mockClear()
  })

  it('filters articles by the logged user and renders only owned articles', async () => {
    const listArticlesSpy = new ListArticlesSpy()
    renderDashboardPageWithRouter(listArticlesSpy, new DeleteArticleSpy())

    const ownedArticle = listArticlesSpy.articlesList.articles[1]
    const visibleCard = await screen.findByTestId(
      `custom-card-${ownedArticle.id}`,
    )

    expect(listArticlesSpy.userId).toBe(5)
    expect(visibleCard).toBeInTheDocument()
    expect(
      screen.queryByTestId(
        `custom-card-${listArticlesSpy.articlesList.articles[0].id}`,
      ),
    ).toBeNull()
    expect(screen.getByText('Meus Artigos')).toBeInTheDocument()
  })

  it('opens the delete modal and confirms article deletion', async () => {
    const listArticlesSpy = new ListArticlesSpy()
    renderDashboardPageWithRouter(listArticlesSpy, new DeleteArticleSpy())

    const article = listArticlesSpy.articlesList.articles[1]
    const deleteBtn = await screen.findByTestId(`delete-btn-${article.id}`)

    fireEvent.click(deleteBtn)

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(
      screen.getByText(/tem certeza que deseja excluir/i),
    ).toBeInTheDocument()

    fireEvent.click(within(dialog).getByRole('button', { name: /excluir/i }))

    await waitFor(() => {
      expect(
        screen.getByText('Artigo deletado com sucesso'),
      ).toBeInTheDocument()
    })
  })
})
