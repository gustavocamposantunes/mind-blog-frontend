import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  useArticlesList,
  useFavouriteArticle,
  useResponsiveLimit,
} from '../hooks'
import { useAuthStore } from '../store'

import type {
  FavouriteArticleUseCase,
  ListArticlesUseCase,
} from '@/domain/usecases'

import { CustomPagination } from '@/presentation/components/organism'
import { ArticleCard } from '@/presentation/components/organism/ArticleCard'
import { ArticlesTemplate } from '@/presentation/components/templates'

type ArticlessPageProps = {
  listArticles: ListArticlesUseCase
  favouriteArticle: FavouriteArticleUseCase
}

export const ArticlesPage: React.FC<ArticlessPageProps> = ({
  listArticles,
  favouriteArticle,
}) => {
  const { user, accessToken } = useAuthStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const responsiveLimit = useResponsiveLimit()

  const currentPage = Number(searchParams.get('page'))
  const currentLimit = responsiveLimit

  useEffect(() => {
    const currentSearchPage = searchParams.get('page')
    const currentSearchLimit = searchParams.get('limit')

    const shouldUpdate =
      currentSearchPage !== String(currentPage) ||
      currentSearchLimit !== String(currentLimit)

    if (shouldUpdate) {
      setSearchParams({
        page: String(currentPage),
        limit: String(currentLimit),
      })
    }
  }, [currentPage, currentLimit, setSearchParams, searchParams])

  const { data, isLoading, error } = useArticlesList(listArticles, {
    page: currentPage,
    limit: currentLimit,
  })

  const { mutate: mutateFavouriteArticle } =
    useFavouriteArticle(favouriteArticle)

  const favouriteArticleById = (
    articleId: number,
    favourite: () => boolean,
  ) => {
    mutateFavouriteArticle(
      {
        articleId,
        token: accessToken,
      },
      {
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
          const isFavourited = favourite()
          toast.info(
            `Artigo ${isFavourited ? 'removido dos' : 'adicionado aos'} favoritos`,
          )
        },
      },
    )
  }

  let paginationComponent
  if (!isLoading && data) {
    paginationComponent = (
      <CustomPagination
        currentPage={currentPage}
        totalPages={data?.total / currentLimit}
        className="lg:col-span-2 xl:col-span-3 mt-4"
        changePage={(page: number) => {
          setSearchParams({
            page: String(page),
            limit: String(currentLimit),
          })
        }}
      />
    )
  }

  return (
    <ArticlesTemplate isLoading={isLoading} error={error}>
      {data?.articles.map(({ ...props }) => (
        <ArticleCard
          key={props.id}
          {...props}
          isLoggedIn={!!accessToken}
          authUserId={user.id}
          favouriteArticleById={favouriteArticleById}
        />
      ))}
      {paginationComponent}
    </ArticlesTemplate>
  )
}
