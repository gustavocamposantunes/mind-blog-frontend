import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { render } from './test-utils'

import type { AuthenticateUserSpy } from '../test'

import { LoginPage } from '@/presentation/pages/LoginPage'

export const renderLoginPageWithRouter = (
  authenticateUserSpy: AuthenticateUserSpy,
) => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage authenticateUser={authenticateUserSpy} />}
        />
        <Route
          path="/register"
          element={<div>Register Page</div>}
        />
        <Route
          path="/forgot-password"
          element={<div>Forgot Password Page</div>}
        />
      </Routes>
    </MemoryRouter>
  )
}
