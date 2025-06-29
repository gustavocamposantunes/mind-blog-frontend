import { describe, expect, it, vi } from 'vitest'

import { renderForgotPasswordPageWithRouter } from '../test'
import { screen } from '../test/test-utils'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}))

const makeSut = () => {
  renderForgotPasswordPageWithRouter()
}

describe('ForgotPasswordPage', () => {
  it('should redirects to LoginPage when the link `Já tem cadastro?` is clicked', () => {
    makeSut()

    const redirectToLoginLink = screen.getByText(
      /já tem cadastro\? clique aqui/i,
    )

    expect(redirectToLoginLink.getAttribute('href')).toBeTruthy()
    expect(redirectToLoginLink.getAttribute('href')).toContain('/login')
  })
})
