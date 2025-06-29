import { createRoutesStub } from 'react-router-dom'

import { NewArticlePage } from '../pages'

import { render } from './test-utils'

import type { RegisterArticleSpy } from './mock-register-article'

export const renderNewArticlePageWithRouter = (
  registerArticleSpy: RegisterArticleSpy,
) => {
  const NewArticlePageComponent = () => (
    <NewArticlePage registerArticle={registerArticleSpy} />
  )

  const Stub = createRoutesStub([
    {
      path: '/new-article',
      Component: NewArticlePageComponent,
    },
    {
      path: '/register',
      Component: () => <div>Register Page</div>,
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

  render(<Stub initialEntries={['/new-article']} />)
}
