import { CustomSkeleton } from '../atoms'

import { PageTemplate } from './PageTemplate'

import type { ReactNode } from 'react'

interface IArticleTemplate {
  isLoading: boolean
  error: Error | null
  children: ReactNode
}

export const ArticleTemplate: React.FC<IArticleTemplate> = ({
  isLoading,
  error,
  children,
}) => (
  <PageTemplate>
    {isLoading ? (
      <span className="flex flex-col gap-4" data-testid="skeleton-group">
        <CustomSkeleton />
        <CustomSkeleton />
        <CustomSkeleton />
      </span>
    ) : error ? (
      <p data-testid="error-wrapper" className="text-red-500">
        {error.message}
      </p>
    ) : (
      <>{children}</>
    )}
  </PageTemplate>
)
