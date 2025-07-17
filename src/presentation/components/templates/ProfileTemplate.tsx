import { ErrorMessage } from '../atoms'

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
  <PageTemplate>
    {error ? <ErrorMessage error={error} /> : children}
  </PageTemplate>
)
