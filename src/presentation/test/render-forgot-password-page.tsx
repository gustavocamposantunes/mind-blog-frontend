import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { ForgotPasswordPage } from '../pages'

import { render } from './test-utils'

export const renderForgotPasswordPageWithRouter = () => {
  render(
    <MemoryRouter initialEntries={['/forgot-password']}>
      <Routes>
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/login"
          element={<div data-testid="login-page-mock">Login Page</div>}
        />
      </Routes>
    </MemoryRouter>,
  )
}
