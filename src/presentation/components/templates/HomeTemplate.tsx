import { Footer } from '../molecules'
import { PageTemplate } from './PageTemplate'

import type React from 'react'
import type { ReactNode } from 'react'

interface IHomeTemplate {
  children: ReactNode
}

export const HomeTemplate: React.FC<IHomeTemplate> = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-background">
    <PageTemplate>
      <section className="space-y-16 pb-16">{children}</section>
    </PageTemplate>
    <Footer />
  </div>
)
