import { Link } from 'react-router-dom'

import { AuthSection } from '../molecules'
import { Separator } from '../ui/separator'

import { AuthTemplate } from './AuthTemplate'

import type { ReactNode } from 'react'

interface IForgotPasswordTemplate {
  children: ReactNode
}

export const ForgotPasswordTemplate: React.FC<IForgotPasswordTemplate> = ({
  children,
}) => (
  <AuthTemplate>
    <AuthSection
      title="Esqueceu a senha?"
      description="Não se preocupe, enviaremos um email de redefinição de senha"
    >
      {children}

      <Separator className="my-8" />

      <Link className="text-center" to="/login">
        Já tem cadastro? Clique aqui
      </Link>
    </AuthSection>
  </AuthTemplate>
)
