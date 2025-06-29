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
    {
      path: '/login',
      Component: () => <div>Login Page</div>,
    },
    {
      path: '/forgot-password',
      Component: () => <div>Forgot Password Page</div>,
    },
    {
      path: '/',
      Component: () => <div>Home Page</div>,
    },
  ])

  render(<Stub initialEntries={['/article/:id']} />)
}
