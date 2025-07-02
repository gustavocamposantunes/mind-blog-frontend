import { CustomSkeleton } from '../atoms'

import { PageTemplate } from './PageTemplate'

import type { ReactNode } from 'react'

interface IArticlesTemplate {
  isLoading: boolean
  children: ReactNode
}

export const ArticlesTemplate: React.FC<IArticlesTemplate> = ({
  isLoading,
  children,
}) => (
  <PageTemplate>
    <section className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {isLoading ? (
        <>
          <CustomSkeleton />
          <CustomSkeleton />
          <CustomSkeleton />
          <CustomSkeleton />
          <CustomSkeleton />
          <CustomSkeleton />
        </>
      ) : null}
      {children}
    </section>
  </PageTemplate>
)
