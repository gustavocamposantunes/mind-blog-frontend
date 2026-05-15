import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { RegisterUserSpy, renderRegisterUserPageWithRouter } from '../test'
import { cleanup, fireEvent, screen, waitFor } from '../test/test-utils'

import { UnexpectedError } from '@/domain/errors'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}))

type SutTypes = {
  registerUserSpy: RegisterUserSpy
}

const makeSut = (): SutTypes => {
  const registerUserSpy = new RegisterUserSpy()

  renderRegisterUserPageWithRouter(registerUserSpy)

  return {
    registerUserSpy,
  }
}

describe('RegisterUserPage', () => {
  beforeEach(cleanup)

  const setupSubmit = (missMatchPassowrd?: string) => {
    const firstName = screen.getByPlaceholderText(/digite seu nome/i)
    const lastName = screen.getByPlaceholderText(/digite seu sobrenome/i)
    const emailInput = screen.getByPlaceholderText(/digite seu email/i)
    const password = screen.getByPlaceholderText(/digite sua senha/i)
    const passwordConfirmation =
      screen.getByPlaceholderText(/confirme sua senha/i)

    const fakePassowrd = faker.internet.password()
    fireEvent.change(firstName, { target: { value: faker.person.firstName() } })
    fireEvent.change(lastName, { target: { value: faker.person.lastName() } })
    fireEvent.change(emailInput, { target: { value: faker.internet.email() } })
    fireEvent.change(password, {
      target: { value: missMatchPassowrd ?? fakePassowrd },
    })
    fireEvent.change(passwordConfirmation, { target: { value: fakePassowrd } })

    const submitButton = screen.getByRole('button', {
      name: /criar conta/i,
    })

    fireEvent.click(submitButton)
  }

  const typeStrongPassword = () => {
    const password = screen.getByPlaceholderText(/digite sua senha/i)

    fireEvent.change(password, {
      target: { value: 'SenhaForte#2026' },
    })
  }

  it('should render a toast.error when submit fails', async () => {
    const registerUserSpy = new RegisterUserSpy()

    const error = new UnexpectedError()
    vi.spyOn(registerUserSpy, 'register').mockRejectedValueOnce(error)

    renderRegisterUserPageWithRouter(registerUserSpy)

    setupSubmit()

    const errorToastMessage = await screen.findByText(error.message)

    expect(errorToastMessage).toBeTruthy()
  })

  it('should render an error assistive text when password missmatch', async () => {
    makeSut()

    const wrongPassword = faker.internet.password()

    setupSubmit(wrongPassword)

    const errorAssistiveText = await screen.findByText(
      /as senhas não coincidem/i,
    )

    expect(errorAssistiveText).toBeTruthy()
  })

  it('should render password strength feedback when typing a password', async () => {
    makeSut()

    typeStrongPassword()

    const passwordStrength = await screen.findByText(/força da senha/i)
    const strongLabel = await screen.findByText(/muito forte/i)

    expect(passwordStrength).toBeTruthy()
    expect(strongLabel).toBeTruthy()
  })

  it('should redirect to HomePage when submit successfull', async () => {
    makeSut()

    setupSubmit()

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it("Should redirect to LoginPage when click on 'Já tem cadastro?'", async () => {
    makeSut()

    const loginLink = screen.getByRole('link', {
      name: /já tem cadastro\? clique aqui/i,
    })

    expect(loginLink.getAttribute('href')).toBeTruthy()
    expect(loginLink.getAttribute('href')).toContain('/login')

    fireEvent.click(loginLink)

    await waitFor(() => {
      expect(screen.getByTestId('login-page-mock')).toBeTruthy()
    })
  })
})
