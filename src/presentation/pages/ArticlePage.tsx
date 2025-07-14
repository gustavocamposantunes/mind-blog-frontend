import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Article } from '../components/organism'
import {
  useFavouriteArticle,
  useGetArticleById,
  useUnfavouriteArticle,
} from '../hooks'
import { useAuthStore } from '../store'

import type {
  FavouriteArticleUseCase,
  GetArticleByIdUseCase,
  UnfavouriteArticleUseCase,
} from '@/domain/usecases'

import { ArticleTemplate } from '@/presentation/components/templates'

type ArticlePageProps = {
  getArticletById: GetArticleByIdUseCase
  favouriteArticle: FavouriteArticleUseCase
  unfavouriteArticle: UnfavouriteArticleUseCase
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  getArticletById,
  favouriteArticle,
  unfavouriteArticle,
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

  const { mutate: mutateUnfavouriteArticle } =
    useUnfavouriteArticle(unfavouriteArticle)

  const unfavouriteArticleById = (id: number, unfavourite: () => void) => {
    mutateUnfavouriteArticle(
      {
        id,
        token: accessToken,
      },
      {
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
          unfavourite()
          toast.info('Artigo removido dos favoritos')
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
          favourited={data.favourited}
          favouriteArticleById={favouriteArticleById}
          unfavouriteArticleById={unfavouriteArticleById}
        />
      )}
    </ArticleTemplate>
  )
}
