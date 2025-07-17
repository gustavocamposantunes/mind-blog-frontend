import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { HomePage } from '../pages'

import { render } from './test-utils'

import type { GetNewsSpy } from './mock-get-news'
import type { ListArticlesSpy } from './mock-list-articles'

export const renderHomePageWithRouter = (
  getNewsSpy: GetNewsSpy,
  listArticlesSpy: ListArticlesSpy,
) => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage getNews={getNewsSpy} listArticles={listArticlesSpy} />
          }
        />
        <Route path="/articles" element={<div>Articles Page</div>} />
      </Routes>
    </MemoryRouter>,
  )
}
