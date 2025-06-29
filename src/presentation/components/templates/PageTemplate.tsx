import type { ReactNode } from 'react'

import { AuthHeader } from '@/presentation/components/molecules/AuthHeader'

interface IPageTemplate {
  children: ReactNode
}

export const PageTemplate: React.FC<IPageTemplate> = ({ children }) => (
  <>
    <AuthHeader />
    <main className="px-[10%] mt-8">{children}</main>
  </>
)
