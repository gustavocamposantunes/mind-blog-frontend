import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { ArticlesPage } from '../pages'

import { render } from './test-utils'

import type { ListArticlesSpy } from './mock-list-articles'

export const renderArticlesPageWithRouter = (
  listArticlesSpy: ListArticlesSpy,
) => {
  render(
    <MemoryRouter initialEntries={['/articles']}>
      <Routes>
        <Route
          path="/articles"
          element={<ArticlesPage listArticles={listArticlesSpy} />}
        />
        <Route
          path="/article/edit/:id"
          element={
            <div data-testid="edit-article-page-mock">Edit Article Page</div>
          }
        />
      </Routes>
    </MemoryRouter>,
  )
}
