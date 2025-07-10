import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { EditArticlePage } from '../pages/EditArticlePage'

import { render } from './test-utils'

import type { GetArticleByIdSpy } from './mock-get-article-by-id'

export const renderEditArticlePage = (getArticleByIdSpy: GetArticleByIdSpy) => {
  render(
    <MemoryRouter initialEntries={['/article/edit/:id']}>
      <Routes>
        <Route
          path="/article/edit/:id"
          element={<EditArticlePage getArticletById={getArticleByIdSpy} />}
        />
        <Route
          path="/"
          element={<div data-testid="home-page-mock">Home Page</div>}
        />
      </Routes>
    </MemoryRouter>,
  )
}
