import type { ReactNode } from 'react'

import { AuthHeader } from '@/presentation/components/molecules/AuthHeader'

interface IArticlesTemplate {
  children: ReactNode
}

export const ArticlesTemplate: React.FC<IArticlesTemplate> = ({ children }) => (
  <>
    <AuthHeader />
    <main className="px-[10%] mt-8">{children}</main>
  </>
)
