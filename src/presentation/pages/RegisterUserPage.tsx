import { UserPlus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AuthForm } from '../components/atoms/AuthForm'
import { PasswordStrength } from '../components/molecules/PasswordStrength'
import { TextField } from '../components/molecules/TextField'
import { RegisterUserTemplate } from '../components/templates/RegisterUserTemplate'
import { Button } from '../components/ui/button'
import { useRegisterUser } from '../hooks'
import { useAuthStore } from '../store/auth-store'

import type { RegisterUserUseCase } from '@/domain/usecases'

type RegisterUserProps = {
  registerUser: RegisterUserUseCase
}

export const RegisterUserPage: React.FC<RegisterUserProps> = ({
  registerUser,
}) => {
  const navigate = useNavigate()
  const { setCurrentUser } = useAuthStore()

  const [passwordMismatchError, setPasswordMismatchError] = useState(false)
  const [registerUserParams, setRegisterUserParams] = useState({
    fullName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const { mutate } = useRegisterUser(registerUser)

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (
      registerUserParams.password !== registerUserParams.passwordConfirmation
    ) {
      setPasswordMismatchError(true)
      return
    }

    setPasswordMismatchError(false)

    mutate(
      {
        fullName: registerUserParams.fullName,
        email: registerUserParams.email,
        password: registerUserParams.password,
      },
      {
        onSuccess: (response) => {
          if (response) {
            setCurrentUser(response)
            navigate('/')
          }
        },
        onError: (error) => {
          toast.error(error.message)
        },
      },
    )
  }

  return (
    <RegisterUserTemplate>
      <AuthForm onSubmit={onSubmit}>
        <TextField
          className="mt-8"
          label="Nome Completo"
          type="text"
          id="fullName"
          placeholder="Digite seu nome completo"
          labelClassName="text-white"
          inputClassName="text-white placeholder:text-white/35"
          onChange={(event) => {
            setRegisterUserParams({
              ...registerUserParams,
              fullName: event.target.value,
            })
          }}
        />
        <TextField
          className="mt-8"
          label="Email"
          type="email"
          id="email"
          placeholder="Digite seu email"
          labelClassName="text-white"
          inputClassName="text-white placeholder:text-white/35"
          onChange={(event) => {
            setRegisterUserParams({
              ...registerUserParams,
              email: event.target.value,
            })
          }}
        />
        <TextField
          className="mt-8"
          label="Senha"
          type="password"
          id="password"
          placeholder="Digite sua senha"
          labelClassName="text-white"
          inputClassName="text-white placeholder:text-white/35"
          onChange={(event) => {
            setRegisterUserParams({
              ...registerUserParams,
              password: event.target.value,
            })
          }}
        />
        <PasswordStrength password={registerUserParams.password} />
        <TextField
          className="mt-8"
          label="Confirmar Senha"
          type="password"
          id="password-confirmation"
          placeholder="Confirme sua senha"
          labelClassName="text-white"
          inputClassName="text-white placeholder:text-white/35"
          onChange={(event) => {
            setRegisterUserParams({
              ...registerUserParams,
              passwordConfirmation: event.target.value,
            })
          }}
          error={
            passwordMismatchError && (
              <p className="text-sm text-red-500 -mt-2">
                As senhas não coincidem
              </p>
            )
          }
        />

        <Button
          className="mt-4 w-full py-6 text-white"
          type="submit"
          style={{ backgroundColor: '#07B6D5' }}
        >
          Criar Conta
          <UserPlus />
        </Button>
      </AuthForm>
    </RegisterUserTemplate>
  )
}
