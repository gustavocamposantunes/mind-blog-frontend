import { createRoutesStub } from 'react-router-dom'

import { RegisterUserPage } from '../pages'

import { render } from './test-utils'

import type { RegisterUserSpy } from './mock-register-user'

export const renderRegisterUserPageWithRouter = (
  registerUserSpy: RegisterUserSpy,
) => {
  const RegisterUserPageComponent = () => (
    <RegisterUserPage registerUser={registerUserSpy} />
  )

  const Stub = createRoutesStub([
    {
      path: '/register-user',
      Component: RegisterUserPageComponent,
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

  render(<Stub initialEntries={['/register-user']} />)
}
