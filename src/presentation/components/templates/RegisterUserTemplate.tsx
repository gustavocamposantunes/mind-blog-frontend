import { Link } from 'react-router-dom'

import { AuthSection } from '../molecules'
import { Separator } from '../ui/separator'

import { AuthTemplate } from './AuthTemplate'

import type { ReactNode } from 'react'

interface IRegisterUserTemplate {
  children: ReactNode
}

export const RegisterUserTemplate: React.FC<IRegisterUserTemplate> = ({
  children,
}) => (
  <AuthTemplate>
    <AuthSection
      title="Registrar"
      description="Crie sua conta e comece a compartilhar seus conhecimentos de tecnologia com a comunidade"
    >
      {children}

      <Separator className="my-8" />

      <Link className="text-center" to="/login">
        Já tem cadastro? Clique aqui
      </Link>
    </AuthSection>
  </AuthTemplate>
)
