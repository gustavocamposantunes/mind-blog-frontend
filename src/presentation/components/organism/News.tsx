import { NewArticle } from '../molecules'
import { Skeleton } from '../ui/skeleton'

import type { New } from '@/domain/models'

type INews = {
  news?: Array<New>
  isLoading: boolean
} & React.ComponentProps<'section'>
export const News: React.FC<INews> = ({ className, news, isLoading }) => {
  if (isLoading) return <Skeleton data-testid="skeleton-news" />

  return (
    <section
      data-testid="list-news"
      className={`p-4 bg-stone-950 rounded-sm ${className}`}
    >
      <h1 className="text-white! text-4xl irish-grove-font">News</h1>
      {news?.map(({ title, description, url }) => (
        <a
          href={url}
          key={title}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-8"
          data-testid="new-article-link"
        >
          <NewArticle
            className="mt-8"
            title={title}
            description={description}
          />
        </a>
      ))}
    </section>
  )
}
