import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { DashboardPage } from '../pages'

import { render } from './test-utils'

import type { DeleteArticleSpy } from './mock-delete-article-by-id'
import type { ListArticlesSpy } from './mock-list-articles'

export const renderDashboardPageWithRouter = (
  listArticlesSpy: ListArticlesSpy,
  deleteArticleSpy: DeleteArticleSpy,
) => {
  const DashboardMemoryRouter = () => (
    <MemoryRouter initialEntries={['/dashboard?page=1&limit=10']}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              listArticles={listArticlesSpy}
              deleteArticle={deleteArticleSpy}
            />
          }
        />
        <Route
          path="/article/edit/:id"
          element={
            <div data-testid="edit-article-page-mock">Edit Article Page</div>
          }
        />
      </Routes>
    </MemoryRouter>
  )

  const { rerender } = render(<DashboardMemoryRouter />)

  return {
    rerender: () => rerender(<DashboardMemoryRouter />),
  }
}
