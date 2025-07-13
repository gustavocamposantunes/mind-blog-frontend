import { useState } from 'react'
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

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  })

  const { data, isLoading } = useArticlesList(listArticles, pagination)

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

  let paginationComponent
  if (!isLoading && data) {
    paginationComponent = (
      <CustomPagination
        currentPage={pagination.page}
        totalPages={data?.total / pagination.limit}
        className="lg:col-span-2 xl:col-span-3 mt-4"
        changePage={(page: number) => {
          setPagination({
            ...pagination,
            page,
          })
        }}
      />
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
      {paginationComponent}
    </ArticlesTemplate>
  )
}
