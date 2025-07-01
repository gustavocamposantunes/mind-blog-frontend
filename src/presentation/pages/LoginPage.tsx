import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AuthTemplate } from '../components/templates'
import { useAuthenticateUser } from '../hooks'
import { useAuthStore } from '../store/auth-store'

import type { AuthenticateUserUseCase } from '@/domain/usecases/auth/authenticate-user.usecase'

import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'

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

  const handleSubmit = (event: React.FormEvent) => {
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
    <AuthTemplate>
      <form
        onSubmit={handleSubmit}
        action=""
        className="w-full flex items-center flex-col gap-6 px-[20%]"
      >
        <h2 className="text-stone-950 text-[24px]">Conectar</h2>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email" className="text-stone-950">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Digite seu email"
            value={authParams.email}
            onChange={(event) => {
              setAuthParams({
                ...authParams,
                email: event.target.value,
              })
            }}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password" className="text-stone-950">
            Senha
          </Label>
          <Input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            value={authParams.password}
            onChange={(event) => {
              setAuthParams({
                ...authParams,
                password: event.target.value,
              })
            }}
          />
        </div>
        <div className="w-full flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-stone-950 hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>
        <Button className="mt-4 w-full py-4 auth-btn" type="submit">
          Entrar
        </Button>

        <Link to="/register">Novo usuário? Clique aqui</Link>
      </form>
    </AuthTemplate>
  )
}
