import { PageTemplate } from './PageTemplate'

import type React from 'react'
import type { ReactNode } from 'react'

interface IHomeTemplate {
  children: ReactNode
}

export const HomeTemplate: React.FC<IHomeTemplate> = ({ children }) => (
  <PageTemplate>
    <section className="space-y-16 pb-16">{children}</section>
  </PageTemplate>
)
