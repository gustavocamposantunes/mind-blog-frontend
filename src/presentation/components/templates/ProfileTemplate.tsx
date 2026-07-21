import { ErrorMessage } from '../atoms/ErrorMessage'
import { Footer } from '../molecules/Footer'

import { PageTemplate } from './PageTemplate'

import type { ReactNode } from 'react'

interface IProfileTemplate {
  children: ReactNode
  error: Error | null
}

export const ProfileTemplate: React.FC<IProfileTemplate> = ({
  children,
  error,
}) => (
  <div className="flex min-h-screen flex-col bg-background">
    <PageTemplate>
      {error ? <ErrorMessage error={error} /> : children}
    </PageTemplate>
    <Footer />
  </div>
)
