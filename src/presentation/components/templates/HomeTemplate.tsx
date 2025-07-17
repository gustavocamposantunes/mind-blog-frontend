import { PageTemplate } from './PageTemplate'

import type React from 'react'
import type { ReactNode } from 'react'

interface IHomeTemplate {
  children: ReactNode
}

export const HomeTemplate: React.FC<IHomeTemplate> = ({ children }) => (
  <PageTemplate>
    <section className="grid gap-4 xl:grid-cols-3 pb-8">{children}</section>
  </PageTemplate>
)
