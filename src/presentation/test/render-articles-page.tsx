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

  render(<Stub initialEntries={['/articles']} />)
}
