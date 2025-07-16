import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { HomePage } from '../pages'

import { render } from './test-utils'

import type { GetNewsSpy } from './mock-get-news'

export const renderHomePageWithRouter = (getNewsSpy: GetNewsSpy) => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<HomePage getNews={getNewsSpy} />} />
        <Route path="/articles" element={<div>Articles Page</div>} />
      </Routes>
    </MemoryRouter>,
  )
}
