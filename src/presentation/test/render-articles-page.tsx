import { createRoutesStub } from 'react-router-dom'

import { ArticlesPage } from '../pages'

import { render } from './test-utils'

import type { ListArticlesSpy } from './mock-list-articles'

export const renderArticlesPageWithRouter = (
  listArticlesSpy: ListArticlesSpy,
) => {
  const ArticlesPageComponent = () => (
    <ArticlesPage listArticles={listArticlesSpy} />
  )

  const Stub = createRoutesStub([
    {
      path: '/articles',
      Component: ArticlesPageComponent,
    },
  ])

  render(<Stub initialEntries={['/articles']} />)
}
