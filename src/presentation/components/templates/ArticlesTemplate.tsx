import { CustomSkeleton, ErrorMessage } from '../atoms'

import { PageTemplate } from './PageTemplate'

import type { ReactNode } from 'react'

interface IArticlesTemplate {
  isLoading: boolean
  children: ReactNode
  error: Error | null
}

export const ArticlesTemplate: React.FC<IArticlesTemplate> = ({
  isLoading,
  children,
  error,
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
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        children
      )}
    </section>
  </PageTemplate>
)
