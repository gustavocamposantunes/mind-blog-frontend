import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { ArticlesPage } from '../pages'

import { render } from './test-utils'

import type { FavouriteArticleSpy } from './mock-favourite-article'
import type { ListArticlesSpy } from './mock-list-articles'
import type { UnfavouriteArticleSpy } from './mock-unfavourite-article'

export const renderArticlesPageWithRouter = (
  listArticlesSpy: ListArticlesSpy,
  favouriteArticleSpy: FavouriteArticleSpy,
  unfavouriteArticleSpy: UnfavouriteArticleSpy,
) => {
  render(
    <MemoryRouter initialEntries={['/articles']}>
      <Routes>
        <Route
          path="/articles"
          element={
            <ArticlesPage
              listArticles={listArticlesSpy}
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
