import { createRoutesStub } from 'react-router-dom'

import { ForgotPasswordPage } from '../pages'

import { render } from './test-utils'

export const renderForgotPasswordPageWithRouter = () => {
  const ForgotPasswordPageComponent = () => <ForgotPasswordPage />

  const Stub = createRoutesStub([
    {
      path: '/forgot-password',
      Component: ForgotPasswordPageComponent,
    },
    {
      path: '/login',
      Component: () => <div data-testid="login-page-mock">Login Page</div>,
    },
  ])

  render(<Stub initialEntries={['/forgot-password']} />)
}
