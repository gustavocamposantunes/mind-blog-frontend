import { CustomSkeleton } from '../atoms/CustomSkeleton'
import { ErrorMessage } from '../atoms/ErrorMessage'

import { PageTemplate } from './PageTemplate'

import type { ReactNode } from 'react'

interface IArticlesListTemplate {
  isLoading: boolean
  children: ReactNode
  error: Error | null
}

export const ArticlesListTemplate: React.FC<IArticlesListTemplate> = ({
  isLoading,
  children,
  error,
}) => (
  <PageTemplate>
    <section className="flex flex-col gap-4">
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
