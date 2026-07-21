import { CustomSkeleton } from '../atoms/CustomSkeleton'
import { ErrorMessage } from '../atoms/ErrorMessage'

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
          {Array.from({ length: 6 }).map((_, index) => (
            <CustomSkeleton key={`article-skeleton-${index}`} />
          ))}
        </>
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        children
      )}
    </section>
  </PageTemplate>
)
