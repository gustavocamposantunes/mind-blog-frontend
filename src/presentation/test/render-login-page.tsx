import { createRoutesStub } from 'react-router-dom'

import { render } from './test-utils'

import type { AuthenticateUserSpy } from '../test'

import { LoginPage } from '@/presentation/pages/LoginPage'

export const renderLoginPageWithRouter = (
  authenticateUserSpy: AuthenticateUserSpy,
) => {
  const LoginPageComponent = () => (
    <LoginPage authenticateUser={authenticateUserSpy} />
  )

  const Stub = createRoutesStub([
    {
      path: '/login',
      Component: LoginPageComponent,
    },
    {
      path: '/register',
      Component: () => <div>Register Page</div>,
    },
    {
      path: '/forgot-password',
      Component: () => <div>Forgot Password Page</div>,
    },
  ])

  render(<Stub initialEntries={['/login']} />)
}
