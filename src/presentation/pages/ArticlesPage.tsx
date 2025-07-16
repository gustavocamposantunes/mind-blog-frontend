import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  useArticlesList,
  useFavouriteArticle,
  useResponsiveLimit,
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

  const { data, isLoading } = useArticlesList(listArticles, {
    page: currentPage,
    limit: currentLimit,
  })

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
