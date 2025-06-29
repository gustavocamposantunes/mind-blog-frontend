import { createRoutesStub } from 'react-router-dom'

import { ArticlePage } from '../pages'

import { render } from './test-utils'

import type { GetArticleByIdSpy } from './mock-get-article-by-id'

export const renderArticlePageWithRouter = (
  getArticleByIdSpy: GetArticleByIdSpy,
) => {
  const ArticlePageComponent = () => (
    <ArticlePage getArticletById={getArticleByIdSpy} />
  )

  const Stub = createRoutesStub([
    {
      path: '/article/:id',
      Component: ArticlePageComponent,
    },
  ])

  render(<Stub initialEntries={['/article/:id']} />)
}
