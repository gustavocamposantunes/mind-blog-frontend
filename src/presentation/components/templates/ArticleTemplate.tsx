import { CustomSkeleton, ErrorMessage } from '../atoms'

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
      <ErrorMessage error={error} />
    ) : (
      <>{children}</>
    )}
  </PageTemplate>
)
