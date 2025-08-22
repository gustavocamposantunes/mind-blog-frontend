import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { ArticlesPage } from '../pages'

import { render } from './test-utils'

import type { FavouriteArticleSpy } from './mock-favourite-article'
import type { ListArticlesSpy } from './mock-list-articles'

export const renderArticlesPageWithRouter = (
  listArticlesSpy: ListArticlesSpy,
  favouriteArticleSpy: FavouriteArticleSpy,
) => {
  const ArticlesMemoryRouter = () => (
    <MemoryRouter initialEntries={['/articles']}>
      <Routes>
        <Route
          path="/articles"
          element={
            <ArticlesPage
              listArticles={listArticlesSpy}
              favouriteArticle={favouriteArticleSpy}
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
  const { rerender } = render(<ArticlesMemoryRouter />)

  return {
    rerender: () => rerender(<ArticlesMemoryRouter />),
  }
}
