import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { ArticlePage } from '../pages'

import { render } from './test-utils'

import type { FavouriteArticleSpy } from './mock-favourite-article'
import type { GetArticleByIdSpy } from './mock-get-article-by-id'
import type { UnfavouriteArticleSpy } from './mock-unfavourite-article'

export const renderArticlePageWithRouter = (
  getArticleByIdSpy: GetArticleByIdSpy,
  favouriteArticleSpy: FavouriteArticleSpy,
  unfavouriteArticleSpy: UnfavouriteArticleSpy,
) => {
  render(
    <MemoryRouter initialEntries={['/article/:id']}>
      <Routes>
        <Route
          path="/article/:id"
          element={
            <ArticlePage
              getArticletById={getArticleByIdSpy}
              favouriteArticle={favouriteArticleSpy}
              unfavouriteArticle={unfavouriteArticleSpy}
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
    </MemoryRouter>,
  )
}
