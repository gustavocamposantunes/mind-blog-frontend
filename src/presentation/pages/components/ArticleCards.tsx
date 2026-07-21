import { ArticleListCard } from '@/presentation/components/organism/ArticleListCard'
import { Card } from '@/presentation/components/ui/card'

import type { ReactNode } from 'react'

type FeaturedArticleCardProps = {
  id: string
  title: string
  category?: string
  image?: string
  excerpt: string
  onClick(): void
  footer: ReactNode
  testId?: string
}

type ResponsiveArticleCardProps = {
  id: string
  title: string
  category?: string
  headerImageSrc?: string
  description: string
  onClick(): void
  footer: ReactNode
  view: 'grid' | 'list'
  testId?: string
}

export const FeaturedArticleCard: React.FC<FeaturedArticleCardProps> = ({
  id,
  title,
  category,
  image,
  excerpt,
  onClick,
  footer,
  testId = `custom-card-${id}`,
}) => {
  return (
    <Card
      onClick={onClick}
      data-testid={testId}
      className="group h-full cursor-pointer overflow-hidden rounded-3xl border-border bg-card/70 shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="flex h-full flex-col overflow-hidden">
        <div className="h-48 w-full overflow-hidden bg-muted">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          {category ? (
            <span className="text-xs font-semibold uppercase tracking-wide text-primary/80">
              {category}
            </span>
          ) : null}

          <h3 className="line-clamp-2 text-xl font-semibold leading-tight text-foreground">
            {title}
          </h3>

          <p className="line-clamp-3 text-sm leading-6 text-foreground/70">
            {excerpt}
          </p>

          <div className="mt-auto text-xs text-foreground/70">{footer}</div>
        </div>
      </div>
    </Card>
  )
}

export const ResponsiveArticleCard: React.FC<ResponsiveArticleCardProps> = ({
  id,
  title,
  category,
  headerImageSrc,
  description,
  onClick,
  footer,
  view,
  testId,
}) => {
  if (view === 'list') {
    return (
      <ArticleListCard
        id={id}
        headerImageSrc={headerImageSrc}
        title={title}
        description={description}
        category={category}
        onClick={onClick}
        footer={footer}
      />
    )
  }

  return (
    <FeaturedArticleCard
      id={id}
      title={title}
      image={headerImageSrc}
      excerpt={description}
      category={category}
      onClick={onClick}
      footer={footer}
      testId={testId}
    />
  )
}
