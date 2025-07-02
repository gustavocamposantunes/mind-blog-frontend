import { useArticlesList } from '../hooks'

import type { ListArticlesUseCase } from '@/domain/usecases'

import { ArticleCard } from '@/presentation/components/organism/ArticleCard'
import { ArticlesTemplate } from '@/presentation/components/templates'

type ArticlessPageProps = {
  listArticles: ListArticlesUseCase
}

export const ArticlesPage: React.FC<ArticlessPageProps> = ({
  listArticles,
}) => {
  const { data, isLoading } = useArticlesList(listArticles)

  return (
    <ArticlesTemplate isLoading={isLoading}>
      {data?.data?.articles.map(({ ...props }) => (
        <ArticleCard
          key={props.id}
          {...props}
          publishedAt={props.publishedAt}
        />
      ))}
    </ArticlesTemplate>
  )
}
