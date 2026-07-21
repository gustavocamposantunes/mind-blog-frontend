import { LogIn } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AuthForm } from '../components/atoms/AuthForm'
import { TextField } from '../components/molecules/TextField'
import { LoginTemplate } from '../components/templates/LoginTemplate'
import { useAuthenticateUser } from '../hooks'
import { useAuthStore } from '../store/auth-store'

import type { AuthenticateUserUseCase } from '@/domain/usecases/auth/authenticate-user.usecase'

import { Button } from '@/presentation/components/ui/button'

type LoginPageProps = {
  authenticateUser: AuthenticateUserUseCase
}

export const LoginPage: React.FC<LoginPageProps> = ({ authenticateUser }) => {
  const navigate = useNavigate()

  const [authParams, setAuthParams] = useState({
    email: '',
    password: '',
  })

  const { mutate } = useAuthenticateUser(authenticateUser)
  const { setCurrentUser } = useAuthStore()

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    mutate(authParams, {
      onSuccess: (response) => {
        if (response) {
          navigate('/')
          setCurrentUser(response)
        }
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  return (
    <LoginTemplate>
      <AuthForm onSubmit={onSubmit}>
        <TextField
          className="mt-8"
          label="Email"
          type="email"
          id="email"
          placeholder="Digite seu email"
          labelClassName="text-white"
          inputClassName="text-white placeholder:text-white/35"
          value={authParams.email}
          onChange={(event) => {
            setAuthParams({
              ...authParams,
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
          value={authParams.password}
          onChange={(event) => {
            setAuthParams({
              ...authParams,
              password: event.target.value,
            })
          }}
        />

        <div className="mt-4 flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-white transition-colors hover:text-white"
          >
            Esqueceu a senha?
          </Link>
        </div>

        <Button
          className="mt-4 w-full py-6 text-white"
          type="submit"
          style={{ backgroundColor: '#07B6D5' }}
        >
          Entrar
          <LogIn />
        </Button>
      </AuthForm>
    </LoginTemplate>
  )
}
