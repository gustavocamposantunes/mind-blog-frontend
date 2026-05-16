import { Card } from '../ui/card'

import type { ReactNode } from 'react'

interface IArticleListCard {
  id: string
  onClick(): void
  headerImageSrc?: string
  title: string
  description: string
  footer: ReactNode
  category?: string
}

export const ArticleListCard: React.FC<IArticleListCard> = ({
  id,
  onClick,
  headerImageSrc,
  title,
  description,
  footer,
  category,
}) => {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow flex flex-row gap-4 overflow-hidden p-6"
      key={id}
      onClick={onClick}
      data-testid={`article-list-card-${id}`}
    >
      <div className="flex flex-col flex-1 gap-4 min-w-0">
        {category && (
          <span className="text-xs font-semibold uppercase tracking-wide text-primary/80">
            {category}
          </span>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-2">
            {title}
          </h3>
          <p className="text-sm text-foreground/70 line-clamp-3">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            {Array.isArray(footer) ? footer[0] : null}
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {Array.isArray(footer) ? footer[1] : null}
          </div>
        </div>
      </div>
      {headerImageSrc && (
        <img
          data-testid="header-image"
          className="w-56 h-56 object-cover flex-shrink-0"
          src={headerImageSrc}
          alt={title}
        />
      )}
    </Card>
  )
}
