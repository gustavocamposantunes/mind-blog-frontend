import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Article } from '../components/organism'
import { useFavouriteArticle, useGetArticleById } from '../hooks'
import { useAuthStore } from '../store'

import type {
  FavouriteArticleUseCase,
  GetArticleByIdUseCase,
} from '@/domain/usecases'

import { ArticleTemplate } from '@/presentation/components/templates'

type ArticlePageProps = {
  getArticletById: GetArticleByIdUseCase
  favouriteArticle: FavouriteArticleUseCase
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  getArticletById,
  favouriteArticle,
}) => {
  const { accessToken } = useAuthStore()

  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useGetArticleById(
    getArticletById,
    String(id),
  )

  const { mutate: mutateFavouriteArticle } =
    useFavouriteArticle(favouriteArticle)

  const favouriteArticleById = (id: number, favourite: () => void) => {
    mutateFavouriteArticle(
      {
        id,
        token: accessToken,
      },
      {
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
          favourite()
          toast.info('Artigo adicionado aos favoritos')
        },
      },
    )
  }

  return (
    <ArticleTemplate isLoading={isLoading} error={error}>
      {data && (
        <Article
          id={data.id}
          title={data.title}
          publishedAt={data.publishedAt}
          image={data.image}
          content={data.content}
          author={{
            id: data.author.id,
            name: data.author.name,
            avatar: data.author.avatar,
          }}
          favouriteArticleById={favouriteArticleById}
        />
      )}
    </ArticleTemplate>
  )
}
