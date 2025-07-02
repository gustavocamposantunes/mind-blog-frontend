import type { ReactNode } from 'react'

import { Header } from '@/presentation/components/molecules'

interface IPageTemplate {
  children: ReactNode
}

export const PageTemplate: React.FC<IPageTemplate> = ({ children }) => (
  <>
    <Header />
    <main className="px-4 md:px-[10%] mt-8">{children}</main>
  </>
)
