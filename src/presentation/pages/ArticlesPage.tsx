import { useArticlesList } from '../hooks'

import type { ListArticlesUseCase } from '@/domain/usecases'

import { CustomSkeleton } from '@/presentation/components/atoms/CustomSkeleton'
import { ArticleCard } from '@/presentation/components/organism/ArticleCard'
import { PageTemplate } from '@/presentation/components/templates'

type ArticlessPageProps = {
  listArticles: ListArticlesUseCase
}

export const ArticlesPage: React.FC<ArticlessPageProps> = ({
  listArticles,
}) => {
  const { data, isLoading } = useArticlesList(listArticles)

  return (
    <PageTemplate>
      <section className="grid grid-cols-3 gap-4">
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
        {data?.data?.articles.map(({ ...props }) => (
          <ArticleCard
            key={props.id}
            {...props}
            publishedAt={props.publishedAt}
          />
        ))}
      </section>
    </PageTemplate>
  )
}
