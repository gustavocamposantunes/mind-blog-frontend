import { Mail } from 'lucide-react'

import { AuthForm } from '../components/atoms/AuthForm'
import { TextField } from '../components/molecules/TextField'
import { ForgotPasswordTemplate } from '../components/templates/ForgotPasswordTemplate'

import { Button } from '@/presentation/components/ui/button'
export const ForgotPasswordPage = () => {
  return (
    <ForgotPasswordTemplate>
      <AuthForm>
        <TextField
          className="mt-8"
          label="Email"
          type="email"
          id="email"
          placeholder="Digite seu email"
        />

        <Button className="mt-4 w-full py-6" type="submit">
          Enviar email de recuperação
          <Mail />
        </Button>
      </AuthForm>
    </ForgotPasswordTemplate>
  )
}
