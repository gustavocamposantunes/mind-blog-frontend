import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  DeleteArticleSpy,
  ListArticlesSpy,
  renderDashboardPageWithRouter,
} from '../test'
import { cleanup, fireEvent, screen, waitFor, within } from '../test/test-utils'

import {
  mockArticle,
  mockArticlesList,
  mockAuthenticateUserModel,
} from '@/domain/test'

const mockNavigate = vi.fn()
let searchParams = new URLSearchParams('page=1&limit=10')
const setSearchParamsMock = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
  useSearchParams: () => [searchParams, setSearchParamsMock],
}))

vi.mock('../store/auth-store', async () => ({
  useAuthStore: () => mockAuthenticateUserModel(),
}))

vi.mock('react-responsive', async () => ({
  useMediaQuery: vi.fn(),
}))

const useMediaQueryMock = vi.mocked(
  await import('react-responsive').then((mod) => mod.useMediaQuery),
)

describe('DashboardPage', () => {
  beforeEach(() => {
    cleanup()
    mockNavigate.mockClear()
    setSearchParamsMock.mockClear()
    searchParams = new URLSearchParams('page=1&limit=10')
    useMediaQueryMock.mockReturnValue(false)
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

  it('closes the delete modal when cancel is clicked', async () => {
    const listArticlesSpy = new ListArticlesSpy()
    renderDashboardPageWithRouter(listArticlesSpy, new DeleteArticleSpy())

    const article = listArticlesSpy.articlesList.articles[1]
    fireEvent.click(await screen.findByTestId(`delete-btn-${article.id}`))

    const dialog = await screen.findByRole('dialog')
    fireEvent.click(within(dialog).getByRole('button', { name: /cancelar/i }))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('navigates to the edit page when the edit action is clicked', async () => {
    const listArticlesSpy = new ListArticlesSpy()
    renderDashboardPageWithRouter(listArticlesSpy, new DeleteArticleSpy())

    const article = listArticlesSpy.articlesList.articles[1]
    const editBtn = await screen.findByTestId(`edit-btn-${article.id}`)

    fireEvent.click(editBtn)

    expect(mockNavigate).toHaveBeenCalledWith(`/article/edit/${article.id}`)
  })

  it('navigates to the article details when a dashboard card is clicked', async () => {
    const listArticlesSpy = new ListArticlesSpy()
    renderDashboardPageWithRouter(listArticlesSpy, new DeleteArticleSpy())

    const article = listArticlesSpy.articlesList.articles[1]
    const card = await screen.findByTestId(`custom-card-${article.id}`)

    fireEvent.click(card)

    expect(mockNavigate).toHaveBeenCalledWith(`/articles/${article.id}`)
  })

  it('renders owned articles in list view', async () => {
    searchParams = new URLSearchParams('page=1&limit=10&view=list')
    const listArticlesSpy = new ListArticlesSpy()
    renderDashboardPageWithRouter(listArticlesSpy, new DeleteArticleSpy())

    const article = listArticlesSpy.articlesList.articles[1]

    expect(
      await screen.findByTestId(`article-list-card-${article.id}`),
    ).toBeInTheDocument()
  })

  it('updates filters when changing dashboard view', async () => {
    const listArticlesSpy = new ListArticlesSpy()
    renderDashboardPageWithRouter(listArticlesSpy, new DeleteArticleSpy())

    fireEvent.click(await screen.findByRole('button', { name: /lista/i }))

    await waitFor(() => {
      expect(setSearchParamsMock).toHaveBeenCalled()
    })
    const updatedParams =
      setSearchParamsMock.mock.calls[
        setSearchParamsMock.mock.calls.length - 1
      ][0]

    expect(updatedParams.get('view')).toBe('list')
    expect(updatedParams.get('page')).toBe('1')
  })

  it('updates filters when changing dashboard page', async () => {
    useMediaQueryMock.mockReturnValue(true)
    const articleList = mockArticlesList()
    articleList.articles = Array.from({ length: 7 }, () => ({
      ...mockArticle(),
      author: {
        ...mockArticle().author,
        id: mockAuthenticateUserModel().user.id,
      },
    }))
    articleList.total = articleList.articles.length

    renderDashboardPageWithRouter(
      new ListArticlesSpy(articleList),
      new DeleteArticleSpy(),
    )

    fireEvent.click(await screen.findByTestId('page-2'))

    await waitFor(() => {
      expect(setSearchParamsMock).toHaveBeenCalled()
    })
    const updatedParams =
      setSearchParamsMock.mock.calls[
        setSearchParamsMock.mock.calls.length - 1
      ][0]

    expect(updatedParams.get('page')).toBe('2')
  })

  it('shows empty recent activity when the user has no articles', async () => {
    const emptyArticleList = mockArticlesList()
    emptyArticleList.articles = []
    emptyArticleList.total = 0

    renderDashboardPageWithRouter(
      new ListArticlesSpy(emptyArticleList),
      new DeleteArticleSpy(),
    )

    expect(
      await screen.findByText('Você ainda não publicou artigos.'),
    ).toBeInTheDocument()
  })
})
