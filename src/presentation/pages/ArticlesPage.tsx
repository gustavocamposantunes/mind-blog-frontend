import { toast } from 'react-toastify'

import {
  useArticlesList,
  useFavouriteArticle,
  useUnfavouriteArticle,
} from '../hooks'
import { useAuthStore } from '../store'

import type {
  FavouriteArticleUseCase,
  ListArticlesUseCase,
  UnfavouriteArticleUseCase,
} from '@/domain/usecases'

import { CustomPagination } from '@/presentation/components/organism'
import { ArticleCard } from '@/presentation/components/organism/ArticleCard'
import { ArticlesTemplate } from '@/presentation/components/templates'

type ArticlessPageProps = {
  listArticles: ListArticlesUseCase
  favouriteArticle: FavouriteArticleUseCase
  unfavouriteArticle: UnfavouriteArticleUseCase
}

export const ArticlesPage: React.FC<ArticlessPageProps> = ({
  listArticles,
  favouriteArticle,
  unfavouriteArticle,
}) => {
  const { user, accessToken } = useAuthStore()

  const { data, isLoading } = useArticlesList(listArticles)

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

  let pagination
  if (!isLoading) {
    pagination = (
      <CustomPagination className="lg:col-span-2 xl:col-span-3 mt-4" />
    )
  }

  return (
    <ArticlesTemplate isLoading={isLoading}>
      {data?.articles.map(({ ...props }) => (
        <ArticleCard
          key={props.id}
          {...props}
          isLoggedIn={!!accessToken}
          authUserId={user.id}
          favouriteArticleById={favouriteArticleById}
          unfavouriteArticleById={unfavouriteArticleById}
        />
      ))}
      {pagination}
    </ArticlesTemplate>
  )
}
