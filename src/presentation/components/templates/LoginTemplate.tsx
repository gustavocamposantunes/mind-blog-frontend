import { Link } from 'react-router-dom'

import { AuthSection } from '../molecules'
import { Separator } from '../ui/separator'

import { AuthTemplate } from './AuthTemplate'

import type { ReactNode } from 'react'

interface ILoginTemplate {
  children: ReactNode
}

export const LoginTemplate: React.FC<ILoginTemplate> = ({ children }) => (
  <AuthTemplate>
    <AuthSection
      title="Conectar"
      description="Acesse sua conta para acompanhar e publicar artigos exclusivos sobre
          inovação e tecnologia."
    >
      {children}

      <Separator className="my-8" />

      <Link className="text-center" to="/register">
        Novo usuário? Clique aqui
      </Link>
    </AuthSection>
  </AuthTemplate>
)
