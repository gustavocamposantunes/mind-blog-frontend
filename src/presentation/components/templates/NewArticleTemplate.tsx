import type { ReactNode } from 'react'

import { AuthHeader } from '@/presentation/components/molecules/AuthHeader'

interface INewArticleTemplate {
  children: ReactNode
}

export const NewArticleTemplate: React.FC<INewArticleTemplate> = ({
  children,
}) => (
  <>
    <AuthHeader />
    <main className="px-[12%] mt-3">{children}</main>
  </>
)
