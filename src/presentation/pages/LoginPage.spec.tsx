import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AuthenticateUserSpy, renderLoginPageWithRouter } from '../test'
import { cleanup, fireEvent, screen, waitFor } from '../test/test-utils'

import { UnexpectedError } from '@/domain/errors'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}))

type SutTypes = {
  authenticateUserSpy: AuthenticateUserSpy
}

const makeSut = (): SutTypes => {
  const authenticateUserSpy = new AuthenticateUserSpy()

  renderLoginPageWithRouter(authenticateUserSpy)

  return {
    authenticateUserSpy,
  }
}

describe('LoginPage', () => {
  beforeEach(cleanup)
  const setupSubmit = () => {
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/senha/i)

    const submitButton = screen.getByRole('button', { name: /entrar/i })

    fireEvent.change(emailInput, { target: { value: faker.internet.email() } })
    fireEvent.change(passwordInput, {
      target: { value: faker.internet.password() },
    })

    fireEvent.click(submitButton)
  }

  it('should render a tooltip.error with a message if the authentication fails', async () => {
    const authenticateUserSpy = new AuthenticateUserSpy()

    const error = new UnexpectedError()
    vi.spyOn(authenticateUserSpy, 'auth').mockRejectedValueOnce(error)

    renderLoginPageWithRouter(authenticateUserSpy)

    setupSubmit()

    await screen.findByText(error.message)
  })

  it('should redirect to HomePage on authentication success', async () => {
    makeSut()
    setupSubmit()

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('should redirect to ForgotPasswordPage when forgot password link is clicked', () => {
    makeSut()

    const forgotPasswordLink = screen.getByRole('link', {
      name: /esqueceu a senha\?/i,
    })

    fireEvent.click(forgotPasswordLink)

    expect(forgotPasswordLink.getAttribute('href')).toBeTruthy()
    expect(forgotPasswordLink.getAttribute('href')).toContain(
      '/forgot-password',
    )
  })

  it('should redirect to RegisterUserPage when register user link is clicked', () => {
    makeSut()

    const registerUserLink = screen.getByRole('link', {
      name: /não tem uma conta\? criar conta/i,
    })

    fireEvent.click(registerUserLink)

    expect(registerUserLink.getAttribute('href')).toBeTruthy()
    expect(registerUserLink.getAttribute('href')).toContain('/register')
  })
})
