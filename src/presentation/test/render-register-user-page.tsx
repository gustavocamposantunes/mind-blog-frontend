import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { RegisterUserPage } from '../pages'

import { render } from './test-utils'

import type { RegisterUserSpy } from './mock-register-user'

export const renderRegisterUserPageWithRouter = (
  registerUserSpy: RegisterUserSpy,
) => {
  render(
    <MemoryRouter initialEntries={['/register-user']}>
      <Routes>
        <Route
          path="/register-user"
          element={<RegisterUserPage registerUser={registerUserSpy} />}
        />
        <Route
          path="/login"
          element={<div data-testid="login-page-mock">Login Page</div>}
        />
      </Routes>
    </MemoryRouter>,
  )
}
