import { LogIn } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FormHeader } from '../components/atoms'
import { CustomInput } from '../components/molecules'
import { AuthTemplate } from '../components/templates'
import { Separator } from '../components/ui/separator'
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
        className="w-full flex lg:text-center flex-col px-8 md:px-24 lg:px-28 xl:px-44"
      >
        <FormHeader
          title="Conectar"
          description="Acesse sua conta para acompanhar e publicar artigos exclusivos sobre
          inovação e tecnologia."
        />
        <CustomInput
          className="mt-8"
          label="Email"
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
        <CustomInput
          className="mt-8"
          label="Senha"
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
        <Link to="/forgot-password" className="text-end mt-4">
          Esqueceu a senha?
        </Link>
        <Button className="mt-4 w-full py-6" type="submit">
          Entrar
          <LogIn />
        </Button>

        <Separator className="my-8" />

        <Link className="text-center" to="/register">
          Novo usuário? Clique aqui
        </Link>
      </form>
    </AuthTemplate>
  )
}
