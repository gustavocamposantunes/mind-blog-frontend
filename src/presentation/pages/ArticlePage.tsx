import { useParams } from 'react-router-dom'

import { Article } from '../components/organism'
import { useGetArticleById } from '../hooks'

import type { GetArticleByIdUseCase } from '@/domain/usecases'

import { ArticleTemplate } from '@/presentation/components/templates'

type ArticlePageProps = {
  getArticletById: GetArticleByIdUseCase
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  getArticletById,
}) => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useGetArticleById(
    getArticletById,
    String(id),
  )

  return (
    <ArticleTemplate isLoading={isLoading} error={error}>
      {data?.data && (
          <Article
            title={data.data.title}
            publishedAt={data.data.publishedAt}
            image={data.data.image}
            content={data.data.content}
            author={{
              id: data.data.author.id,
              name: data.data.author.name,
              avatar: data.data.author.avatar,
            }}/>
      )}
    </ArticleTemplate>
  )
}
