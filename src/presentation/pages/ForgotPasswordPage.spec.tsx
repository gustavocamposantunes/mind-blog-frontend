import { describe, expect, it, vi } from 'vitest'

import { renderForgotPasswordPageWithRouter } from '../test'
import { fireEvent, screen, waitFor } from '../test/test-utils'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}))

const makeSut = () => {
  renderForgotPasswordPageWithRouter()
}

describe('ForgotPasswordPage', () => {
  it('should redirects to LoginPage when the link `Já tem cadastro?` is clicked', async () => {
    makeSut()

    const redirectToLoginLink = screen.getByRole('link', {
      name: /já tem cadastro\? clique aqui/i,
    })

    expect(redirectToLoginLink.getAttribute('href')).toBeTruthy()
    expect(redirectToLoginLink.getAttribute('href')).toContain('/login')

    fireEvent.click(redirectToLoginLink)

    await waitFor(() => {
      expect(screen.getByTestId('login-page-mock')).toBeTruthy()
    })
  })
})
