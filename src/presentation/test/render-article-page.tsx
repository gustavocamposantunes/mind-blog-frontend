import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { ArticlePage } from '../pages'

import { render } from './test-utils'

import type { FavouriteArticleSpy } from './mock-favourite-article'
import type { GetArticleByIdSpy } from './mock-get-article-by-id'
import type {
  CommentArticleUseCase,
  ListCommentsByArticleIdUseCase,
} from '@/domain/usecases'

export const renderArticlePageWithRouter = (
  getArticleByIdSpy: GetArticleByIdSpy,
  favouriteArticleSpy: FavouriteArticleSpy,
  listCommentsByArticleIdSpy: ListCommentsByArticleIdUseCase,
  commentArticleSpy: CommentArticleUseCase,
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
              listCommentsByArticleId={listCommentsByArticleIdSpy}
              commentArticle={commentArticleSpy}
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
