import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { HomePage } from '../pages'

import { render } from './test-utils'

import type { ListArticlesSpy } from './mock-list-articles'

export const renderHomePageWithRouter = (listArticlesSpy: ListArticlesSpy) => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<HomePage listArticles={listArticlesSpy} />} />
        <Route path="/articles" element={<div>Articles Page</div>} />
      </Routes>
    </MemoryRouter>,
  )
}
