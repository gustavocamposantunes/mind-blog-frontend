import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { EditArticlePage } from '../pages/EditArticlePage'

import { render } from './test-utils'

import type { GetArticleByIdSpy } from './mock-get-article-by-id'
import type { UpdateArticleSpy } from './mock-update-article'

export const renderEditArticlePage = (
  getArticleByIdSpy: GetArticleByIdSpy,
  updateArticleSpy: UpdateArticleSpy,
) => {
  render(
    <MemoryRouter initialEntries={['/article/edit/:id']}>
      <Routes>
        <Route
          path="/article/edit/:id"
          element={
            <EditArticlePage
              getArticletById={getArticleByIdSpy}
              updateArticle={updateArticleSpy}
            />
          }
        />
        <Route
          path="/"
          element={<div data-testid="home-page-mock">Home Page</div>}
        />
      </Routes>
    </MemoryRouter>,
  )
}
