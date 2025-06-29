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
    const nameInput = screen.getByLabelText(/nome/i)
    const emailInput = screen.getByLabelText(/email/i)
    const password = screen.getByPlaceholderText(/digite sua senha/i)
    const passwordConfirmation =
      screen.getByPlaceholderText(/confirme sua senha/i)

    const fakePassowrd = faker.internet.password()
    fireEvent.change(nameInput, { target: { value: faker.person.firstName() } })
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

  it('should redirect to HomePage when submit successfull', async () => {
    makeSut()

    setupSubmit()

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it("Should redirect to LoginPage when click on 'Já tem cadastro?'", () => {
    makeSut()

    const loginLink = screen.getByText(/já tem cadastro\? clique aqui/i)

    expect(loginLink.getAttribute('href')).toBeTruthy()
    expect(loginLink.getAttribute('href')).toContain('/login')
  })
})
