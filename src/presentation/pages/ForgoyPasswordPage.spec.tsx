import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '../test/test-utils'

import { ForgotPasswordPage } from './ForgotPasswordPage'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}))

const makeSut = () => {
  render(<ForgotPasswordPage />)
}

describe('ForgotPasswordPage', () => {
  it('should redirects to LoginPage when the link `Já tem cadastro?` is clicked', () => {
    makeSut()

    const redirectToLoginLink = screen.getByText(
      /já tem cadastro\? clique aqui/i,
    )

    fireEvent.click(redirectToLoginLink)

    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })
})
